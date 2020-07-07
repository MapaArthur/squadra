using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.System
{
    public interface ISystemService
    {
        Task<Entities.System> Provide(Entities.System system);

        Task<List<Entities.System>> GetSystem(Entities.System system);

    }
}
