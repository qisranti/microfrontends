using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Application.Contracts.Persistence
{
    public interface IBaseRepository<T>
    {
        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task<IEnumerable<T>> GetAllAsync();
        Task<T?> GetByIdAsync(int id);
    }
}
