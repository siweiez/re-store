using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Entities;
using api.DTOs;
using api.Extensions;
using api.RequestHelpers;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
  public class ProductsController : BaseApiController
  {
    private readonly StoreContext _context;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;
    public ProductsController(StoreContext context, IMapper mapper, ImageService imageService)
    {
      _imageService = imageService;
      _mapper = mapper;
      _context = context;
    }

    // actions for guests

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts
    ([FromQuery] ProductParams productParams)
    {
      var query = _context.Products
      .Sort(productParams.SortBy)
      .Search(productParams.SearchTerm)
      .Filter(productParams.Brands, productParams.Types)
      .AsQueryable();

      var products = await PagedList<Product>.ToPagedList
      (query, productParams.PageNumber, productParams.PageSize);

      Response.AddPaginationHeader(products.MetaData);
      return products;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
      var product = await _context.Products.FindAsync(id);
      if (product == null) return NotFound();
      return product;
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
      var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
      var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();
      return Ok(new { brands, types });
    }

    // actions for admin
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDTO productDTO)
    {
      var product = _mapper.Map<Product>(productDTO);

      if (productDTO.File != null)
      {
        var image = await _imageService.AddImageAsync(productDTO.File);
        if (image.Error != null)
        {
          return BadRequest(new ProblemDetails { Title = image.Error.Message });
        }
        product.PicUrl = image.SecureUrl.ToString();
        product.PublicId = image.PublicId;
      }
      _context.Products.Add(product);
      var result = await _context.SaveChangesAsync() > 0;
      if (result) return CreatedAtRoute("GetProduct", new { Id = product.Id }, product);

      return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDTO productDTO)
    {
      var product = await _context.Products.FindAsync(productDTO.Id);

      if (product == null) return NotFound();

      _mapper.Map(productDTO, product);

      if (productDTO.File != null)
      {
        var imageResult = await _imageService.AddImageAsync(productDTO.File);

        if (imageResult.Error != null)
          return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

        if (!string.IsNullOrEmpty(product.PublicId))
          await _imageService.DeleteImageAsync(product.PublicId);

        product.PicUrl = imageResult.SecureUrl.ToString();
        product.PublicId = imageResult.PublicId;
      }

      var result = await _context.SaveChangesAsync() > 0;

      if (result) return Ok(product);

      return BadRequest(new ProblemDetails { Title = "Problem updating product" });
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
      var product = await _context.Products.FindAsync(id);

      if (product == null) return NotFound();

      if (!string.IsNullOrEmpty(product.PublicId))
        await _imageService.DeleteImageAsync(product.PublicId);

      _context.Products.Remove(product);

      var result = await _context.SaveChangesAsync() > 0;

      if (result) return Ok();

      return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
    }
  }
}