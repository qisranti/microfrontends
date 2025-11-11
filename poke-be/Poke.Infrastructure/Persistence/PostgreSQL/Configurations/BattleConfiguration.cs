using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Poke.Infrastructure.Persistence.PostgreSQL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Infrastructure.Persistence.PostgreSQL.Configurations
{
    public class BattleConfiguration : IEntityTypeConfiguration<BattleEntity>
    {
        public void Configure(EntityTypeBuilder<BattleEntity> builder) {
            builder.ToTable("battles");
            ConfigureColumns(builder);
        }

        private static void ConfigureColumns(EntityTypeBuilder<BattleEntity> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Player1Name);
            builder.Property(e => e.Player2Name);
            builder.Property(e => e.Winner);
        }

        private static void ConfigureRelationships(EntityTypeBuilder<BattleEntity> builder)
        {
        }
    }
}
