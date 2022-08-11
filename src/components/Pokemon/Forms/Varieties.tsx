import { SVGProps, useEffect, useState } from "react";
import api from "../../../services/api";
import Pokeball from "../../Pokeball";
import iconTypePokemon from '../../Types';

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

interface PokemonTypesProps {
    name: string;
    color: {
        background: string,
        type: string
    };
    icon: SVGProps<SVGSVGElement>;
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
                        className="block mx-auto relative figure-varieties-poke"
                    >
                        <img
                            src={pokemonVarieties.image}
                            className="w-full z-10 relative"
                        />
                        <Pokeball />
                    </figure>
                    <div className="text-center mt-3">
                        <p className="text-zinc-500 font-bold text-sm">
                            {pokemonVarieties.number}
                        </p>
                        <h4 className="font-bold capitalize">
                            {pokemon.name}
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