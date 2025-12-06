namespace cart_backend.models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public List<Price> PriceHistory { get; set; } = new List<Price>();

    public Product() { }
    
    
    public decimal GetCurrentPrice()
    {
        int id = PriceHistory.Count - 1;
        return PriceHistory[id].Amount;
    }
}