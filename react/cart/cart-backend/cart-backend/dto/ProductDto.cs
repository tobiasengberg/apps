using cart_backend.models;

namespace cart_backend.dto;

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }

    public ProductDto()
    {
        
    }
    public ProductDto(Product product)
    {
        Name = product.Name;
        Description = product.Description;
        Price = product.GetCurrentPrice();
    }
}