using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Poke.Infrastructure.Persistence.PostgreSQL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Infrastructure.Persistence.PostgreSQL.Configurations
{
    public class BattlePokemonConfiguration : IEntityTypeConfiguration<BattlePokemonEntity>
    {
        public void Configure(EntityTypeBuilder<BattlePokemonEntity> builder)
        {
            builder.ToTable("battlePokemons");
            ConfigureColumns(builder);
        }

        private static void ConfigureColumns(EntityTypeBuilder<BattlePokemonEntity> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.BattleId);
            builder.Property(e => e.PlayerName);
            builder.Property(e => e.PokemonName);
            builder.Property(e => e.PokemonId);
            builder.Property(e => e.PokemonHp);
            builder.Property(e => e.IsAlive);
        }

        private static void ConfigureRelationships(EntityTypeBuilder<BattlePokemonEntity> builder)
        {
        }
    }
}
