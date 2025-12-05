namespace cart_backend.models;

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Mobile { get; set; }

    public Cart Cart { get; set; }
    public int CartId { get; set; }

    public string UserId { get; set; }

    public Customer()
    {
        
    }

    public Customer(string name, string email, string mobile, int cartId, string userId)
    {
        Name = name;
        Email = email;
        Mobile = mobile;
        CartId = cartId;
        UserId = userId;
    }
}