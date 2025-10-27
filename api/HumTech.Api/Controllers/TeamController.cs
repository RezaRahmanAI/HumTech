using HumTech.Api.Models;
using HumTech.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace HumTech.Api.Controllers;

[Route("api/team")]
public class TeamController : CrudControllerBase<TeamMember>
{
    public TeamController(IRepository<TeamMember> repository) : base(repository)
    {
    }
}
