import { SVGProps } from "react";
import iconTypePokemon from '../util/Types';

export interface PokemonTypesProps {
    name: string;
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
    shiny: string;
    shiny_f: string;
    specie: string;
    height: string;
    weight: string;
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