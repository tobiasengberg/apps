using cart_backend.data;
using cart_backend.models;
using Microsoft.AspNetCore.Identity;

namespace cart_backend.services;

public class CustomerFactory
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IHttpContextAccessor _context;
    private readonly ProductDbContext _db;

    public CustomerFactory(ProductDbContext db, UserManager<IdentityUser> userManager, IHttpContextAccessor context)
    {
        _userManager = userManager;
        _context =  context;
        _db = db;
    }

    public Customer CreateCustomer(string name, string email, string mobile)
    {
        Cart cart = new Cart();
        string userId = _userManager.GetUserId(_context.HttpContext.User);
        Customer customer = new Customer(name, email, mobile, userId);
        customer.Cart = cart;
        _db.Customers.Add(customer);
        _db.Carts.Add(cart);
        _db.SaveChanges();
        return customer;
    }
}