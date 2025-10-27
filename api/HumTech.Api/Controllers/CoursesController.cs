using HumTech.Api.Models;
using HumTech.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace HumTech.Api.Controllers;

[Route("api/courses")]
public class CoursesController : CrudControllerBase<Course>
{
    public CoursesController(IRepository<Course> repository) : base(repository)
    {
    }
}
