using Microsoft.Extensions.Hosting; // Faltava esse!
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Azure.Messaging.ServiceBus;
using OrderProcessing.Worker.Models;
using OrderProcessing.Worker.Data;
using OrderProcessing.Worker;

var builder = Host.CreateDefaultBuilder(args)
    .ConfigureServices((hostContext, services) =>
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(hostContext.Configuration.GetConnectionString("DefaultConnection")));

        services.AddSingleton(new ServiceBusClient(
            hostContext.Configuration["ServiceBus:ConnectionString"]));

        services.AddHostedService<Worker>();
    });

var host = builder.Build();
host.Run();
