import React, { SVGProps, useEffect, useState } from "react";

import { getTypeWeaknesses } from 'poke-types'

import api from "../../../services/api";
import iconTypePokemon from '../../Types';

interface PokemonTypesProps {
    name: string;
    effect?: number;
    icon: SVGProps<SVGSVGElement>;
    color: {
        background: string,
        type: string
    };
}

interface Props {
    pokemon: {
        id: number;
        number: string;
        image: string;
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
}

const PokemonTypeMap = {
    bug: {
        background: 'bg-backgroundType-bug',
        type: 'bg-types-bug'
    },
    dark: {
        background: 'bg-backgroundType-dark',
        type: 'bg-types-dark'
    },
    dragon: {
        background: 'bg-backgroundType-dragon',
        type: 'bg-types-dragon'
    },
    electric: {
        background: 'bg-backgroundType-electric',
        type: 'bg-types-electric'
    },
    fairy: {
        background: 'bg-backgroundType-fairy',
        type: 'bg-types-fairy'
    },
    fighting: {
        background: 'bg-backgroundType-fighting',
        type: 'bg-types-fighting'
    },
    fire: {
        background: 'bg-backgroundType-fire',
        type: 'bg-types-fire'
    },
    flying: {
        background: 'bg-backgroundType-flying',
        type: 'bg-types-flying'
    },
    ghost: {
        background: 'bg-backgroundType-ghost',
        type: 'bg-types-ghost'
    },
    grass: {
        background: 'bg-backgroundType-grass',
        type: 'bg-types-grass'
    },
    ground: {
        background: 'bg-backgroundType-ground',
        type: 'bg-types-ground'
    },
    ice: {
        background: 'bg-backgroundType-ice',
        type: 'bg-types-ice'
    },
    normal: {
        background: 'bg-backgroundType-normal',
        type: 'bg-types-normal'
    },
    poison: {
        background: 'bg-backgroundType-poison',
        type: 'bg-types-poison'
    },
    psychic: {
        background: 'bg-backgroundType-psychic',
        type: 'bg-types-psychic'
    },
    rock: {
        background: 'bg-backgroundType-rock',
        type: 'bg-types-rock'
    },
    steel: {
        background: 'bg-backgroundType-steel',
        type: 'bg-types-steel'
    },
    water: {
        background: 'bg-backgroundType-water',
        type: 'bg-types-water'
    },
}

export function Weaknesses({ pokemon }: Props) {
    const [weaknesses, setWeaknesses] = useState<PokemonTypesProps[]>([]);

    useEffect(() => {
        if (pokemon.type && pokemon.type.length) {
            const arrWeak = Object.entries(getTypeWeaknesses(pokemon.type[0].name, pokemon.type[1]?.name))

            const auxWeaknesses = arrWeak.map(typeDamage => ({
                icon: iconTypePokemon[typeDamage[0]],
                color: PokemonTypeMap[typeDamage[0]],
                effect: typeDamage[1],
                name: typeDamage[0],
            }));
            setWeaknesses(auxWeaknesses)
        }

    }, [pokemon.type]);

    return (
        <>
            <div className="w-full p-3 border-b">
                <h3 className="text-lg font-bold">
                    Weaknesses
                </h3>
            </div>
            <div className="flex flex-row items-center mt-1 gap-2 p-3">
                {weaknesses &&
                    weaknesses.map((weaknesses, index) => (
                        <React.Fragment key={index}>
                            {weaknesses.effect > 1 &&
                                <div
                                    className={`flex flex-row p-4 items-center rounded gap-2 text-zinc-100 weaknesses-type-pokemon capitalize ${weaknesses.color.type}`}
                                >
                                    <>
                                        {weaknesses.icon}
                                    </>
                                </div>
                            }
                        </React.Fragment>
                    ))
                }
            </div>
        </>
    );
}