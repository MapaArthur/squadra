using ApplicationCore.Interfaces.User;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class UserService : IUserService
    {

        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<Entities.User> Provide(Entities.User user)
        {
            return await _userRepository.AddAsync(user);
        }

        public async Task<Entities.User> Authenticate(Entities.User user)
        {
            return await _userRepository.GetByGetUser(user);
        }
    }
}
