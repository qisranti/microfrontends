using Poke.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Application.Contracts.Persistence
{
    public interface IBattlePokemonsRepository : IBaseRepository<BattlePokemons>
    {
        Task<List<BattlePokemons>> GetPlayerPokemons(string PlayerName);
        Task<BattlePokemons> Attack(BattlePokemons Objective, int Attack);
    }
}
