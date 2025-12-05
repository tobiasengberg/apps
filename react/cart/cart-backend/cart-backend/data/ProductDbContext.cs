using cart_backend.models;
using Microsoft.EntityFrameworkCore;

namespace cart_backend.data;

public class ProductDbContext : DbContext
{
    public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options)
    {
        
    }

    public DbSet<Cart> Carts { get; set; }
    public DbSet<Price> Prices { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductQuantity> ProductQuantities { get; set; }
    
}