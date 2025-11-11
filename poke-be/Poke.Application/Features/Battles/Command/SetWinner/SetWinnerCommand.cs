using MediatR;
using Poke.Application.Models;
using Poke.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;

namespace Poke.Application.Features.Battles.Command.SetWinner
{
    public class SetWinnerCommand : IRequest<CreateCommandResponse<Battle>>
    {
        public required Battle Battle { get; set; }
    }
}
