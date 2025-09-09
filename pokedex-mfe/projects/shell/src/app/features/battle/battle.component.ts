import { Component, inject, OnInit } from '@angular/core';
import { PokemonService } from 'pokelib';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
  selector: 'app-battle',
  imports: [MatProgressBarModule],
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent{
  readonly #pokemonService = inject(PokemonService);
  
  constructor() { 
    this.#pokemonService.getPokemonStats(1).subscribe(stats => {
      console.log('Bulbasaur stats:', stats);
    });

    this.#pokemonService.getPokemonStats(2).subscribe(stats => {
      console.log('Ivysaur stats:', stats);
    }); 
  }


}
