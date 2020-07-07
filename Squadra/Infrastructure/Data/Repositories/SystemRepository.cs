using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationCore.Interfaces.System;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories
{
    public class SystemRepository : EfRepository<ApplicationCore.Entities.System>, ISystemRepository
    {
        public SystemRepository(SquadraContext dbContext) : base(dbContext)
        {
        }

        public Task<ApplicationCore.Entities.System> GetByIDAsync(int id)
        {
            return _dbContext.System.Where(ac => ac.ID == id).FirstOrDefaultAsync();
        }

        public Task<List<ApplicationCore.Entities.System>> GetSystemByDescription(string description)
        {
            return _dbContext.System.Where(ac => ac.description == description).ToListAsync();
        }

        public Task<List<ApplicationCore.Entities.System>> GetSystemByInitials(string initials)
        {
            return _dbContext.System.Where(ac => ac.initials == initials).ToListAsync();
        }

        public Task<List<ApplicationCore.Entities.System>> GetSystemByEmail(string email)
        {
            return _dbContext.System.Where(ac => ac.email == email).ToListAsync();
        }

        public Task<List<ApplicationCore.Entities.System>> GetSystemByDescInitEmail(string description, string initials, string email)
        {
            return _dbContext.System.Include(ac => ac.description == description).Include(ac => ac.initials == initials).Include(ac => ac.email == email).ToListAsync();
        }
    }
}
