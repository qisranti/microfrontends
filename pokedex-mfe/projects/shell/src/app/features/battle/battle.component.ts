import { Component, inject, OnInit } from '@angular/core';
import { Moves, PokemonMove, PokemonService } from 'pokelib';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-battle',
  imports: [MatProgressBarModule, CommonModule],
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent {
  readonly #pokemonService = inject(PokemonService);

  player1Pokemons = [
    { name: 'Bulbasaur', id: 1 },
    { name: 'Charmander', id: 4 },
    { name: 'Squirtle', id: 7 },
  ];

  pokemonMoves: PokemonMove[] = [];

  // imports: [AsyncPipe],
  // ...
  // protected readonly pokemonMoves$ = this.#pokemonService.getPokemonMoves(1);
  // ...
  // @let pokemonMoves = (pokemonMoves$ | async)
  // @for (abilitie of pokemonMoves; track abilitie.name) { ... }

  constructor() {
    this.#pokemonService.getPokemonMoves(1).subscribe((moves) => {
      this.pokemonMoves = moves;
    })
    this.#pokemonService.getPokemonStats(1).subscribe((stats) => {
      console.log('Bulbasaur stats:', stats);
    });

    this.#pokemonService.getPokemonStats(2).subscribe((stats) => {
      console.log('Ivysaur stats:', stats);
    });
  }
}
