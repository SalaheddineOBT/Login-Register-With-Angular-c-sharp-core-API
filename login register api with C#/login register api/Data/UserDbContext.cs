using login_register_api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace login_register_api.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {

        }

        public DbSet<User> user{ get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<User>().ToTable("users");
        }

    }
}
