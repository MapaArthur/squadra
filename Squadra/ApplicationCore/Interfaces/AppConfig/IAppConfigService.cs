using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.AppConfig
{
    public interface IAppConfigService
    {
        Task<Entities.AppConfig> Provide(int? id, string key, string description, string value);

        Task<double?> GetPeriodInDaysToKeepLogs();
    }
}
