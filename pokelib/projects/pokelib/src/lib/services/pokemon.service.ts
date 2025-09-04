import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { PokemonList } from '../models/pokemon-list.model';
import { PokemonDetails } from '../models/pokemon-details.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  #baseUrl = 'https://pokeapi.co/api/v2';
  #http = inject(HttpClient);

  // privado y readonly
  readonly #selectedPokemon = signal<number>(1);

  setSelectedPokemon(pokemonId: number) {
    this.#selectedPokemon.set(pokemonId);
  }

  getSelectedPokemon() {
    console.log('Getting selected pokemon:', this.#selectedPokemon());
    return this.#selectedPokemon;
  }

  getPokemonList(offset: number, limit: number, ) {
    const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    return this.#http.get<PokemonList>(`${this.#baseUrl}/pokemon`, { params });
  }

  getPokemonImage(pokemonId: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  }

  getPokemonDetails(pokemonId: number) {
    return this.#http.get<PokemonDetails>(`${this.#baseUrl}/pokemon/${pokemonId}`);
  }
}
