import React, { SVGProps, useEffect, useState } from "react";
import { getTypeWeaknesses } from 'poke-types'

import { PokemonTypeMap } from '../../../util/pokemonTypeMap';
import iconTypePokemon from '../../../util/Types';
import { PokemonTypesProps } from "../../../interfaces/interfaces";

interface Props {
    pokemon: {
        type: PokemonTypesProps[];
    }
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
    );
}