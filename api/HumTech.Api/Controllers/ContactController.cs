using HumTech.Api.Models;
using HumTech.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace HumTech.Api.Controllers;

[Route("api/contact")]
public class ContactController : CrudControllerBase<ContactProfile>
{
    public ContactController(IRepository<ContactProfile> repository) : base(repository)
    {
    }
}
