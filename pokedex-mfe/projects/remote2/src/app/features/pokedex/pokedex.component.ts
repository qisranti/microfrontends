import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  effect,
  computed,
  input,
  runInInjectionContext,
  EnvironmentInjector,
  HostListener,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PokedexStateService, PokemonDetails, PokemonService } from 'pokelib';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  imports: [MatCardModule, MatDividerModule, CommonModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent{
  readonly #pokemonService = inject(PokemonService);
  readonly #pokedexState = inject(PokedexStateService);
  #injector = inject(EnvironmentInjector);

  readonly pokemonId = input<number | null>();

  // readonly pokemonId = computed(() => this.#pokedexState.pokemonId());

  // ngOnInit(): void {
  //   const currentId = this.#pokedexState.pokemonId();
  //   console.log('Current Pokemon ID:', currentId);
  // }

  constructor() {
    runInInjectionContext(this.#injector, () => {
      // This `effect` will automatically run whenever the pokemonId signal changes
      effect(() => {
        const id = this.#pokedexState.pokemonId();
        console.log('PokedexComponent - pokemonId changed:', id);
        // Your logic to load the new Pokémon data goes here
      });
    });
  }

  readonly pokemon = toSignal<PokemonDetails | null>(
    toObservable(this.pokemonId).pipe(
      switchMap((id) => {
        // pa validar si es numero
        if (typeof id === 'number' && !isNaN(id) && id > 0) {
          return this.#pokemonService.getPokemonDetails(id);
        }

        return of(null);
      })
    )
  );

  // Para el movimiento
  x = 20;
  y = 20;
  isDragging = false;
  #startX = 0;
  #startY = 0;

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.#startX = event.clientX - this.x;
    this.#startY = event.clientY - this.y;
    event.preventDefault();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.x = event.clientX - this.#startX;
    this.y = event.clientY - this.#startY;
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.isDragging = false;
  }
}

// readonly pokemon$ = this.pokemonId.pipe(
//   switchMap((id) => this.#pokemonService.getPokemonDetails(id)),
// );

// pokemon = toSignal(this.#pokemonService.getPokemonDetails(this.pokemonId));

// readonly pokemon = toSignal(
//   toObservable(this.#pokedexState.pokemonId).pipe(
//     switchMap((id) => {
//       return id ? this.#pokemonService.getPokemonDetails(id) : of(null);
//     })
//   )
// );

// #selectedId = this.#pokemonService.getSelectedPokemon();
// pokemonId = input<number>();
// injector = inject(EnvironmentInjector);

// pokemon = toSignal(this.#pokemonService.getPokemonDetails(this.#selectedId()));

// @TODO: Implemente PokeState with pokeId subject and update it from remote1
// readonly #pokeState = inject(PokeState);
// readonly #pokeId$ = this.#pokeState.getPokemonId$;
// readonly pokemon$ = this.pokeId$.pipe(
//   switchMap((pokeId) => this.#pokemonService.getPokemonDetails(id)),
// );
// ... (HTML)
// pokemon$ | async

// pokemon$ = computed(() => {
//   const currentId = this.pokemonId();
//   if (currentId) {
//     return this.#pokemonService.getPokemonDetails(currentId);
//   }
//   return null;
// });

//

// constructor() {
//   effect((): void => {
//     //console.log('Selected Pokémon changed:', this.#selectedId$());
//     runInInjectionContext(this.injector, () => {
//       const pokemon = toSignal(of(null), { injector: this.injector, initialValue: null });
//     });

//   //   console.log('Fetching new Pokémon details...');
//   });
// }
// }
