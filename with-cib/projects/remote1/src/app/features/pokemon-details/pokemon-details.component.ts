import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, effect, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PokemonService } from 'pokelib';
// import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [MatCardModule, MatDividerModule, CommonModule],
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent implements OnInit {
  #pokemonService = inject(PokemonService);
  #selectedId$ = this.#pokemonService.getSelectedPokemon();
  pokemonId = input<number>();

  // pokemon = toSignal(this.#pokemonService.getPokemonDetails(this.#selectedId()));
  pokemon$ = computed(() => {
    const id = this.pokemonId();
    if (id) {
      return this.#pokemonService.getPokemonDetails(id);
    }
    return null; // Devuelve null si no hay ID
  });

  constructor() {
    effect((): void => {
      console.log('Selected Pokémon changed:', this.#selectedId$());
      console.log('Fetching new Pokémon details...');
    });
  }

  ngOnInit() {}
}
