import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonId',
  standalone: true
})
// @TODO: Remove this decorator
@Injectable({
  providedIn: 'root'
})
export class PokemonIdPipe implements PipeTransform {

  // @TODO: Return a number (make sure to check the type)
  transform(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

}
