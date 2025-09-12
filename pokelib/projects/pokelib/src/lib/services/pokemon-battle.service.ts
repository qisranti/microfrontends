import { computed, Injectable, signal } from '@angular/core';
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
  readonly #playersPokemons = signal(new Map<string, readonly Pokemon[]>());
  
  // Record mas performance?
  readonly #recordPlayersPokemons = signal<Record<string, readonly Pokemon[]>>({"":[]});

  setPlayerPokemons(player: string, pokemons: readonly Pokemon[]): void {
    const currentMap = new Map(this.#playersPokemons());
    currentMap.set(player, [...pokemons]);
    this.#playersPokemons.set(currentMap);
  }

  getPlayerPokemons(player: string): readonly Pokemon[] {
    return this.#playersPokemons().get(player) ?? [];
  }

  clearPlayerPokemons(player: string): void {
    const currentMap = new Map(this.#playersPokemons());
    if (currentMap.has(player)) {
      currentMap.set(player, []);
      this.#playersPokemons.set(currentMap);
    }
  }

  clearPlayersPokemons(): void {
    this.#playersPokemons.set(new Map<string, readonly Pokemon[]>());
  }

  readonly allPlayersPokemons = computed(() => this.#playersPokemons());
}
