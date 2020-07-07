using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Data
{
    public class SquadraContext : DbContext
    {
        public SquadraContext(DbContextOptions<SquadraContext> options) : base(options)
        {
        }
        public DbSet<ApplicationCore.Entities.System> System { get; set; }
        public DbSet<ApplicationCore.Entities.AppConfig> AppConfig { get; set; }

        public DbSet<ApplicationCore.Entities.User> User { get; set; }
    }
}
