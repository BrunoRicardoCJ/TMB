using Microsoft.AspNetCore.Mvc;
using OrderManagement.Api.Data;
using OrderManagement.Api.Models;
using Microsoft.EntityFrameworkCore;
using Azure.Messaging.ServiceBus;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using OrderManagement.Api.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace OrderManagement.Api.Controllers
{
    [ApiController]
    [Route("orders")]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IHubContext<PedidoHub> _hub;

        public OrdersController(
            AppDbContext context,
            IConfiguration configuration,
            IHubContext<PedidoHub> hub)
        {
            _context = context;
            _configuration = configuration;
            _hub = hub;
        }

        // POST /orders
        [HttpPost]
        public async Task<IActionResult> CreateOrder(Order order)
        {
            order.Id = Guid.NewGuid();
            order.Status = "Pendente";
            order.DataCriacao = DateTime.UtcNow;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            string connectionString = _configuration["ServiceBus:ConnectionString"];
            string queueName = _configuration["ServiceBus:QueueName"];

            await using (var client = new ServiceBusClient(connectionString))
            {
                ServiceBusSender sender = client.CreateSender(queueName);
                string orderJson = JsonSerializer.Serialize(order);
                ServiceBusMessage message = new ServiceBusMessage(orderJson);
                await sender.SendMessageAsync(message);
            }

            // Notifica o front de novo pedido criado
            await _hub.Clients.All.SendAsync("PedidoAtualizado", order);

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        // GET /orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET /orders/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(Guid id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
                return NotFound();

            return order;
        }

        // PUT /orders/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(Guid id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Orders.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            await _hub.Clients.All.SendAsync("PedidoAtualizado", order);

            return NoContent();
        }

        // DELETE /orders/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<Order>> DeleteOrder(Guid id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return order;
        }
    }
}
