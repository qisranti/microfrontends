using MediatR;
using Microsoft.Extensions.Logging;
using Poke.Application.Contracts.Persistence;
using Poke.Application.Models;
using Poke.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Application.Features.Battles.Command.SetWinner
{
    public class SetWinnerCommandHandler : IRequestHandler<SetWinnerCommand, CreateCommandResponse<Battle>>
    {
        private readonly IBattleRepository _battleRepository;
        private readonly ILogger<SetWinnerCommandHandler> _logger;
        public SetWinnerCommandHandler(IBattleRepository battleRepository, ILogger<SetWinnerCommandHandler> logger)
        {
            _battleRepository = battleRepository;
            _logger = logger;
        }

        public async Task<CreateCommandResponse<Battle>> Handle(SetWinnerCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _battleRepository.UpdateAsync(request.Battle);
                return new CreateCommandResponse<Battle>(request.Battle, "Battle Updated", true);
            }
            catch (Exception ex) 
            {
                _logger.LogError($"Error updating the battle: {ex.Message}", ex);
                return new CreateCommandResponse<Battle>(null, $"There is an error updating the battle: {ex.Message}", false);
            }
        }
    }
}
