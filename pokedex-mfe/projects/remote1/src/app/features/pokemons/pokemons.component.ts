import {
  AfterViewInit,
  Component,
  effect,
  inject,
  Injector,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { PokedexStateService, PokemonList, PokemonService } from 'pokelib';
import { Pokemon } from 'pokelib';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { map, Observable } from 'rxjs';
import { PokemonIdPipe } from 'pokelib';
import { PokemonImagePipe } from 'pokelib';

@Component({
  selector: 'app-pokemons',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    PokemonIdPipe,
    PokemonImagePipe,
  ],
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
  providers: [PokemonIdPipe],
})
export class PokemonsComponent {
  @ViewChild('placePokemonDetails', { read: ViewContainerRef, static: true })
  placePokemonDetails!: ViewContainerRef;
  readonly #pokeService = inject(PokemonService);
  readonly #pokedexState = inject(PokedexStateService);
  readonly #pokemonIdPipe = inject(PokemonIdPipe);
  readonly #injector = inject(Injector);
  readonly #selectedPokemonId = signal<number | undefined>(undefined);

  limit = 120;
  offset = 0;

  constructor() {
    this.loadPokemonDetails().then(() => {
      console.log('Pokemon Details loaded');
    });
  }

  pokemons$: Observable<Pokemon[]> = this.#pokeService
    .getPokemonList(this.offset, this.limit)
    .pipe(map((response) => response.results || []));

  async loadPokemonDetails(): Promise<void> {
    try {
      const m = await loadRemoteModule({
        remoteEntry: 'http://localhost:4202/remoteEntry.json',
        exposedModule: './Pokedex',
      });

      this.placePokemonDetails.createComponent(m.PokedexComponent, {
        injector: this.#injector,
      });
      
      // const componentRef = this.placePokemonDetails.createComponent(m.PokedexComponent, {
      //   injector: this.#injector,
      // });

      // effect(
      //   () => {
      //     if (this.#selectedPokemonId()) {
      //       componentRef.setInput('pokemonId', this.#selectedPokemonId());
      //     }
      //   },
      //   { injector: this.#injector }
      // );

    } catch (error) {
      console.error('Failed loading the Pokemon Details:', error);
    }
  }

  selectPokemon(pokemonUrl: string) {
    const pokemonId = this.#pokemonIdPipe.transform(pokemonUrl);
    this.#selectedPokemonId.set(Number(pokemonId));
    this.#pokedexState.setPokemonId(pokemonId);
    console.log('Selected ID in Pokemons List Component:', this.#selectedPokemonId());
  }
}
