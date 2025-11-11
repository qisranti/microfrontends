using MediatR;
using Microsoft.Extensions.Logging;
using Poke.Application.Contracts.Persistence;
using Poke.Application.Features.BattlePokemons.Command.CreateBattlePokemons;
using Poke.Application.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Application.Features.BattlePokemons.Command.AttackPokemon
{
    public class AttackPokemonCommandHandler : IRequestHandler<AttackPokemonCommand, CreateCommandResponse<Domain.Entities.BattlePokemons>>
    {
        private readonly IBattlePokemonsRepository _battlePokemonsRepository;
        private readonly ILogger<AttackPokemonCommandHandler> _logger;
        public AttackPokemonCommandHandler(IBattlePokemonsRepository battlePokemonsRepository, ILogger<AttackPokemonCommandHandler> logger)
        {
            _battlePokemonsRepository = battlePokemonsRepository;
            _logger = logger;
        }

        public async Task<CreateCommandResponse<Domain.Entities.BattlePokemons>> Handle(AttackPokemonCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _battlePokemonsRepository.Attack(request.TargetPokemon, request.Attack);
                return new CreateCommandResponse<Domain.Entities.BattlePokemons>(request.TargetPokemon, "Pokemon Attacked", true);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while attacking {ex.Message}", ex);
                return new CreateCommandResponse<Domain.Entities.BattlePokemons>
                (
                    null,
                    $"Something happened while creating record in DB: {ex.Message}",
                    false
                );
            }
        }
    }
}
