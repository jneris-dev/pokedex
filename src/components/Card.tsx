import { useState, useEffect } from 'react';

import { PokemonCardProps } from '../interfaces/interfaces';
import api from '../services/api';
import { PokemonTypeMap } from '../util/pokemonTypeMap';
import iconTypePokemon from '../util/Types';

import Pokeball from './Pokeball';

interface CardProps {
    name: string;
    showDetail: (value: string) => void;
}

export function Card({ name, showDetail }: CardProps) {
    const [pokemon, setPokemon] = useState({} as PokemonCardProps);

    useEffect(() => {
        api.get(`/pokemon/${name}`).then(response => {
            const { id, types, sprites } = response.data;

            let typeColor = types[0].type.name as keyof typeof iconTypePokemon;

            if (typeColor === 'normal' && types.length > 1) {
                typeColor = types[1].type.name;
            }

            setPokemon({
                id,
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