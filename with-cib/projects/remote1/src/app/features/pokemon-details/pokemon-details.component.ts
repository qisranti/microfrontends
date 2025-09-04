import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, effect } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PokemonService } from 'pokelib';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  imports: [MatCardModule, MatDividerModule, CommonModule],
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
  providers: [PokemonService]
})
export class PokemonDetailsComponent implements OnInit {
  #pokemonService = inject(PokemonService);
  #selectedId = this.#pokemonService.getSelectedPokemon();

  pokemon = toSignal(this.#pokemonService.getPokemonDetails(this.#selectedId()));


  constructor() {
    effect((): void => { 
      console.log('Selected Pokémon changed:', this.#selectedId()); 
    });
  }

  ngOnInit() {

  }
}
