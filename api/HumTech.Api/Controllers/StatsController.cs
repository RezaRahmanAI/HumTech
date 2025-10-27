using HumTech.Api.Models;
using HumTech.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace HumTech.Api.Controllers;

[Route("api/stats")]
public class StatsController : CrudControllerBase<StatMetric>
{
    public StatsController(IRepository<StatMetric> repository) : base(repository)
    {
    }
}
