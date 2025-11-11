using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Domain.Entities
{
    public class Battle
    {
        public int Id { get; set; }
        public string Player1Name { get; set; } = string.Empty;
        public string Player2Name { get; set; } = string.Empty;
        public string Winner { get; set; } = string.Empty;
    }
}
