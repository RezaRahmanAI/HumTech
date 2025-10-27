using HumTech.Api.Models;
using HumTech.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace HumTech.Api.Controllers;

[Route("api/jobs")]
public class JobsController : CrudControllerBase<JobPosting>
{
    public JobsController(IRepository<JobPosting> repository) : base(repository)
    {
    }
}
