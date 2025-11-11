using MediatR;
using Poke.Application.Models;
using Poke.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Application.Features.Battles.Command.CreateBattle
{
    public class CreateBattleCommand : IRequest<CreateCommandResponse<Battle>>
    {
        public required Battle Battle { get; set; }
    }
}
