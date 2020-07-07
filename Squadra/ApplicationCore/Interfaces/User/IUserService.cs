using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.User
{
    public interface IUserService
    {
        Task<Entities.User> Provide(Entities.User user);

        Task<Entities.User> Authenticate(Entities.User user);
    }
}
