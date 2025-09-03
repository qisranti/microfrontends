import { Abilities } from "./abilities.model";
import { Moves } from "./moves.model";
import { Stats } from "./stats.model";
import { Types } from "./types.model";

export interface PokemonDetails{
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    abilities: Abilities[];
    moves: Moves[];
    stats: Stats[];
    types: Types[];
}
