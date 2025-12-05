using cart_backend.data;
using cart_backend.models;
using cart_backend.services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ProductDbContext>();
builder.Services.ConfigureApplicationCookie(options =>
{
    options.ExpireTimeSpan = TimeSpan.FromMinutes(5);
    options.SlidingExpiration = true;
});
builder.Services.AddEndpointsApiExplorer();
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
    return db.Products.ToListAsync();
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
app.MapPost("/api/customer",
    (Customer customer, CustomerFactory factory, HttpContext context, ProductDbContext db,
        UserManager<IdentityUser> userManager) =>
    {
        Customer newCustomer = factory.CreateCustomer(customer.Name, customer.Email, customer.Mobile);
        db.Customers.Add(newCustomer);
        db.SaveChanges();
        return newCustomer;
    });

app.Run();
