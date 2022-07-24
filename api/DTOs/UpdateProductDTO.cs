using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace api.DTOs
{
  public class UpdateProductDTO
  {
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    
    public IFormFile File { get; set; }

    [Required]
    public string Type { get; set; }

    [Required]
    public string Brand { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    [Range(100, Double.PositiveInfinity)]
    public long Price { get; set; }

    [Required]
    [Range(0, 200)]
    public int QuantityInStock { get; set; }
  }
}