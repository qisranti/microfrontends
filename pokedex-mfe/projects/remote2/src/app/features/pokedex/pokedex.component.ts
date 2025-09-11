import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  effect,
  computed,
  input,
  runInInjectionContext,
  EnvironmentInjector,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PokemonService } from 'pokelib';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  imports: [MatCardModule, MatDividerModule, CommonModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent {
  
  #pokemonService = inject(PokemonService);
  // #selectedId = this.#pokemonService.getSelectedPokemon();
  pokemonId = input<number>();
  injector = inject(EnvironmentInjector);

  // pokemon = toSignal(this.#pokemonService.getPokemonDetails(this.#selectedId()));

  // @TODO: Implemente PokeState with pokeId subject and update it from remote1
  // readonly #pokeState = inject(PokeState);
  // readonly #pokeId$ = this.#pokeState.getPokemonId$;
  // readonly pokemon$ = this.pokeId$.pipe(
  //   switchMap((pokeId) => this.#pokemonService.getPokemonDetails(id)),
  // );
  // ... (HTML)
  // pokemon$ | async

  pokemon$ = computed(() => {
    const id = this.pokemonId();
    if (id) {
      return this.#pokemonService.getPokemonDetails(id);
    }
    return null;
  });

  // 

  constructor() {
    effect((): void => {
      //console.log('Selected Pokémon changed:', this.#selectedId$());
      runInInjectionContext(this.injector, () => {
        // const pokemon = toSignal(of(null), { injector: this.injector, initialValue: null });
      });

      console.log('Fetching new Pokémon details...');
    });
  }
}
