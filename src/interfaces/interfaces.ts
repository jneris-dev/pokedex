import { SVGProps } from "react";
import iconTypePokemon from '../util/Types';
import { typeDataKeys } from "../util/typesEffectiveness";

export interface PokemonTypesProps {
    name: typeDataKeys;
    effect: number;
    icon: SVGProps<SVGSVGElement>;
    color: {
        background: string,
        type: string,
        text: string,
        border: string,
    };
}

export interface PokemonCardProps {
    id: number;
    image: string;
    gif: string;
    type: PokemonTypesProps[];
}


export interface PokemonProps {
    name: string;
    id: number;
    number: string;
    image: string;
    not_shiny: string;
    shiny: string;
    shiny_f: string;
    specie: string;
    height: number;
    weight: number;
    stats: {
        hp: number;
        attack: number;
        defense: number;
        speed: number;
        specialAttack: number;
        specialDefense: number;
    };
    type: PokemonTypesProps[];
}

export interface TypePokemonResponse {
    type: {
        name: keyof typeof iconTypePokemon;
    };
}

export interface PokemonByTypeProps {
    pokemon: {
        name: string;
        url: string;
    },
    slot: string;
}