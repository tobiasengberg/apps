using System.Text.Json.Serialization;
using cart_backend.data;
using cart_backend.dto;
using cart_backend.models;
using cart_backend.services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
{
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
builder.Services.AddOpenApi();

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ProductDbContext>();
builder.Services.ConfigureApplicationCookie(options =>
{
    options.ExpireTimeSpan = TimeSpan.FromMinutes(5);
    options.SlidingExpiration = true;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<CustomerFactory>();
builder.Services.AddDbContext<ProductDbContext>(options =>
    options.UseSqlite("Data Source=products.db"));
builder.Services.AddAuthorization();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapGroup("/user").MapIdentityApi<IdentityUser>();
app.MapGet("/api/products", (ProductDbContext db) =>
{
    List<Product> products = db.Products
        .Include(p => p.PriceHistory)
        .ToListAsync().Result;
    List<ProductDto> dtos = new();
    products.ForEach(p => dtos.Add(new ProductDto(p)));
    return dtos;
});
app.MapGet("/api/cart", (HttpContext context, ProductDbContext db,  UserManager<IdentityUser> userManager) =>
{
    var userRequest = context.User;
    var user =  userManager.GetUserAsync(userRequest).Result;
    var customer = db.Customers
        .Include(c => c.Cart)
        .FirstOrDefault(c => c.UserId == user.Id);
    return customer.Cart;
}).RequireAuthorization();
app.MapPost("/api/products", (ProductDto product, ProductDbContext db) =>
{
    Product newProduct = new Product();
    newProduct.Name = product.Name;
    newProduct.Description = product.Description;
    Price price = new Price();
    price.Amount = product.Price;
    price.Moment = DateTime.Now;
    price.Description = "Initial price";
    newProduct.PriceHistory.Add(price);
    db.Products.Add(newProduct);
    db.SaveChanges();
    return Results.Ok();
});
app.MapPost("/api/customer", (Customer customer, CustomerFactory factory) =>
    {
        Customer newCustomer = factory.CreateCustomer(customer.Name, customer.Email, customer.Mobile);
        return newCustomer;
    }).RequireAuthorization();

app.Run();
