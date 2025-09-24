import { loadRemoteModule } from '@angular-architects/native-federation';
import { AfterViewInit, Component, EnvironmentInjector, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { BattleData } from 'pokelib';

@Component({
  selector: 'app-shell-players-selection',
  imports: [],
  templateUrl: './players-selection.html',
  styleUrl: './players-selection.scss',
})
export class PlayersSelection  implements AfterViewInit {
  readonly #injector = inject(EnvironmentInjector);

  @ViewChild('placePlayer1Selection', { read: ViewContainerRef, static: true })
  placePlayer1Selection!: ViewContainerRef;
  @ViewChild('placePlayer2Selection', { read: ViewContainerRef, static: true })
  placePlayer2Selection!: ViewContainerRef;

  ngAfterViewInit(): void {
    this.loadPlayer1SelectionComponent().then(() => {
      console.log('Player 1 Selection Component loaded');
    });
    this.loadPlayer2SelectionComponent().then(() => {
      console.log('Player 2 Selection Component loaded');
    });
  }


  async loadPlayer1SelectionComponent(): Promise<void> {
    try {
      const m = await loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.json',
        exposedModule: './PokemonsSelection',
      });

      const pokemonSelectionRef = this.placePlayer1Selection.createComponent(
        m.PokemonSelectionComponent,
        {
          injector: this.#injector,
        }
      );

      const componentInstance = pokemonSelectionRef.instance as any;

      componentInstance.instance.battleStarted.subscribe((data: BattleData) => {
        console.log('Nombre del jugador:', data.player1Name);
        console.log('pokemons seleccionados:', data.player1PokemonIDs);
        // Aca ya cargo el player
      });
    } catch (error) {
      console.error('Failed loading the Pokemon Selection Component', error);
    }
  }

  async loadPlayer2SelectionComponent(): Promise<void> {
    try {
      const m = await loadRemoteModule({
        remoteEntry: 'http://localhost:4201/remoteEntry.json',
        exposedModule: './PokemonsSelection',
      });

      const pokemonSelectionRef = this.placePlayer2Selection.createComponent(
        m.PokemonSelectionComponent,
        {
          injector: this.#injector,
        }
      );

      const componentInstance = pokemonSelectionRef.instance as any;

      componentInstance.instance.battleStarted.subscribe((data: BattleData) => {
        console.log('Nombre del jugador:', data.player1Name);
        console.log('pokemons seleccionados:', data.player1PokemonIDs);
        // Aca ya cargo el player
      });
    } catch (error) {
      console.error('Failed loading the Pokemon Selection Component', error);
    }
  }

}
