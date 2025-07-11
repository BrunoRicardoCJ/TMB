using System;
using OrderProcessing.Worker.Models;
using OrderProcessing.Worker.Data;


namespace OrderProcessing.Worker.Models
{
    public class Order
    {
        public Guid Id { get; set; }
		public string Cliente { get; set; } = string.Empty;
		public string Produto { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime DataCriacao { get; set; }
    }
}