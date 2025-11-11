using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Infrastructure.Persistence.PostgreSQL.Entities
{
    public class BattleEntity
    {
        public int Id { get; set; }
        public string Player1Name { get; set; } = string.Empty;
        public string Player2Name { get; set; } = string.Empty;
        public string Winner { get; set; } = string.Empty;
    }
}
