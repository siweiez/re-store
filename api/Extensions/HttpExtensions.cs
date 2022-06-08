using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using api.RequestHelpers;
using Microsoft.AspNetCore.Http;

namespace api.Extensions
{
  public static class HttpExtensions
  {
    public static void AddPaginationHeader(this HttpResponse res, MetaData metaData)
    {
      var options = new JsonSerializerOptions
      { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
      res.Headers.Add("Pagination", JsonSerializer.Serialize(metaData, options));
      res.Headers.Add("Access-Control-Expose-Headers", "Pagination");
    }
  }
}