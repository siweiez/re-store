using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
  public class OrderItemDTO
  {
    public int ProductId { get; set; }
    public string Name { get; set; }
    public string PicUrl { get; set; }
    public long Price { get; set; }
    public int Quantity { get; set; }
  }
}