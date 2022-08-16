import React, { useEffect, useState } from "react";

import { PokemonTypeMap } from '../../../util/pokemonTypeMap';
import iconTypePokemon from '../../../util/Types';
import { PokemonTypesProps } from "../../../interfaces/interfaces";
import api from "../../../services/api";

interface Props {
    pokemon: {
        type: PokemonTypesProps[];
    }
}

export function Weaknesses({ pokemon }: Props) {
    const [weaknesses, setWeaknesses] = useState<PokemonTypesProps[]>([]);

    useEffect(() => {
        if (pokemon.type && pokemon.type.length) {
            api.get(`/type/${pokemon.type[0].name}`).then(response => {
                const {
                    damage_relations: { double_damage_from, half_damage_from },
                } = response.data;
                const auxWeaknesses = double_damage_from.map(
                    (typeDamage: { name: keyof typeof iconTypePokemon }) => ({
                        icon: iconTypePokemon[typeDamage.name],
                        color: PokemonTypeMap[typeDamage.name],
                        name: typeDamage.name,
                    }),
                );
                setWeaknesses(auxWeaknesses);
            });
        }
    }, [pokemon.type]);

    return (
        <div className="flex flex-row items-center mt-1 gap-2 p-3">
            {weaknesses &&
                weaknesses.map((weaknesses, index) => (
                    <React.Fragment key={index}>
                        <div
                            className={`flex flex-row p-4 items-center rounded gap-2 text-zinc-100 weaknesses-type-pokemon capitalize ${weaknesses.color.type}`}
                        >
                            <>
                                {weaknesses.icon}
                            </>
                        </div>
                    </React.Fragment>
                ))
            }
        </div>
    );
}