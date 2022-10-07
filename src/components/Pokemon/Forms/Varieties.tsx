import { useEffect, useState } from "react";

import api from "../../../services/api";
import { PokemonTypeMap } from '../../../util/pokemonTypeMap';
import iconTypePokemon from '../../../util/Types';
import { PokemonTypesProps } from "../../../interfaces/interfaces";

import Pokeball from "../../Pokeball";

interface Props {
    pokemon: {
        name: string;
    }
    showDetail: (value: string) => void;
}

interface PokemonVarietiesProps {
    id: number;
    number: string;
    image: string;
    type: PokemonTypesProps[];
}

export function Varieties({ pokemon, showDetail }: Props) {
    const [pokemonVarieties, setPokemonVarieties] = useState({} as PokemonVarietiesProps);

    useEffect(() => {
        api.get(`/pokemon/${pokemon.name}`).then(response => {
            const {
                id,
                sprites,
                types
            } = response.data;

            setPokemonVarieties({
                id,
                number: `#${'000'.substr(id.toString().length)}${id}`,
                image:
                    sprites.other['official-artwork'].front_default ||
                    sprites.front_default,
                type: types.map((pokemonType: any) => {
                    const typeName = pokemonType.type.name as keyof typeof iconTypePokemon;
                    return {
                        name: typeName,
                        icon: iconTypePokemon[typeName],
                        color: PokemonTypeMap[typeName]
                    };
                }),
            });
        })
    }, [pokemon]);

    return (
        <>
            {pokemonVarieties.image &&
                <div>
                    <figure
                        className="block mx-auto relative figure-varieties-poke cursor-pointer"
                    >
                        <img
                            src={pokemonVarieties.image}
                            className="w-full z-10 relative"
                            onClick={() => showDetail(pokemon.name)}
                        />
                        <Pokeball />
                    </figure>
                    <div className="text-center mt-3">
                        <p className="text-zinc-500 font-bold text-sm">
                            {pokemonVarieties.number}
                        </p>
                        <h4 className="font-bold capitalize">
                            {pokemon.name.replace("-", " ")}
                        </h4>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-1 gap-2">
                        {pokemonVarieties.type.map(pokemonType => (
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
                </div>
            }
        </>
    );
}