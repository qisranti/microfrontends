using MediatR;
using Microsoft.AspNetCore.Mvc;
using Poke.Application.Features.Battles.Command.CreateBattle;
using Poke.Application.Features.Battles.Command.SetWinner;
using Poke.Application.Features.Battles.Queries.GetAllBattles;
using Poke.Domain.Entities;

namespace poke_be.Controllers
{
    [ApiController]
    [Route("api/v1/Battle/")]
    public class BattleController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BattleController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPut]
        public async Task<IActionResult> SetWinner([FromBody] Battle battle)
        {
            SetWinnerCommand command = new SetWinnerCommand() { Battle = battle };
            return Ok(await _mediator.Send(command));
        }


        [HttpPost]
        public async Task<IActionResult> CreateBattle([FromBody] Battle battle)
        {
            CreateBattleCommand command = new CreateBattleCommand() { Battle = battle };
            return Ok(await _mediator.Send(command));
        }



        [HttpGet]
        public async Task<IActionResult> GetAllBattles()
        {
            GetAllBattlesQuery query = new GetAllBattlesQuery();
            return Ok(await _mediator.Send(query));
        }
    }
}
