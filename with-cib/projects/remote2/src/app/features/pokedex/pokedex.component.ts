import { AfterViewInit, Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { PokemonList, PokemonService } from 'pokelib';
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
  selector: 'app-pokedex',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    PokemonIdPipe,
    PokemonImagePipe,
  ],
  providers: [PokemonIdPipe, PokemonImagePipe, PokemonService],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
// todos los componentes deben ser OnPush (Averiguar)
export class PokedexComponent {
  // cambiarlo a signals
  @ViewChild('placePokemonDetails', { read: ViewContainerRef, static: true })
  placePokemonDetails!: ViewContainerRef;
  #pokeService = inject(PokemonService);
  #pokemonIdPipe = inject(PokemonIdPipe);

  limit = 120;
  offset = 0;

  constructor() {
    this.loadPokemonDetails();
  }

  pokemons$: Observable<Pokemon[]> = this.#pokeService
    .getPokemonList(this.offset, this.limit)
    .pipe(map((response) => response.results || []));

  getPokemonId(url: string): number {
    // Averiguar como angular agarra la Id de la URL
    const segments = url.split('/').filter((segment) => segment.length > 0);
    return Number(segments[segments.length - 1]);
  }

  getPokemonImage(pokemonId: number): string {
    return this.#pokeService.getPokemonImage(pokemonId);
  }

  async loadPokemonDetails(): Promise<void> {
    try {
      const m = await loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.json',
        exposedModule: './PokemonDetails',
      });

      this.placePokemonDetails.createComponent(m.PokemonDetailsComponent);
    } catch (error) {
      console.error('Failed loading the Pokemon Details:', error);
    }
  }

  selectPokemon(pokemonUrl: string) {
    const pokemonId = this.#pokemonIdPipe.transform(pokemonUrl);
    this.#pokeService.setSelectedPokemon(Number(pokemonId));
  }
}
