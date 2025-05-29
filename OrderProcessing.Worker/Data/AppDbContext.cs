// Data/AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using OrderProcessing.Worker.Models;
using OrderProcessing.Worker.Data;


namespace OrderProcessing.Worker.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Order> Orders { get; set; }
    }
}
