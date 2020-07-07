using ApplicationCore.Interfaces.AppConfig;
using ApplicationCore.Interfaces.System;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class SystemService : ISystemService
    {
        private readonly ISystemRepository _systemRepository;
        private readonly ISystemService _systemService;

        public SystemService(ISystemRepository systemRepository)
        {
            _systemRepository = systemRepository;
        }
        public async Task<Entities.System> Provide(Entities.System v_system)
        {
            try
            {
                if (v_system.ID != 0)
                {
                    var p_system = await _systemRepository.GetByIDAsync(v_system.ID);
                    p_system.CreationDate = v_system.CreationDate;
                    p_system.description = v_system.description;
                    p_system.email = v_system.email;
                    p_system.initials = v_system.initials;
                    p_system.justification = v_system.justification;
                    p_system.LastModificationDate = DateTime.Now;
                    p_system.newjustification = v_system.newjustification;
                    p_system.status = v_system.status;
                    p_system.url = v_system.url;
                    return await _systemRepository.UpdateAsync(p_system);
                }
                else
                {
                    v_system.CreationDate = DateTime.Now;
                    v_system.LastModificationDate = DateTime.Now;
                } 
                return await _systemRepository.AddAsync(v_system);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<List<Entities.System>> GetSystem(Entities.System v_system)
        {
            if (v_system.description != null && v_system.email != null && v_system.initials != null)
            {
                return await _systemRepository.GetSystemByDescInitEmail(v_system.description, v_system.initials, v_system.email);
            }
            else if (v_system.description == null && v_system.initials == null)
            {
                return await _systemRepository.GetSystemByEmail(v_system.email);
            }
            else if (v_system.description == null && v_system.email == null)
            {
                return await _systemRepository.GetSystemByInitials(v_system.initials);
            }
            else return await _systemRepository.GetSystemByDescription(v_system.description);
        }
    }
}
