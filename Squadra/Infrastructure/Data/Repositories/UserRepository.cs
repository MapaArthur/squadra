using ApplicationCore.Interfaces.User;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repositories
{
    public class UserRepository : EfRepository<ApplicationCore.Entities.User>, IUserRepository
    {
        public UserRepository(SquadraContext dbContext) : base(dbContext)
        {
        }

        public Task<ApplicationCore.Entities.User> GetByIDAsync(int id)
        {
            return _dbContext.User.Where(ac => ac.ID == id).FirstOrDefaultAsync();
        }

        public Task<ApplicationCore.Entities.User> GetByGetUser(ApplicationCore.Entities.User user)
        {
            return _dbContext.User.Where(ac => ac.Username == user.Username && ac.Password == user.Password).FirstOrDefaultAsync();
        }
    }
}
