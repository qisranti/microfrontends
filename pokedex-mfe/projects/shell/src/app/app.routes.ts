import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { BattleComponent } from './features/battle/battle.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { PlayersSelection } from './features/players-selection/players-selection';

/*
 * @TODO:
 * Add empty path (Done: now redirecting to pokemons list)
 * Add wildcard path for not defined paths (Wildcard created but not designed)
 * Catch errors if loading remote module fails (Error handling added)
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      loadRemoteModule('remote1', './Pokemons')
        .then((m) => m.PokemonsComponent)
        .catch((err) => {
          console.error('Error loading pokemons', err);
          return null;
        }),
  },
  {
    path: 'remote1',
    loadComponent: () =>
      loadRemoteModule('remote1', './Component')
        .then((m) => m.App)
        .catch((err) => {
          console.error('Error loading remote1', err);
          return null;
        }),
  },
  {
    path: 'remote2',
    loadComponent: () =>
      loadRemoteModule('remote2', './Component')
        .then((m) => m.App)
        .catch((err) => {
          console.error('Error loading remote2', err);
          return null;
        }),
  },
  {
    path: 'pokemons',
    loadComponent: () =>
      loadRemoteModule('remote1', './Pokemons')
        .then((m) => m.PokemonsComponent)
        .catch((err) => {
          console.error('Error loading pokemons', err);
          return null;
        }),
  },
  {
    path: 'pokedex/:pokemonId',
    loadComponent: () =>
      loadRemoteModule('remote2', './Pokedex')
        .then((m) => m.PokedexComponent)
        .catch((err) => {
          console.error('Error loading pokedex', err);
          return null;
        }),
  },
  {
    path: 'pokemons-selection',
    loadComponent: () =>
      loadRemoteModule('remote1', './PokemonsSelection')
        .then((m) => m.PokemonSelectionComponent)
        .catch((err) => {
          console.error('Error loading pokemons selection', err);
          return null;
        }),
  },
  {
    path: 'players-selection',
    component: PlayersSelection,
  },
  {
    path: 'battle',
    component: BattleComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
