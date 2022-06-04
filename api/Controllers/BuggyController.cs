using System;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  public class BuggyController : BaseApiController
  {
    [HttpGet("bad-request")]
    public ActionResult GetBadRequest()
    {
      return BadRequest(new ProblemDetails { Title = "Bad request" });
    }

    [HttpGet("unauthorized")]
    public ActionResult GetUnauthorized()
    {
      return Unauthorized();
    }

    [HttpGet("not-found")]
    public ActionResult GetNotFound()
    {
      return NotFound();
    }

    [HttpGet("server-error")]
    public ActionResult GetServerError()
    {
      throw new Exception("Server error");
    }

    [HttpGet("validation-error")]
    public ActionResult GetValidationError()
    {
      ModelState.AddModelError("Problem 1", "This is the first error");
      ModelState.AddModelError("Problem 2", "This is the second error");
      return ValidationProblem();
    }

  }
}