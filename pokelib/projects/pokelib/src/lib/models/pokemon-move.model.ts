export interface PokemonMove {
  name: string;
  power: number | null;
  accuracy: number | null;
  pp: number;
  type: string;
  damageClass: string;
}