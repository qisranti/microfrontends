import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'clients/:id',
        loadComponent: () => 
            loadRemoteModule('remote2', './Clients').then(m => m.ClientsComponent),
    },
];
