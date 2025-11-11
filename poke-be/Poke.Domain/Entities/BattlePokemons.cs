using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Domain.Entities
{
    public class BattlePokemons
    {
        public int Id { get; set; }
        public int BattleId { get; set; }
        public required string PlayerName { get; set; }
        public required string PokemonName { get; set; }
        public float PokemonHp { get; set; }
        public int PokemonId { get; set; }
        public bool IsAlive { get; set; }
    }
}
