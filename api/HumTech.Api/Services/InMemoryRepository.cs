using System.Collections.Concurrent;
using HumTech.Api.Models;

namespace HumTech.Api.Services;

public class InMemoryRepository<T> : IRepository<T> where T : EntityBase
{
    private readonly ConcurrentDictionary<Guid, T> _store;

    public InMemoryRepository(IEnumerable<T> seed)
    {
        _store = new ConcurrentDictionary<Guid, T>(seed.ToDictionary(item => item.Id));
    }

    public Task<IReadOnlyList<T>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        IReadOnlyList<T> result = _store.Values
            .OrderBy(item => item.Id)
            .ToList();
        return Task.FromResult(result);
    }

    public Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        _store.TryGetValue(id, out var value);
        return Task.FromResult(value);
    }

    public Task<T> CreateAsync(T entity, CancellationToken cancellationToken = default)
    {
        if (entity.Id == Guid.Empty)
        {
            entity.Id = Guid.NewGuid();
        }

        _store[entity.Id] = entity;
        return Task.FromResult(entity);
    }

    public Task<bool> UpdateAsync(Guid id, T entity, CancellationToken cancellationToken = default)
    {
        if (!_store.ContainsKey(id))
        {
            return Task.FromResult(false);
        }

        entity.Id = id;
        _store[id] = entity;
        return Task.FromResult(true);
    }

    public Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return Task.FromResult(_store.TryRemove(id, out _));
    }
}
