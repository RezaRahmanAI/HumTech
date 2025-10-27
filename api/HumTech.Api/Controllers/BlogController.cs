using HumTech.Api.Models;
using HumTech.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace HumTech.Api.Controllers;

[Route("api/blog")]
public class BlogController : CrudControllerBase<BlogArticle>
{
    public BlogController(IRepository<BlogArticle> repository) : base(repository)
    {
    }
}
