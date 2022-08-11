import { SVGProps, useEffect, useState } from "react";

import iconTypePokemon from '../Types';
import api from "../../services/api";

import Pokeball from "../Pokeball";
import { About } from "./About";
import { Training } from "./Training";
import { Weaknesses } from "./Weaknesses";
import { Stats } from "./Stats";
import { Forms } from "./Forms";
import { Evolves } from "./Evolves";

interface PokemonDetailProps {
    name: string;
    showDetail: (value: string) => void;
}

export interface PokemonTypesProps {
    name?: string;
    effect: number;
    icon: SVGProps<SVGSVGElement>;
    color: {
        background: string,
        type: string
    };
}

export interface PokemonProps {
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

interface TypePokemonResponse {
    type: {
        name: keyof typeof iconTypePokemon;
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

export function Pokemon({ name, showDetail }: PokemonDetailProps) {

    const [pokemon, setPokemon] = useState({} as PokemonProps);
    const [backgroundColor, setBackgroundColor] = useState<
        keyof typeof iconTypePokemon
    >('normal');

    useEffect(() => {
        api.get(`/pokemon/${name}`).then(response => {
            const {
                id,
                weight,
                height,
                stats,
                sprites,
                types,
                species,
            } = response.data;

            setBackgroundColor(types[0].type.name);

            if (types[0].type.name === 'normal' && types.length > 1) {
                setBackgroundColor(types[1].type.name);
            }

            const faviconUpdate = async () => {
                const favicon = document.getElementById("favicon") as HTMLLinkElement | null;
                if (favicon != null) {
                    favicon.href = sprites.versions["generation-vii"].icons.front_default
                }
            };
            faviconUpdate();

            setPokemon({
                id,
                number: `#${'000'.substr(id.toString().length)}${id}`,
                image:
                    sprites.other['official-artwork'].front_default ||
                    sprites.front_default,
                weight: `${weight / 10} kg`,
                specie: species.name,
                height: `${height / 10} m`,
                stats: {
                    hp: stats[0].base_stat,
                    attack: stats[1].base_stat,
                    defense: stats[2].base_stat,
                    specialAttack: stats[3].base_stat,
                    specialDefense: stats[4].base_stat,
                    speed: stats[5].base_stat,
                },
                type: types.map((pokemonType: TypePokemonResponse) => ({
                    name: pokemonType.type.name,
                    icon: iconTypePokemon[pokemonType.type.name],
                    color: PokemonTypeMap[pokemonType.type.name],
                })),
            });
        });
    }, [name]);

    return (
        <div className="w-full h-auto relative py-5 px-6">
            <header className="w-full text-center mb-10">
                <figure className="block mx-auto max-w-[375px] mb-2 relative figure-poke">
                    <img
                        src={pokemon.image}
                        alt={`Imagem do pokémon ${name}`}
                        className="w-full"
                    />
                    <Pokeball />
                </figure>
                <p className="text-2xl font-bold text-zinc-400 mb-2">
                    {pokemon.number}
                </p>
                <h1 className="text-4xl font-bold text-zinc-800 capitalize">
                    {name}
                </h1>
                {pokemon.type && (
                    <div className="flex flex-row items-center w-full justify-center mt-4 gap-2">
                        {pokemon.type.map(pokemonType => (
                            <div
                                className={`flex flex-row px-3 py-2 items-center rounded gap-2 text-zinc-100 type-pokemon capitalize ${pokemonType.color.type}`}
                                key={pokemonType.name}
                            >
                                <>
                                    {pokemonType.icon}
                                </>
                                <span className="drop-shadow">
                                    {pokemonType.name}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </header>
            <div className="w-full h-auto relative gap-5 flex flex-row max-w-[1220px] mx-auto">
                <div className="w-full flex flex-col gap-5">
                    <div className="bg-white rounded-md shadow-md p-3 border-t-4 border-t-zinc-600">
                        <About pokemon={pokemon} />
                    </div>
                    <div className="bg-white rounded-md shadow-md p-3 border-t-4 border-t-zinc-600">
                        <Training pokemon={pokemon} />
                    </div>
                    <div className="bg-white rounded-md shadow-md p-3 border-t-4 border-t-zinc-600">
                        <Forms pokemon={pokemon} name={name} showDetail={showDetail} />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-8">
                    <div className="bg-white rounded-md shadow-md p-3 border-t-4 border-t-zinc-600">
                        <Weaknesses pokemon={pokemon} />
                    </div>
                    <div className="bg-white rounded-md shadow-md p-3 border-t-4 border-t-zinc-600">
                        <Evolves name={name} showDetail={showDetail} pokemon={pokemon} />
                    </div>
                    <div className="bg-white rounded-md shadow-md p-3 border-t-4 border-t-zinc-600">
                        <Stats pokemon={pokemon} />
                    </div>
                </div>
            </div>
        </div>
    );
}