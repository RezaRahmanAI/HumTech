using HumTech.Api.Models;
using HumTech.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace HumTech.Api.Controllers;

[Route("api/services")]
public class ServicesController : CrudControllerBase<ServiceOffering>
{
    public ServicesController(IRepository<ServiceOffering> repository) : base(repository)
    {
    }
}
