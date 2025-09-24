import {
  AfterViewInit,
  Component,
  inject,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Moves, PokemonMove, PokemonService, Pokemon, BattleData } from 'pokelib';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { loadRemoteModule } from '@angular-architects/native-federation';

@Component({
  selector: 'app-battle',
  imports: [MatProgressBarModule, CommonModule],
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements AfterViewInit {
  readonly #pokemonService = inject(PokemonService);
  readonly #injector = inject(Injector);
  @ViewChild('placePlayer1', { read: ViewContainerRef, static: true })
  placePlayer1!: ViewContainerRef;
  @ViewChild('placePlayer2', { read: ViewContainerRef, static: true })
  placePlayer2!: ViewContainerRef;

  playerName = 'Ash';
  pokemons: Pokemon[] = [
    { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'Ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'Venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
  ];

  player2Pokemons = [
    { name: 'Charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'Charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
    { name: 'Charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
  ];

  pokemonMoves: PokemonMove[] = [];

  // imports: [AsyncPipe],
  // ...
  // protected readonly pokemonMoves$ = this.#pokemonService.getPokemonMoves(1);
  // ...
  // @let pokemonMoves = (pokemonMoves$ | async)
  // @for (abilitie of pokemonMoves; track abilitie.name) { ... }

  ngAfterViewInit(): void {
    this.loadPokemonBattleControllers().then(() => {
      console.log('Pokemon Player 1 loaded');
    });
  }

  constructor() {
    this.#pokemonService.getPokemonMoves(1).subscribe((moves) => {
      this.pokemonMoves = moves;
    });
    this.#pokemonService.getPokemonStats(1).subscribe((stats) => {
      console.log('Bulbasaur stats:', stats);
    });

    this.#pokemonService.getPokemonStats(2).subscribe((stats) => {
      console.log('Ivysaur stats:', stats);
    });
  }

  async loadPokemonBattleControllers(): Promise<void> {
    try {
      const m = await loadRemoteModule({
        remoteEntry: 'http://localhost:4202/remoteEntry.json',
        exposedModule: './BattleControls',
      });

      const player1Ref = this.placePlayer1.createComponent(m.BattleControlsComponent, {
        injector: this.#injector,
      });
      player1Ref.setInput('playerName', this.playerName);
      player1Ref.setInput('playerPokemons', this.pokemons);

      const player2Ref = this.placePlayer2.createComponent(m.BattleControlsComponent, {
        injector: this.#injector,
      });
      player2Ref.setInput('playerName', 'Misty');
      player2Ref.setInput('playerPokemons', this.player2Pokemons);
    } catch (error) {
      console.error('Failed loading the Player 1', error);
    }
  }



}
