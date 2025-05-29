using Azure.Messaging.ServiceBus;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

public class ServiceBusSenderService
{
    private readonly ServiceBusClient _client;
    private readonly ServiceBusSender _sender;

    public ServiceBusSenderService(IConfiguration configuration)
    {
        var connectionString = configuration["ServiceBus:ConnectionString"];
        var queueName = configuration["ServiceBus:QueueName"];

        _client = new ServiceBusClient(connectionString);
        _sender = _client.CreateSender(queueName);
    }

    public async Task SendMessageAsync(string message)
    {
        ServiceBusMessage busMessage = new ServiceBusMessage(message);
        await _sender.SendMessageAsync(busMessage);
    }
}
