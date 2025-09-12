import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Pokemon, PokemonIdPipe, PokemonImagePipe, PokemonMove, PokemonService } from 'pokelib';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/* 
 * @TODO:
 * You should use this "providers: [PokemonIdPipe]" if you need to provide something (including pipes)
 */
@Component({
  selector: 'app-battle-controls',
  imports: [MatProgressBarModule, CommonModule, PokemonIdPipe, PokemonImagePipe],
  templateUrl: './battle-controls.component.html',
  styleUrls: ['./battle-controls.component.scss'],
  providers: [PokemonIdPipe],
})
export class BattleControlsComponent {
  @Input() player!: string;
  @Input() playerPokemons!: Pokemon[];
  readonly #destroyRef = inject(DestroyRef);
  readonly #pokemonIdPipe = inject(PokemonIdPipe);
  selectedPokemon!: Pokemon;
  pokemonMoves: PokemonMove[] = [];
  readonly #pokemonService = inject(PokemonService);

  constructor() {}

  selectPokemon(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    const pokemonId = this.#pokemonIdPipe.transform(pokemon.url);
    this.#pokemonService
      .getPokemonMoves(Number(pokemonId))
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((moves) => {
        this.pokemonMoves = moves;
      });
  }

}
