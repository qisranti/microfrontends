using MediatR;
using Poke.Application.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Application.Features.BattlePokemons.Command.AttackPokemon
{
    public class AttackPokemonCommand : IRequest<CreateCommandResponse<Domain.Entities.BattlePokemons>>
    {
        public required Domain.Entities.BattlePokemons TargetPokemon { get; set; }
        public int Attack {  get; set; }
    }
}
