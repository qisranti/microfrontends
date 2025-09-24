import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, EventEmitter, inject, OnInit, Output, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {
  PokedexStateService,
  Pokemon,
  PokemonIdPipe,
  PokemonImagePipe,
  PokemonService,
} from 'pokelib';
import { map, Observable } from 'rxjs';
import { loadRemoteModule } from '@angular-architects/native-federation';

@Component({
  selector: 'app-pokemon-selection',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    PokemonIdPipe,
    PokemonImagePipe,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './pokemon-selection.component.html',
  styleUrls: ['./pokemon-selection.component.scss'],
  providers: [PokemonIdPipe],
})
export class PokemonSelectionComponent {
  @Output() battleStarted = new EventEmitter<{ playerName: string; pokemons: Pokemon[] }>();
  @ViewChild('placePlayerBattleControls', { read: ViewContainerRef, static: true })
  placePlayerBattleControls!: ViewContainerRef;
  readonly #pokeService = inject(PokemonService);
  readonly #pokedexState = inject(PokedexStateService);
  readonly #pokemonIdPipe = inject(PokemonIdPipe);
  readonly #injector = inject(EnvironmentInjector);
  readonly selectedPokemons = signal<Pokemon[]>([]);
  ready = signal<boolean>(false);
  playerName: string = '';
  #snackBar = inject(MatSnackBar);
  #snackBarDuration = 2;

  limit = 120;
  offset = 0;

  pokemons$: Observable<Pokemon[]> = this.#pokeService
    .getPokemonList(this.offset, this.limit)
    .pipe(map((response) => response.results || []));

  onCardClick(pokemon: Pokemon) {
    // const pokemonId = this.#pokemonIdPipe.transform(pokemon.url);
    const currentIds = this.selectedPokemons();

    const isAlreadySelected = currentIds.includes(pokemon);

    if (!isAlreadySelected && currentIds.length >= 3) {
      this.#snackBar.open('You can only select up to 3 Pokémons.', 'Close', {
        duration: this.#snackBarDuration * 1000,
      });
      return;
    }

    this.selectedPokemons.update((pokemons) => {
      if (isAlreadySelected) {
        return pokemons.filter((id) => id !== pokemon);
      } else {
        return [...pokemons, pokemon];
      }
    });
  }

  startBattle() {
    this.battleStarted.emit({
      playerName: this.playerName,
      pokemons: this.selectedPokemons(),
    });
    this.loadPokemonBattleControllers().then(() => {
      console.log('Battle Controls loaded');
      this.ready.set(true);
    });
  }

  async loadPokemonBattleControllers(): Promise<void> {
    try {
      const m = await loadRemoteModule({
        remoteEntry: 'http://localhost:4202/remoteEntry.json',
        exposedModule: './BattleControls',
      });

      const playerRef = this.placePlayerBattleControls.createComponent(m.BattleControlsComponent, {
        injector: this.#injector,
      });
      playerRef.setInput('playerName', this.playerName);
      playerRef.setInput('playerPokemons', this.selectedPokemons());
    } catch (error) {
      console.error('Failed loading the Player 1', error);
    }
  }
}
