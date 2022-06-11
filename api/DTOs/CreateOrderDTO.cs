using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities.OrderAggregate;

namespace api.DTOs
{
  public class CreateOrderDTO
  {
    public bool SaveAddress { get; set; }
    public ShippingAddress ShippingAddress { get; set; }
  }
}