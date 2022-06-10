using System.Linq;
using api.DTOs;
using api.Entities;

namespace api.Extensions
{
  public static class BasketExtensions
  {
    public static BasketDTO MapBasketToDTO(this Basket basket)
    {
      return new BasketDTO
      {
        Id = basket.Id,
        BuyerId = basket.BuyerId,
        Items = basket.Items.Select(item => new BasketItemDTO
        {
          ProductId = item.ProductId,
          Name = item.Product.Name,
          Price = item.Product.Price,
          PicUrl = item.Product.PicUrl,
          Type = item.Product.Type,
          Brand = item.Product.Brand,
          Quantity = item.Quantity
        }).ToList()
      };
    }
  }
}