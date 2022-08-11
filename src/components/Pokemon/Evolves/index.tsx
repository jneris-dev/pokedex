import { SVGProps, useCallback, useEffect, useState } from "react";
import api from "../../../services/api";
import Pokeball from "../../Pokeball";
import iconTypePokemon from '../../Types';

interface Props {
    pokemon: {
        id: number;
    }
    name: string;
    showDetail: (value: string) => void;
}

interface PokemonEvolvesProps {
    name: string;
    level: number;
    image?: string;
    number?: string;
    type?: PokemonTypesProps[];
}

interface PokemonTypesProps {
    name: string;
    color: {
        background: string,
        type: string
    };
    icon: SVGProps<SVGSVGElement>;
}

interface EvolvesProps {
    species: {
        name: string;
    };
    evolution_details: [{ min_level: number }];
    evolves_to: EvolvesProps[];
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

export function Evolves({ pokemon, name, showDetail }: Props) {
    const [pokemonsFamily, setPokemonsFamily] = useState<PokemonEvolvesProps[]>([]);
    const [evolvesPokemon, setEvolvesPokemon] = useState<PokemonEvolvesProps[]>([]);

    const handleNameSpecies = useCallback(
        ({
            species,
            evolves_to,
            evolution_details,
        }: EvolvesProps): PokemonEvolvesProps[] => {
            let namesPokemons: PokemonEvolvesProps[] = [
                {
                    name: species.name,
                    level: 0,
                },
            ];
            if (evolution_details.length)
                namesPokemons[0].level = evolution_details[0].min_level;

            evolves_to.forEach((evolves: EvolvesProps) => {
                namesPokemons = namesPokemons.concat(handleNameSpecies(evolves));
            });

            return namesPokemons;
        },
        [],
    );

    useEffect(() => {
        api.get(`/pokemon-species/${name}`).then(responseSpecies => {
            const url = responseSpecies.data.evolution_chain.url.split('v2')[1];
            api.get(url).then(responseEvolution => {
                const species = handleNameSpecies(responseEvolution.data.chain);
                setPokemonsFamily(species)
            });
        }).catch(error => {
            if (error)
                setPokemonsFamily([])
        });
    }, [pokemon, handleNameSpecies]);

    useEffect(() => {
        if (pokemonsFamily.length > 1) {
            const urlsAxios = pokemonsFamily.map(p => api.get(`/pokemon/${p.name}`));

            Promise.all([...urlsAxios]).then(responses => {
                const result = responses.map((response, index) => {
                    const { id, sprites, types } = response.data;
                    return {
                        ...pokemonsFamily[index],
                        number: `#${'000'.substr(id.toString().length)}${id}`,
                        image: sprites.other['official-artwork'].front_default,
                        type: types.map((pokemonType: any) => {
                            const typeName = pokemonType.type.name as keyof typeof iconTypePokemon;
                            return {
                                name: typeName,
                                icon: iconTypePokemon[typeName],
                                color: PokemonTypeMap[typeName]
                            };
                        }),
                    };
                });
                setEvolvesPokemon(result);
            });
        } else {
            setEvolvesPokemon([]);
        }
    }, [pokemonsFamily]);


    return (
        <>
            <div className="w-full p-3 border-b">
                <h3 className="text-lg font-bold">
                    Evolution
                </h3>
            </div>
            {evolvesPokemon.length > 1 ? (
                <div className="grid grid-cols-3 gap-10 p-5">
                    {evolvesPokemon.slice(0, 6).map((evolves, index) => (
                        <div key={index}>
                            <div>
                                <figure
                                    className="block mx-auto relative figure-varieties-poke"
                                >
                                    <img
                                        src={evolves.image}
                                        alt={`Imagem do pokémon ${evolves.name}`}
                                        className="w-full z-10 relative"
                                    />
                                    <Pokeball />
                                </figure>
                                <div className="text-center mt-3">
                                    <p className="text-zinc-500 font-bold text-sm">
                                        {evolves.number}
                                    </p>
                                    <h4 className="font-bold capitalize">
                                        {evolves.name}
                                    </h4>
                                </div>
                                <div className="flex flex-row items-center justify-center mt-1 gap-2">
                                    {evolves.type &&
                                        <>
                                            {evolves.type.map(pokemonType => (
                                                <div
                                                    className={`flex flex-row p-2 items-center rounded-full type-pokemon capitalize ${pokemonType.color.type}`}
                                                    key={pokemonType.name}
                                                >
                                                    <>
                                                        {pokemonType.icon}
                                                    </>
                                                </div>
                                            ))}
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-3">
                    <p className="capitalize font-medium">
                        <strong>{name}</strong> currently has no evolutions.
                    </p>
                </div>
            )}
        </>
    );
}