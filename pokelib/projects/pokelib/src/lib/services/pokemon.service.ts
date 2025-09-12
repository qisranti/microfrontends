import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { PokemonList } from '../models/pokemon-list.model';
import { PokemonDetails } from '../models/pokemon-details.model';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Moves } from '../models/moves.model';
import { PokemonMove } from '../models/pokemon-move.model';
import { PokemonMoveApi } from '../models/pokemon-move-api.model';

/*
 * @TODO: Add return types to methods
 */

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  readonly #baseUrl = 'https://pokeapi.co/api/v2';
  readonly #http = inject(HttpClient);

  getPokemonList(offset: number, limit: number): Observable<PokemonList> {
    const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    return this.#http.get<PokemonList>(`${this.#baseUrl}/pokemon`, { params });
  }

  getPokemonImage(pokemonId: number) : string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  }

  getPokemonDetails(pokemonId: number) : Observable<PokemonDetails> {
    return this.#http.get<PokemonDetails>(`${this.#baseUrl}/pokemon/${pokemonId}`);
  }

  getPokemonStats(pokemonId: number): Observable<{ name: string; value: number }[]> {
    return this.#http.get<PokemonDetails>(`${this.#baseUrl}/pokemon/${pokemonId}`).pipe(
      map((details) =>
        details.stats.map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        }))
      )
    );
  }

  getPokemonMoves(pokemonId: number): Observable<PokemonMove[]> {
  return this.#http.get<PokemonDetails>(`${this.#baseUrl}/pokemon/${pokemonId}`).pipe(
    switchMap((details) => {
      const moveRequests = details.moves.map((m) =>
        this.#http.get<PokemonMoveApi>(m.move.url).pipe(
          map(
            (move): PokemonMove => ({
              name: move.name,
              power: move.power,
              accuracy: move.accuracy,
              pp: move.pp,
              type: move.type.name,
              damageClass: move.damage_class.name,
            })
          )
        )
      );
      return forkJoin(moveRequests);
    })
  );
}
}
