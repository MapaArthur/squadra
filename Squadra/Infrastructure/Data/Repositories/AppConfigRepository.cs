using ApplicationCore.Entities;
using ApplicationCore.Interfaces.AppConfig;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repositories
{
    public class AppConfigRepository : EfRepository<AppConfig>, IAppConfigRepository
    {
        public AppConfigRepository(SquadraContext dbContext) : base(dbContext)
        {
        }

        public Task<AppConfig> GetByKeyAsync(string key)
        {
            return _dbContext.AppConfig.Where(ac => ac.Key == key).FirstOrDefaultAsync();
        }
    }
}
