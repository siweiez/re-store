using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace api.Middlewares
{
  public class ExceptionMiddleware
  {
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _environment;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment environment)
    {
      _next = next;
      _logger = logger;
      _environment = environment;
    }

    public async Task InvokeAsync(HttpContext context)
    {
      try
      {
        await _next(context);
      }
      catch (Exception exception)
      {
        _logger.LogError(exception, exception.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = 500;
        var response = new ProblemDetails
        {
          Status = 500,
          Detail = _environment.IsDevelopment() ? exception.StackTrace?.ToString() : null,
          Title = exception.Message
        };
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        var json = JsonSerializer.Serialize(response, options);


        await context.Response.WriteAsync(json);
      }
    }
  }
}