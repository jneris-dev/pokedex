import { useEffect, useState } from "react";

import api from "../../services/api";
import { PokemonTypeMap } from '../../util/pokemonTypeMap';
import { PokemonProps, TypePokemonResponse } from "../../interfaces/interfaces";
import iconTypePokemon from '../../util/Types';

import Pokeball from "../Pokeball";
import { About } from "./About";
import { Training } from "./Training";
import { Stats } from "./Stats";
import { Forms } from "./Forms";
import { Evolves } from "./Evolves";
import { Shiny } from "./Shiny";
import { Weaknesses } from "./Weaknesses";
import { Nav } from "../Nav";
import { SkeletonPokemon } from "../Skeleton";

interface PokemonDetailProps {
    name: string;
    showDetail: (value: string) => void;
    switchMenu: (value: boolean) => void;
    stateMenu: boolean;
    options: boolean;
    setOptions: (value: boolean) => void;
}

export function Pokemon({ name, showDetail, switchMenu, stateMenu, options, setOptions }: PokemonDetailProps) {
    const [pokemon, setPokemon] = useState({} as PokemonProps);
    const [specieName, setSpecieName] = useState('');

    useEffect(() => {
        api.get(`/pokemon/${name}`).then(response => {
            const {
                id,
                weight,
                height,
                stats,
                base_experience,
                sprites,
                types,
                species,
            } = response.data;

            setPokemon({
                id,
                name: name,
                number: `#${'000'.substr(id.toString().length)}${id}`,
                image: sprites.other['official-artwork'].front_default || sprites.front_default,
                not_shiny: sprites.other.home.front_default,
                shiny: sprites.other.home.front_shiny || sprites.front_shiny,
                shiny_f: sprites.other.home.front_shiny_female,
                weight: weight / 10,
                specie: species.name,
                height: height / 10,
                baseExperience: base_experience,
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

    useEffect(() => {
        if (pokemon.id) {
            api.get(`/pokemon-species/${pokemon.specie}`).then(response => {
                const { names } = response.data;
                setSpecieName(names[0].name)
            }).catch(error => {
                if (error)
                    setSpecieName('')
            });
        }
    }, [pokemon.id]);

    return (
        <>
            {pokemon ?
                <div className="w-full h-auto relative py-5 px-6">
                    <header className="w-full text-center mb-10 relative">
                        <span className="absolute text-8xl w-full top-36 block text-center whitespace-nowrap text-zinc-400 dark:text-zinc-600 pointer-events-none">{specieName}</span>
                        <nav className={`w-full absolute top-0 left-0 flex flex-row justify-between items-center z-10 ${pokemon.type && pokemon.type[0].color.text}`}>
                            <Nav
                                pokemon={pokemon}
                                switchMenu={switchMenu}
                                stateMenu={stateMenu}
                                options={options}
                                setOptions={setOptions}
                            />
                        </nav>
                        <figure className="block mx-auto max-w-[375px] min-h-[375px] mb-2 relative figure-poke-full pt-5">
                            {pokemon.image &&
                                <img
                                    src={pokemon.image}
                                    alt={`Imagem do pokémon ${name}`}
                                    className="w-full"
                                />
                            }
                            <Pokeball />
                        </figure>
                        <p className="text-2xl font-bold text-zinc-400 dark:text-zinc-600 mb-3">
                            {pokemon.number}
                        </p>
                        {pokemon.type && (
                            <div className="flex flex-row items-center w-full justify-center mb-3 gap-2">
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
                        <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 capitalize mb-2">
                            {name.replace("-", " ")}
                        </h1>
                    </header>
                    <div className="w-full h-auto relative gap-5 flex md:flex-row flex-col max-w-[1024px] mx-auto">
                        <div className="w-full flex flex-col gap-5">
                            <div className={`bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-md p-3 border-t-4 ${pokemon.type && pokemon.type[0].color.border}`}>
                                <div className="w-full p-3 border-b border-b-zinc-200 dark:border-b-zinc-700">
                                    <h3 className="text-lg font-bold">
                                        Pokédex Data
                                    </h3>
                                </div>
                                <About pokemon={pokemon} />
                            </div>
                            <div className={`bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-md p-3 border-t-4 ${pokemon.type && pokemon.type[0].color.border}`}>
                                <div className="w-full p-3 border-b border-b-zinc-200 dark:border-b-zinc-700">
                                    <h3 className="text-lg font-bold">
                                        Training
                                    </h3>
                                </div>
                                <Training pokemon={pokemon} />
                            </div>
                            <div className={`bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-md p-3 border-t-4 ${pokemon.type && pokemon.type[0].color.border}`}>
                                <div className="w-full p-3 border-b border-b-zinc-200 dark:border-b-zinc-700">
                                    <h3 className="text-lg font-bold">
                                        Base Stats
                                    </h3>
                                </div>
                                <Stats pokemon={pokemon} />
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-5">
                            <div className={`bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-md p-3 border-t-4 ${pokemon.type && pokemon.type[0].color.border}`}>
                                <div className="w-full p-3 border-b border-b-zinc-200 dark:border-b-zinc-700">
                                    <h3 className="text-lg font-bold">
                                        Effectiveness Type
                                    </h3>
                                </div>
                                <Weaknesses pokemon={pokemon} />
                            </div>
                            <div className={`bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-md p-3 border-t-4 ${pokemon.type && pokemon.type[0].color.border}`}>
                                <div className="w-full p-3 border-b border-b-zinc-200 dark:border-b-zinc-700">
                                    <h3 className="text-lg font-bold">
                                        Shiny
                                    </h3>
                                </div>
                                <Shiny name={name} pokemon={pokemon} />
                            </div>
                            <div className={`bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-md p-3 border-t-4 ${pokemon.type && pokemon.type[0].color.border}`}>
                                <div className="w-full p-3 border-b border-b-zinc-200 dark:border-b-zinc-700">
                                    <h3 className="text-lg font-bold">
                                        Evolution
                                    </h3>
                                </div>
                                <Evolves name={name} showDetail={showDetail} pokemon={pokemon} />
                            </div>
                            <div className={`bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-md p-3 border-t-4 ${pokemon.type && pokemon.type[0].color.border}`}>
                                <div className="w-full p-3 border-b border-b-zinc-200 dark:border-b-zinc-700">
                                    <h3 className="text-lg font-bold">
                                        Varieties
                                    </h3>
                                </div>
                                <Forms pokemon={pokemon} name={name} showDetail={showDetail} />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <SkeletonPokemon />
            }
        </>
    );
}