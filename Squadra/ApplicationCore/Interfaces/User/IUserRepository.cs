using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.User
{
    public interface IUserRepository : IAsyncRepository<Entities.User>
    {
        Task<Entities.User> GetByIDAsync(int id);

        Task<Entities.User> GetByGetUser(Entities.User user);
    }
}
