export interface PokemonMoveApi {
  name: string;
  power: number | null;
  accuracy: number | null;
  pp: number;
  type: {
    name: string;
    url: string;
  };
  damage_class: {
    name: string;
    url: string;
  };
}
