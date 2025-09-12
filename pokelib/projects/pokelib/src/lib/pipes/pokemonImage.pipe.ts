import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonImage',
  standalone: true
})
// @TODO: Delete this decorator
// Injectable removed
export class PokemonImagePipe implements PipeTransform {

  transform(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

}
