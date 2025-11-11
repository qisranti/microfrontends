using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Poke.Application.Contracts.Persistence;
using Poke.Domain.Entities;
using Poke.Infrastructure.Persistence.PostgreSQL.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace Poke.Infrastructure.Persistence.PostgreSQL.Repositories
{
    public class BattlePokemonRepository : BaseRepository<BattlePokemons, BattlePokemonEntity>, IBattlePokemonsRepository
    {
        private readonly IMapper _mapper;
        public BattlePokemonRepository(AppDbContext context, IMapper mapper) : base(context, mapper)
        {
            _mapper = mapper;
        }

        public async Task<BattlePokemons> Attack(BattlePokemons Objective, int Attack)
        {
            Objective.PokemonHp -= Attack;

            if (Objective.PokemonHp < 0)
            {
                Objective.PokemonHp = 0;
            }
            
            _context.BattlePokemons.Update(_mapper.Map<BattlePokemonEntity>(Objective));
            await _context.SaveChangesAsync();

            return Objective;
        }

        public async Task<List<BattlePokemons>> GetPlayerPokemons(string PlayerName)
        {
            var entityList = await _context.BattlePokemons
                                   .Where(p => p.PlayerName == PlayerName)
                                   .ToListAsync();
            var domainList = _mapper.Map<List<BattlePokemons>>(entityList);
            return domainList;
        }
    }
}
