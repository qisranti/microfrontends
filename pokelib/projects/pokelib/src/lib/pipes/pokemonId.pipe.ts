import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonId',
  standalone: true
})
@Injectable({
  providedIn: 'root'
})
export class PokemonIdPipe implements PipeTransform {

  transform(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

}
