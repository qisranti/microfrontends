import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokedexStateService {
  #pokemonId = new BehaviorSubject<number>(1);

  get pokemonId$() {
    return this.#pokemonId.asObservable();
  }

  setPokemonId(id: number): void {
    this.#pokemonId.next(id);
  }
}
