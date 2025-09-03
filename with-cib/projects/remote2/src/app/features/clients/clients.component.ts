import { Component, inject, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { PokemonService } from 'pokelib';

type Pokemon = {
  name: string;
  url: string;
};

@Component({
  selector: 'app-clients',
  imports: [MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  // @Input({required: true}) id!: number;
  pokeService = inject(PokemonService);
  pokemons: Pokemon[] = [];
  
  constructor() {
    this.loadPokemons();
  }

  ngOnInit() {}

  loadPokemons() {
    this.pokeService.getPokemonList(10, 0).subscribe((response) => {
      this.pokemons = response.results;
    });
  }
  getPokemonId(url: string): number {
    const segments = url.split('/').filter(segment => segment.length > 0);
    return Number(segments[segments.length - 1]);
  }
  getPokemonImage(pokemonId: number): string {
    return this.pokeService.getPokemonImage(pokemonId);
  }
}
