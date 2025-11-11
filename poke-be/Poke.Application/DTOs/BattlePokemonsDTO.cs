using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Application.DTOs
{
    public class BattlePokemonsDTO
    {
        public int BattleId { get; set; }
        public required string PlayerName { get; set; }
        public required string PokemonName { get; set; }
        public float PokemonHp { get; set; }
        public int PokemonId { get; set; }
        public bool IsAlive { get; set; }
    }
}
