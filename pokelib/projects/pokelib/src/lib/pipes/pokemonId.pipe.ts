import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonId',
  standalone: true
})
// @TODO: Remove this decorator
// Injectable removed

export class PokemonIdPipe implements PipeTransform {

  // @TODO: Return a number (make sure to check the type)
  transform(url: string): number {
    const parts = url.split('/');
    return Number(parts[parts.length - 2]);
  }

}
