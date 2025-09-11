import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

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
