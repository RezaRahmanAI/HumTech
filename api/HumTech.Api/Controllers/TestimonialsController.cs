using HumTech.Api.Models;
using HumTech.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace HumTech.Api.Controllers;

[Route("api/testimonials")]
public class TestimonialsController : CrudControllerBase<Testimonial>
{
    public TestimonialsController(IRepository<Testimonial> repository) : base(repository)
    {
    }
}
