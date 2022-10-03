import { useEffect, useState } from "react";
import { Sidebar } from "phosphor-react";

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
import { Type } from "./Type";

interface PokemonDetailProps {
    name: string;
    showDetail: (value: string) => void;
    switchMenu: (value: boolean) => void;
    stateMenu: boolean;
}

export function Pokemon({ name, showDetail, switchMenu, stateMenu }: PokemonDetailProps) {

    const [pokemon, setPokemon] = useState({} as PokemonProps);
    const [specieName, setSpecieName] = useState('')

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

            setPokemon({
                id,
                name: name,
                number: `#${'000'.substr(id.toString().length)}${id}`,
                image: sprites.other['official-artwork'].front_default || sprites.front_default,
                shiny: sprites.other.home.front_shiny,
                shiny_f: sprites.other.home.front_shiny_female,
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

    useEffect(() => {
        if (pokemon.id) {
            api.get(`/pokemon-species/${pokemon.id}`).then(response => {
                const { names } = response.data;
                setSpecieName(names[0].name)
            }).catch(error => {
                if (error.response && error.response.status === 404)
                    console.clear();
                setSpecieName('')
            });
        }
    }, [pokemon.id]);

    return (
        <div className="w-full h-auto relative py-5 px-6">
            <header className="w-full text-center mb-10 relative">
                <nav className={`w-full absolute top-0 left-0 flex flex-row justify-between items-center z-10 ${pokemon.type && pokemon.type[0].color.text}`}>
                    <Sidebar
                        size={30}
                        weight="bold"
                        className="cursor-pointer"
                        onClick={() => switchMenu(!stateMenu)}
                    />
                </nav>
                <figure className="block mx-auto max-w-[375px] mb-2 relative figure-poke pt-5">
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
                <h1 className="text-4xl font-bold text-zinc-800 capitalize mb-2">
                    {name.replace("-", " ")}
                </h1>
                <h2 className="text-2xl font-bold text-zinc-400">
                    {specieName}
                </h2>
            </header>
            <div className="w-full h-auto relative gap-5 flex md:flex-row flex-col max-w-[1024px] mx-auto">
                <div className="w-full flex flex-col gap-5 md:order-1 order-2">
                    <div className={`bg-white rounded-md shadow-md p-3 border-t-4 ${pokemon.type && pokemon.type[0].color.border}`}>
                        <div className="w-full p-3 border-b">
                            <h3 className={`text-lg font-bold ${pokemon.type && pokemon.type[0].color.text}`}>
                                Pokédex Data
                            </h3>
                        </div>
                        <About pokemon={pokemon} />
                    </div>
                    <div className={`bg-white rounded-md shadow-md p-3 border-t-4 ${pokemon.type && pokemon.type[0].color.border}`}>
                        <div className="w-full p-3 border-b">
                            <h3 className={`text-lg font-bold ${pokemon.type && pokemon.type[0].color.text}`}>
                                Training
                            </h3>
                        </div>
                        <Training pokemon={pokemon} />
                    </div>
                    <div className={`bg-white rounded-md shadow-md p-3 border-t-4 ${pokemon.type && pokemon.type[0].color.border}`}>
                        <div className="w-full p-3 border-b">
                            <h3 className={`text-lg font-bold ${pokemon.type && pokemon.type[0].color.text}`}>
                                Base Stats
                            </h3>
                        </div>
                        <Stats pokemon={pokemon} />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-5 md:order-2 order-1">
                    <div className={`bg-white rounded-md shadow-md p-3 border-t-4 ${pokemon.type && pokemon.type[0].color.border}`}>
                        <div className="w-full p-3 border-b">
                            <h3 className={`text-lg font-bold ${pokemon.type && pokemon.type[0].color.text}`}>
                                Type
                            </h3>
                        </div>
                        <Type pokemon={pokemon} />
                    </div>
                    <div className={`bg-white rounded-md shadow-md p-3 border-t-4 ${pokemon.type && pokemon.type[0].color.border}`}>
                        <div className="w-full p-3 border-b">
                            <h3 className={`text-lg font-bold ${pokemon.type && pokemon.type[0].color.text}`}>
                                Shiny
                            </h3>
                        </div>
                        <Shiny name={name} pokemon={pokemon} />
                    </div>
                    <div className={`bg-white rounded-md shadow-md p-3 border-t-4 ${pokemon.type && pokemon.type[0].color.border}`}>
                        <div className="w-full p-3 border-b">
                            <h3 className={`text-lg font-bold ${pokemon.type && pokemon.type[0].color.text}`}>
                                Evolution
                            </h3>
                        </div>
                        <Evolves name={name} showDetail={showDetail} pokemon={pokemon} />
                    </div>
                    <div className={`bg-white rounded-md shadow-md p-3 border-t-4 ${pokemon.type && pokemon.type[0].color.border}`}>
                        <div className="w-full p-3 border-b">
                            <h3 className={`text-lg font-bold ${pokemon.type && pokemon.type[0].color.text}`}>
                                Varieties
                            </h3>
                        </div>
                        <Forms pokemon={pokemon} name={name} showDetail={showDetail} />
                    </div>
                </div>
            </div>
        </div>
    );
}