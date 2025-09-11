import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { BattleComponent } from './features/battle/battle.component';

/*
 * @TODO:
 * Add empty path
 * Add wildcard path for not defined paths
 * Catch errors if loading remote module fails
 */
export const routes: Routes = [
    {
        path: 'remote1',
        loadComponent: () => 
            loadRemoteModule('remote1', './Component').then(m => m.App),
    },
    {
        path: 'remote2',
        loadComponent: () =>
            loadRemoteModule('remote2', './Component').then(m => m.App),
    },
    {
        path: 'pokemons',
        loadComponent: () => 
            loadRemoteModule('remote1', './Pokemons').then(m => m.PokemonsComponent),
    },
    {
        path: 'battle',
        component: BattleComponent
    }
];
