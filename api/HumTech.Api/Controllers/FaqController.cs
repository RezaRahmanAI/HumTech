using HumTech.Api.Models;
using HumTech.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace HumTech.Api.Controllers;

[Route("api/faq")]
public class FaqController : CrudControllerBase<FaqItem>
{
    public FaqController(IRepository<FaqItem> repository) : base(repository)
    {
    }
}
