using Microsoft.EntityFrameworkCore;
using Azure.Messaging.ServiceBus;
using OrderProcessing.Worker.Models;
using OrderProcessing.Worker.Data;
using System.Text.Json;

namespace OrderProcessing.Worker;

public class Worker : BackgroundService
{
    private readonly ServiceBusClient _serviceBusClient;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly string _queueName;

    public Worker(ServiceBusClient serviceBusClient, IServiceScopeFactory scopeFactory, IConfiguration config)
    {
        _serviceBusClient = serviceBusClient;
        _scopeFactory = scopeFactory;
        _queueName = config["ServiceBus:QueueName"];
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var processor = _serviceBusClient.CreateProcessor(_queueName, new ServiceBusProcessorOptions());

        processor.ProcessMessageAsync += async args =>
        {
            try
            {
                var messageBody = args.Message.Body.ToString();
                
                var orderFromMessage = JsonSerializer.Deserialize<Order>(messageBody);

                if (orderFromMessage != null)
                {
                    using var scope = _scopeFactory.CreateScope();
                    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                    var order = await db.Orders.FindAsync(orderFromMessage.Id);
                    if (order != null)
                    {
                        order.Status = "Processando";
                        await db.SaveChangesAsync();

                        await Task.Delay(5000);

                        order.Status = "Finalizado";
                        await db.SaveChangesAsync();

                        Console.WriteLine($"Pedido {order.Id} processado com sucesso!");
                    }
                    else
                    {
                        Console.WriteLine($"Pedido {orderFromMessage.Id} não encontrado no banco.");
                    }
                }
                else
                {
                    Console.WriteLine("Erro ao desserializar a mensagem do pedido!");
                }

                await args.CompleteMessageAsync(args.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao processar mensagem: {ex.Message}");
            }
        };

        processor.ProcessErrorAsync += args =>
        {
            Console.WriteLine($"Erro do Service Bus: {args.Exception}");
            return Task.CompletedTask;
        };

        await processor.StartProcessingAsync(stoppingToken);
        await Task.Delay(Timeout.Infinite, stoppingToken);
    }
}
