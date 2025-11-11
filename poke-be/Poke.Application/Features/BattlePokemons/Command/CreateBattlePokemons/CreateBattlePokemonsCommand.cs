using MediatR;
using Poke.Application.Models;
using Poke.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Application.Features.BattlePokemons.Command.CreateBattlePokemons
{
    public class CreateBattlePokemonsCommand : IRequest<CreateCommandResponse<Domain.Entities.BattlePokemons>>
    {
        public required Domain.Entities.BattlePokemons BattlePokemons { get; set; }
    }
}
