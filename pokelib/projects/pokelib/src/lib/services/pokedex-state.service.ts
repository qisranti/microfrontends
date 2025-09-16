import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokedexStateService {
  // #pokemonId = new BehaviorSubject<number>(1);
  #pokemonId = signal<number | any>(1);

  get pokemonId() {
    // return this.#pokemonId.asObservable();
    return this.#pokemonId.asReadonly();
  }

  setPokemonId(id: number): void {
    // this.#pokemonId.next(id);
    this.#pokemonId.set(id);
  }
}
