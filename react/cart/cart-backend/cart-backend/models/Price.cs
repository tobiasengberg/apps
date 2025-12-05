namespace cart_backend.models;

public class Price
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public DateTime Moment { get; set; }
    public string Description { get; set; }
}