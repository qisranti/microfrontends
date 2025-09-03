import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { PokemonList } from '../models/pokemon-list.model';

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
    return this.#selectedPokemon;
  }

  getPokemonList(limit: number, offset: number) {
    const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    return this.#http.get<PokemonList>(`${this.#baseUrl}/pokemon`, { params });
  }

  getPokemonImage(pokemonId: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  }

  getPokemonDetails(pokemonId: number) {
    return this.#http.get(`${this.#baseUrl}/pokemon/${pokemonId}`);
  }
}
