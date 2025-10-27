using HumTech.Api.Models;
using HumTech.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace HumTech.Api.Controllers;

[ApiController]
public abstract class CrudControllerBase<T> : ControllerBase where T : EntityBase
{
    protected CrudControllerBase(IRepository<T> repository)
    {
        Repository = repository;
    }

    protected IRepository<T> Repository { get; }

    [HttpGet]
    public virtual async Task<ActionResult<IEnumerable<T>>> GetAllAsync(CancellationToken cancellationToken)
    {
        var items = await Repository.GetAllAsync(cancellationToken);
        return Ok(items);
    }

    [HttpGet("{id:guid}")]
    public virtual async Task<ActionResult<T>> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var item = await Repository.GetByIdAsync(id, cancellationToken);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public virtual async Task<ActionResult<T>> CreateAsync([FromBody] T request, CancellationToken cancellationToken)
    {
        var created = await Repository.CreateAsync(request, cancellationToken);
        return CreatedAtAction(nameof(GetByIdAsync), new { id = created.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public virtual async Task<IActionResult> UpdateAsync(Guid id, [FromBody] T request, CancellationToken cancellationToken)
    {
        var updated = await Repository.UpdateAsync(id, request, cancellationToken);
        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public virtual async Task<IActionResult> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await Repository.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
