import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'remote1',
        loadComponent: () => 
            loadRemoteModule('remote1', './Component').then(m => m.App),
    },
    {
        path: 'products',
        loadComponent: () => 
            loadRemoteModule('remote1', './Products').then(m => m.ProductsComponent),
    },
    {
        path: 'clients',
        loadComponent: () => 
            loadRemoteModule('remote2', './Clients').then(m => m.ClientsComponent),
    },
    {
        path: 'remote2',
        loadComponent: () =>
            loadRemoteModule('remote2', './Component').then(m => m.App),
    },
    {
        path: 'remote2/:name',
        loadComponent: () =>
            loadRemoteModule('remote2', './Component').then(m => m.App),
    }
];