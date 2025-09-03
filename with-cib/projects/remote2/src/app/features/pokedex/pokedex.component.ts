import { Component, inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PokemonList, PokemonService } from 'pokelib';
import { Pokemon } from 'pokelib';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  imports: [MatCardModule, MatButtonModule, MatDividerModule, CommonModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
// todos los componentes deben ser OnPush (Averiguar)
export class PokedexComponent implements OnInit {
  // cambiarlo a signals
  @ViewChild('placePokemonDetails', { read: ViewContainerRef, static: true })
  placePokemonDetails!: ViewContainerRef;
  #pokeService = inject(PokemonService);

  limit = 120;
  offset = 0;

  pokemons$: Observable<Pokemon[]> = this.#pokeService
    .getPokemonList(this.limit, this.offset)
    .pipe(map((response) => response.results || []));

  ngOnInit() {
    // this.loadPokemons();
    this.loadPokemonDetails();
  }

  // la llamada no es necesaria en ngOnInit
  // loadPokemons() {
  //   // Suscripcion manual cambiarla o quitar la suscripcion, paginacion dinamica
  //   this.#pokeService.getPokemonList(120, 0).subscribe((response) => {
  //     this.pokemons = response.results;
  //   });
  // }

  getPokemonId(url: string): number {
    // Averiguar como angular agarra la Id de la URL
    const segments = url.split('/').filter((segment) => segment.length > 0);
    return Number(segments[segments.length - 1]);
  }

  getPokemonImage(pokemonId: number): string {
    return this.#pokeService.getPokemonImage(pokemonId);
  }

  async loadPokemonDetails(): Promise<void> {
    // Handle posible errors
    const m = await loadRemoteModule({
      remoteEntry: 'http://localhost:4201/remoteEntry.json',
      exposedModule: './PokemonDetails',
    });

    const ref = this.placePokemonDetails.createComponent(m.PokemonDetailsComponent);
    // const compInstance = ref.instance;
  }
}
