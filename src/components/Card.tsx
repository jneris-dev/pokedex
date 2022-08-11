import { useState, useEffect, SVGProps } from 'react';

import api from '../services/api';
import Pokeball from './Pokeball';
import iconTypePokemon from './Types';

interface CardProps {
    name: string;
    showDetail: (value: string) => void;
}

interface PokemonTypesProps {
    name: string;
    color: {
        background: string,
        type: string
    };
    icon: SVGProps<SVGSVGElement>;
}

interface PokemonProps {
    id: string;
    image: string;
    gif: string;
    type: PokemonTypesProps[];
    backgroundColor: {
        background: string,
        type: string
    };
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

export function Card({ name, showDetail }: CardProps) {
    const [pokemon, setPokemon] = useState({} as PokemonProps);

    useEffect(() => {
        api.get(`/pokemon/${name}`).then(response => {
            const { id, types, sprites } = response.data;

            let typeColor = types[0].type.name as keyof typeof iconTypePokemon;

            if (typeColor === 'normal' && types.length > 1) {
                typeColor = types[1].type.name;
            }

            setPokemon({
                id,
                backgroundColor: PokemonTypeMap[typeColor],
                image: sprites.other['official-artwork'].front_default,
                gif: sprites.versions['generation-v']["black-white"].animated.front_default,
                type: types.map((pokemonType: any) => {
                    const typeName = pokemonType.type.name as keyof typeof iconTypePokemon;
                    return {
                        name: typeName,
                        icon: iconTypePokemon[typeName],
                        color: PokemonTypeMap[typeName]
                    };
                }),
            });
        });
    }, [name]);

    return (
        <div
            className={`poke-card w-full mx-auto flex items-center p-4 relative gap-4 flex-row hover:bg-zinc-100 hover:cursor-pointer`}
            onClick={() => showDetail(name)}
        >
            <figure className="min-w-[82px]">
                {pokemon.image ? (
                    <img
                        src={pokemon.gif || pokemon.image}
                        alt={`Imagem do pokémon ${name}`}
                        className="max-h-[50px] mx-auto block"
                    />
                ) : (
                    <Pokeball />
                )
                }
            </figure>
            <div className="flex flex-col items-stretch justify-center relative">
                <span className="text-md font-bold tracking-wide text-zinc-400">
                    #{pokemon.id}
                </span>
                <strong className="text-lg text-zinc-600 capitalize">
                    {name}
                </strong>
                {pokemon.type && (
                    <div className="flex flex-row items-center mt-1 gap-2">
                        {pokemon.type.map(pokemonType => (
                            <div
                                className={`flex flex-row p-2 items-center rounded-full type-pokemon capitalize ${pokemonType.color.type}`}
                                key={pokemonType.name}
                            >
                                <>
                                    {pokemonType.icon}
                                </>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}