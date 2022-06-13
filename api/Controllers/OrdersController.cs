
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs;
using api.Entities;
using api.Entities.OrderAggregate;
using api.Extensions;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
  [Authorize]
  public class OrdersController : BaseApiController
  {
    private readonly StoreContext _context;
    public OrdersController(StoreContext context)
    {
      _context = context;

    }

    [HttpGet]
    public async Task<ActionResult<List<OrderDTO>>> GetOrders()
    {
      return await _context.Orders
         .ProjectOrderToOrderDTO()
         .Where(x => x.BuyerId == User.Identity.Name)
         .ToListAsync();
    }

    [HttpGet("{id}", Name = "GetOrder")]
    public async Task<ActionResult<OrderDTO>> GetOrder(int id)
    {
      return await _context.Orders
          .ProjectOrderToOrderDTO()
          .Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
          .FirstOrDefaultAsync();
    }


    [HttpPost]
    public async Task<ActionResult<int>> CreateOrder(CreateOrderDTO orderDTO)
    {
      var basket = await _context.Baskets
          .RetrieveBasketWithItems(User.Identity.Name)
          .FirstOrDefaultAsync();

      if (basket == null) return BadRequest(new ProblemDetails { Title = "Can not locate basket" });

      var items = new List<OrderItem>();
      foreach (var item in basket.Items)
      {
        // create new item in the order
        var productItem = await _context.Products.FindAsync(item.ProductId);
        var itemOrdered = new ProductItemOrdered
        {
          ProductId = productItem.Id,
          Name = productItem.Name,
          PicUrl = productItem.PicUrl
        };

        var orderItem = new OrderItem
        {
          ItemOrdered = itemOrdered,
          Price = productItem.Price,
          Quantity = item.Quantity
        };

        // item add to order
        items.Add(orderItem);
        productItem.QuantityInStock -= item.Quantity;
      }

      var subtotal = items.Sum(item => item.Price * item.Quantity);
      var deliveryFee = subtotal > 10000 ? 0 : 500;

      // create new order
      var order = new Order
      {
        BuyerId = User.Identity.Name,
        OrderItems = items,
        ShippingAddress = orderDTO.ShippingAddress,
        Subtotal = subtotal,
        DeliveryFee = deliveryFee,
        PaymentIntentId = basket.PaymentIntentId
      };

      // order add to orders
      _context.Orders.Add(order);
      _context.Baskets.Remove(basket);

      if (orderDTO.SaveAddress)
      {
        var user = await _context.Users
          .Include(a => a.Address)
          .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

        var address = new UserAddress
        {
          FullName = orderDTO.ShippingAddress.FullName,
          Address1 = orderDTO.ShippingAddress.Address1,
          Address2 = orderDTO.ShippingAddress.Address2,
          City = orderDTO.ShippingAddress.City,
          State = orderDTO.ShippingAddress.State,
          Zipcode = orderDTO.ShippingAddress.Zipcode,
          Country = orderDTO.ShippingAddress.Country
        };
        user.Address = address;
        // Entity framework will update user automatically
        // _context.Update(user);
      }

      var result = await _context.SaveChangesAsync() > 0;
      if (result) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);
      // else
      return BadRequest(new ProblemDetails { Title = "Problem when creating order" });
    }
  }
}