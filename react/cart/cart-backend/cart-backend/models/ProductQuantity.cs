namespace cart_backend.models;

public class ProductQuantity
{
    public int Id { get; set; }
    public Product Product { get; set; }
    public int Quantity { get; set; }
    public string Description { get; set; }
}