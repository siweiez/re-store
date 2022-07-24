using System.Linq;
using api.DTOs;
using api.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions
{
  public static class OrderExtensions
  {
    public static IQueryable<OrderDTO> ProjectOrderToOrderDTO(this IQueryable<Order> query)
    {
      return query.Select(order => new OrderDTO
      {
        Id = order.Id,
        BuyerId = order.BuyerId,
        OrderDate = order.OrderDate,
        ShippingAddress = order.ShippingAddress,
        DeliveryFee = order.DeliveryFee,
        Subtotal = order.Subtotal,
        OrderStatus = order.OrderStatus.ToString(),
        Total = order.GetTotal(),
        OrderItems = order.OrderItems.Select(item => new OrderItemDTO
        {
          ProductId = item.ItemOrdered.ProductId,
          Name = item.ItemOrdered.Name,
          PicUrl = item.ItemOrdered.PicUrl,
          Price = item.Price,
          Quantity = item.Quantity
        }).ToList()
      }).AsNoTracking();
    }
  }
}