using Microsoft.EntityFrameworkCore;
using Poke.Infrastructure.Persistence.PostgreSQL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Infrastructure.Persistence.PostgreSQL
{
    public class AppDbContext : DbContext
    {
        public virtual DbSet<BattleEntity> Battles { get; set; }
        public virtual DbSet<BattlePokemonEntity> BattlePokemons { get; set; }
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }
    }
}
