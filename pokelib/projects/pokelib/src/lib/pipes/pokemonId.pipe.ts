import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonId',
  standalone: true
})
export class PokemonIdPipe implements PipeTransform {

  transform(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

}
