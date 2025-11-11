using AutoMapper;
using Poke.Application.DTOs;
using Poke.Domain.Entities;
using Poke.Infrastructure.Persistence.PostgreSQL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Infrastructure.Persistence.PostgreSQL.Mappings
{
    public class MappingsProfile : Profile
    {
        public MappingsProfile() {
            // Battle
            CreateMap<Battle, BattleEntity>().ReverseMap();
            CreateMap<BattleDTO, Battle>().ReverseMap();
            CreateMap<BattleDTO, BattleEntity>().ReverseMap();

            // Battle Pokemon
            CreateMap<BattlePokemons, BattlePokemonEntity>().ReverseMap();
            CreateMap<BattlePokemonsDTO, BattlePokemons>().ReverseMap();
            CreateMap<BattlePokemonsDTO, BattlePokemonEntity>().ReverseMap();
        }
    }
}
