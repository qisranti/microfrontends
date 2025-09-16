import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Pokemon, PokemonIdPipe, PokemonImagePipe, PokemonMove, PokemonService } from 'pokelib';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-battle-controls',
  imports: [MatProgressBarModule, CommonModule, PokemonIdPipe, PokemonImagePipe],
  templateUrl: './battle-controls.component.html',
  styleUrls: ['./battle-controls.component.scss'],
  providers: [PokemonIdPipe],
})
export class BattleControlsComponent {
  @Input() playerName!: string;
  @Input() playerPokemons!: Pokemon[];
  readonly #destroyRef = inject(DestroyRef);
  readonly #pokemonIdPipe = inject(PokemonIdPipe);
  readonly selectedPokemon = signal<Pokemon>({name: 'Ditto', url: 'https://pokeapi.co/api/v2/pokemon/132/'});
  pokemonMoves: PokemonMove[] = [];
  readonly #pokemonService = inject(PokemonService);

  constructor() {}

  selectPokemon(pokemon: Pokemon): void {
    this.selectedPokemon.set(pokemon);
    const pokemonId = this.#pokemonIdPipe.transform(pokemon.url);
    
    this.#pokemonService
      .getPokemonMoves(Number(pokemonId))
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((moves) => {
        this.pokemonMoves = moves;
      });
  }
}
