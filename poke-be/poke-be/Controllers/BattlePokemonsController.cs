using MediatR;
using Microsoft.AspNetCore.Mvc;
using Poke.Application.Features.BattlePokemons.Command.AttackPokemon;
using Poke.Application.Features.BattlePokemons.Command.CreateBattlePokemons;
using Poke.Domain.Entities;

namespace poke_be.Controllers
{
    [ApiController]
    [Route("api/v1/BattlePokemons/")]
    public class BattlePokemonsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BattlePokemonsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetBattlePlayerPokemons")]
        public async Task<IActionResult> GetBattlePlayerPokemons([FromQuery] int battleId, [FromQuery] int player)
        {
            return null;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePlayerPokemon([FromBody] BattlePokemons battlePokemons)
        {
            CreateBattlePokemonsCommand command = new CreateBattlePokemonsCommand() { BattlePokemons = battlePokemons };
            return Ok(await _mediator.Send(command));
        }

        [HttpPost("AttackPokemon")]
        public async Task<IActionResult> AttackPokemon([FromBody] BattlePokemons TargetPokemon, [FromQuery] int Attack)
        {
            AttackPokemonCommand command = new AttackPokemonCommand() 
            { 
                TargetPokemon = TargetPokemon,
                Attack = Attack 
            };
            return Ok(await _mediator.Send(command));
        }

    }
}
