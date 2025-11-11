using MediatR;
using Microsoft.Extensions.Logging;
using Poke.Application.Contracts.Persistence;
using Poke.Application.Models;
using Poke.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Application.Features.Battles.Command.CreateBattle
{
    public class CreateBattleCommandHandler : IRequestHandler<CreateBattleCommand, CreateCommandResponse<Battle>>
    {
        private readonly IBattleRepository _battleRepository;
        private readonly ILogger<CreateBattleCommandHandler> _logger;
        public CreateBattleCommandHandler(IBattleRepository battleRepository, ILogger<CreateBattleCommandHandler> logger)
        {
            _battleRepository = battleRepository;
            _logger = logger;
        }

        public async Task<CreateCommandResponse<Battle>> Handle(CreateBattleCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _battleRepository.AddAsync(request.Battle);
                return new CreateCommandResponse<Battle>(request.Battle, "Battle Created", true);
            }catch(Exception ex)
            {
                _logger.LogError($"Error while creating the battle {ex.Message}", ex);
                return new CreateCommandResponse<Battle>
                (
                    null,
                    $"Something happened while creating the battle: {ex.Message}",
                    false
                );
            }
        }
    }
}
