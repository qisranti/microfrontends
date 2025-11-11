using MediatR;
using Poke.Application.Models;
using Poke.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Application.Features.Battles.Queries.GetAllBattles
{
    public class GetAllBattlesQuery : IRequest<List<Battle>>
    {
    }
}
