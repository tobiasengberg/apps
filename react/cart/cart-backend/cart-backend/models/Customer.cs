namespace cart_backend.models;

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Mobile { get; set; }

    public Cart Cart { get; set; }
    public int CartId { get; set; }
}