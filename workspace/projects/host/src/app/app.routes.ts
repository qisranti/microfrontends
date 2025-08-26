import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { DataResolver } from './resolvers/data.resolver';

export const routes: Routes = [
  { path: '', loadComponent: () => loadRemoteModule('client1', './Component').then((m) => m.App) },
  { path: 'home', component: Home },
  {
    path: 'client1',
    loadComponent: () => loadRemoteModule('client1', './Component').then((m) => m.App),
  },
  {
    path: 'client1/:Message',
    resolve: { data: DataResolver },
    loadComponent: () => loadRemoteModule('client1', './Component').then((m) => m.App)
  },
  {
    path: 'client2',
    loadComponent: () => loadRemoteModule('client2', './Component').then((m) => m.App),
  },
  {
    path: '**',
    component: Home,
  },
];
