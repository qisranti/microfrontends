export interface Pokemon{
    name: string;
    url: string;
}

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

interface Abilities{
    ability: {
        name: string;
        url: string;
    },
    is_hidden: boolean;
    slot: number;
}

export interface Moves{
    move: {
        name: string;
        url: string;
    },
    version_group_details: {
        level_learned_at: number;
        move_learn_method: {
            name: string;
            url: string;
        },
        version_group: {
            name: string;
            url: string;
        }
    }[]
}

export interface Stats{
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    }
}

export interface Types{
    slot: number;
    type: {
        name: string;
        url: string;
    }
}