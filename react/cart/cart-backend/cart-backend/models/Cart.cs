namespace cart_backend.models;

public class Cart
{
    public int Id { get; set; }
    public List<ProductQuantity> Products { get; set; } = new List<ProductQuantity>();
    public int CustomerId { get; set; }
}