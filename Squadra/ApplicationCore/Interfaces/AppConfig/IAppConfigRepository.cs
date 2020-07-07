using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.AppConfig
{
    public interface IAppConfigRepository : IAsyncRepository<Entities.AppConfig>
    {
        Task<Entities.AppConfig> GetByKeyAsync(string key);
    }
}
