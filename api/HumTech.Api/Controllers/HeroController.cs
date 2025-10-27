using HumTech.Api.Models;
using HumTech.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace HumTech.Api.Controllers;

[Route("api/hero")]
public class HeroController : CrudControllerBase<HeroSection>
{
    public HeroController(IRepository<HeroSection> repository) : base(repository)
    {
    }
}
