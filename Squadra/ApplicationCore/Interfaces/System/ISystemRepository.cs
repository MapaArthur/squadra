using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.System
{
    public interface ISystemRepository : IAsyncRepository<Entities.System>
    {
        Task<Entities.System> GetByIDAsync(int id);

        Task<List<Entities.System>> GetSystemByDescription(string description);

        Task<List<Entities.System>> GetSystemByInitials(string initials);
        Task<List<Entities.System>> GetSystemByEmail(string email);

        Task<List<Entities.System>> GetSystemByDescInitEmail(string description, string initials, string email);
    }
}
