using MediatR;
using Microsoft.Extensions.Logging;
using Poke.Application.Contracts.Persistence;
using Poke.Application.Features.Battles.Command.CreateBattle;
using Poke.Application.Models;
using Poke.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Application.Features.BattlePokemons.Command.CreateBattlePokemons
{
    public class CreateBattlePokemonsCommandHandler : IRequestHandler<CreateBattlePokemonsCommand, CreateCommandResponse<Domain.Entities.BattlePokemons>>
    {
        private readonly IBattlePokemonsRepository _battlePokemonsRepository;
        private readonly ILogger<CreateBattlePokemonsCommandHandler> _logger;
        public CreateBattlePokemonsCommandHandler(IBattlePokemonsRepository battlePokemonsRepository, ILogger<CreateBattlePokemonsCommandHandler> logger)
        {
            _battlePokemonsRepository = battlePokemonsRepository;
            _logger = logger;
        }

        public async Task<CreateCommandResponse<Domain.Entities.BattlePokemons>> Handle(CreateBattlePokemonsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _battlePokemonsRepository.AddAsync(request.BattlePokemons);
                return new CreateCommandResponse<Domain.Entities.BattlePokemons>(request.BattlePokemons, "Battle Pokemons Created", true);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while creating the battle pokemons {ex.Message}", ex);
                return new CreateCommandResponse<Domain.Entities.BattlePokemons>
                (
                    null,
                    $"Something happened while creating the battle pokemons: {ex.Message}",
                    false
                );
            }
        }
    }
}
