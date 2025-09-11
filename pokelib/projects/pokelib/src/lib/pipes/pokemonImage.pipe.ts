import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonImage',
  standalone: true
})
// @TODO: Delete this decorator
@Injectable({
  providedIn: 'root'
})
export class PokemonImagePipe implements PipeTransform {

  transform(id: string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

}
