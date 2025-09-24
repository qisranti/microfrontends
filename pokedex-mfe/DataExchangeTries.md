# Data Exchange Tries

Here we are going to see all the different ways that I tried to communicate components from other remotes.

## Pokelib State-Service (Failed)

I tried to use a shared service with the next content:

```ts
@Injectable({
  providedIn: 'root',
})
export class PokedexStateService {
  // #pokemonId = new BehaviorSubject<number>(1);
  #pokemonId = signal<number>(1);

  get pokemonId() {
    // return this.#pokemonId.asObservable();
    return this.#pokemonId.asReadonly();
  }

  setPokemonId(id: number): void {
    // this.#pokemonId.next(id);
    this.#pokemonId.set(id);
  }
}
```

I have configured the federation.config of each project with the next shared section:

* Shell
```ts
shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    '@angular/core/rxjs-interop': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@angular/material': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/cdk': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    pokelib: { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  },
```
* Remote 1
```ts
shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    pokelib: { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  },
```
* Remote 2
```ts
shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    pokelib: { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  },
```

This is the way I'm using it to set the value in pokemons.component.ts
```ts
  selectPokemon(pokemonUrl: string) {
    const pokemonId = this.#pokemonIdPipe.transform(pokemonUrl);
    this.#selectedPokemonId.set(Number(pokemonId));
    this.#pokedexState.setPokemonId(pokemonId);
    console.log('Selected ID in Pokemons List Component:', this.#selectedPokemonId());
  }
```
Also the way I'm rendering the remote component pokedex it's the next:
```ts
async loadPokemonDetails(): Promise<void> {
    try {
      const m = await loadRemoteModule({
        remoteEntry: 'http://localhost:4202/remoteEntry.json',
        exposedModule: './Pokedex',
      });

      const componentRef = this.placePokemonDetails.createComponent(m.PokedexComponent, {
        injector: this.#injector,
      });
      runInInjectionContext(this.#injector, () => {
        effect(() => {
          const currentId = this.#pokedexState.pokemonId();
          componentRef.setInput('pokemonId', currentId);
        });
      });
    } catch (error) {
      console.error('Failed loading the Pokemon Details:', error);
    }
  }
```
this it's being logged without any issues and it seems to be working but when I go to the child component and try to get the information from the service it retrieves only the default value and not the realtime changes, this is how I'm getting the info from the service:
```ts
  readonly pokemonId = computed(() => this.#pokedexState.pokemonId());
  ngOnInit(): void {
    const currentId = this.#pokedexState.pokemonId();
    console.log('Current Pokemon ID:', currentId);
  }
```

## Router Outlet

First thing to do it's to add the configuration in app.routes.ts:
```ts
  {
    path: 'pokedex',
    loadComponent: () =>
      loadRemoteModule('remote2', './Pokedex')
        .then((m) => m.PokedexComponent)
        .catch((err) => {
          console.error('Error loading pokedex', err);
          return null;
        }),
  },
```


