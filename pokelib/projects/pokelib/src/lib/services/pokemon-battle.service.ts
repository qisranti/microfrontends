import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

/*
 * @TODO:
 * Add return types to methods
 * Use signals instead of plain objects
 * State should be readonly
 * Avoid mutating variables
 * Try to avoid using delete
 */
@Injectable({
  providedIn: 'root',
})
export class PokemonBattleService {
  #playersPokemons: { [player: string]: Pokemon[] } = {};

  setPlayerPokemons(player: string, pokemons: Pokemon[]) {
    this.#playersPokemons[player] = pokemons;
  }
  getPlayerPokemons(player: string): Pokemon[] {
    return this.#playersPokemons[player] || [];
  }
  clearPlayerPokemons(player: string) {
    delete this.#playersPokemons[player];
  }
  
}
