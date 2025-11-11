using MediatR;
using Microsoft.Extensions.Logging;
using Poke.Application.Contracts.Persistence;
using Poke.Application.Models;
using Poke.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Application.Features.Battles.Queries.GetAllBattles
{
    public class GetAllBattlesQueryHandler : IRequestHandler<GetAllBattlesQuery, List<Battle>>
    {
        private readonly IBattleRepository _battleRepository;
        private readonly ILogger<GetAllBattlesQueryHandler> _logger;

        public GetAllBattlesQueryHandler(IBattleRepository battleRepository, ILogger<GetAllBattlesQueryHandler> logger)
        {
            _battleRepository = battleRepository;
            _logger = logger;
        }

        public async Task<List<Battle>> Handle(GetAllBattlesQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Battle> battles = await _battleRepository.GetAllAsync();
            return battles.ToList();
        }
    }
}
