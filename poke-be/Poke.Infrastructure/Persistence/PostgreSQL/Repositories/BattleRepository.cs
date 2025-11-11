using AutoMapper;
using Poke.Application.Contracts.Persistence;
using Poke.Domain.Entities;
using Poke.Infrastructure.Persistence.PostgreSQL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Infrastructure.Persistence.PostgreSQL.Repositories
{
    public class BattleRepository : BaseRepository<Battle, BattleEntity>, IBattleRepository
    {
        private readonly IMapper _mapper;
        public BattleRepository(AppDbContext context, IMapper mapper): base(context, mapper) 
        {
            _mapper = mapper;
        }
    }
}
