import { useCallback, useEffect, useState } from "react";

import api from "../../../services/api";
import { PokemonTypeMap } from '../../../util/pokemonTypeMap';
import iconTypePokemon from '../../../util/Types';
import { PokemonTypesProps } from "../../../interfaces/interfaces";

import Pokeball from "../../Pokeball";

interface Props {
    pokemon: {
        id: number;
        specie: string;
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

interface EvolvesProps {
    species: {
        name: string;
    };
    evolution_details: [{ min_level: number }];
    evolves_to: EvolvesProps[];
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
        if (pokemon.specie)
            api.get(`/pokemon-species/${pokemon.specie}`).then(responseSpecies => {
                const url = responseSpecies.data.evolution_chain.url.split('v2')[1];
                api.get(url).then(responseEvolution => {
                    const species = handleNameSpecies(responseEvolution.data.chain);
                    setPokemonsFamily(species)
                }).catch(error => {
                    if (error)
                        setPokemonsFamily([])
                });
            }).catch(error => {
                if (error)
                    setPokemonsFamily([])
            });
    }, [pokemon, handleNameSpecies]);

    useEffect(() => {
        if (pokemonsFamily.length > 1) {
            const urlsAxios = pokemonsFamily.map(p => api.get(`/pokemon/${p.name}`).catch(error => {
                if (error)
                    setPokemonsFamily([])
            }));

            Promise.all([...urlsAxios]).then(responses => {
                const result = responses.map((response, index) => {
                    const { id, sprites, types } = response?.data;
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
            {evolvesPokemon.length > 1 ? (
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-10 gap-5 p-5">
                    {evolvesPokemon.slice(0, 6).map((evolves, index) => (
                        <div key={index}>
                            <div>
                                <figure
                                    className="block mx-auto relative figure-varieties-poke cursor-pointer"
                                    onClick={() => showDetail(evolves.name)}
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