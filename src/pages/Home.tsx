import { useCallback, useEffect, useState } from "react";

import api from "../services/api";

import { Card } from "../components/Card";
import { Search } from "../components/Search";
import { Pokemon } from "../components/Pokemon";
import { GenerationsProps, PokemonByTypeProps, PokemonProps } from "../interfaces/interfaces";
import { TypeIcon } from "../components/Pokemon/Weaknesses/TypeIcon";
import { typeDataKeys } from "../util/typesEffectiveness";
import { X } from "phosphor-react";

export function Home() {
    const NUMBER_POKEMONS = 25;
    const NUMBER_MAX_POKEMONS_API = 929;

    const [pokemon, setPokemon] = useState({} as PokemonProps);
    const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
    const [pokemonSearch, setPokemonSearch] = useState('');
    const [pokemonDetail, setPokemonDetail] = useState(
        sessionStorage.getItem('pokemon') || 'bulbasaur'
    );
    const [pokemonsOffsetApi, setPokemonsOffsetApi] = useState(NUMBER_POKEMONS);
    const [openMenu, setOpenMenu] = useState(
        window.innerWidth > 1024 ? true : false
    );
    const [options, setOptions] = useState(false);
    const [filterType, setFilterType] = useState('' as typeDataKeys)
    const [pokemonByType, setPokemonByType] = useState<PokemonByTypeProps[]>([])
    const [generation, setGeneration] = useState({} as GenerationsProps);

    const handleSearchPokemons = useCallback(async () => {
        if (/\d/.test(pokemonSearch)) {
            const response = await api.get(`/pokemon/${pokemonSearch}`);
            setPokemon(response.data)
        } else {
            const response = await api.get(`/pokemon?limit=${NUMBER_MAX_POKEMONS_API}`);

            setPokemonSearch(pokemonSearch.toLocaleLowerCase());
            const pokemonsSearch = response.data.results.filter(
                ({ name }: PokemonProps) => name.includes(pokemonSearch),
            );
            setPokemons(pokemonsSearch)
        }
    }, [pokemonSearch]);

    const handlePokemonsListDefault = useCallback(async () => {
        const response = await api.get('/pokemon', {
            params: {
                limit: NUMBER_POKEMONS,
            },
        });
        setPokemons(response.data.results);
    }, []);

    const handlePokemonsListByType = useCallback(async () => {
        const response = await api.get(`/type/${filterType}`);
        setPokemonByType(response.data.pokemon)
    }, [filterType]);

    const handlePokemonsListByGeneration = useCallback(async () => {
        setPokemons([]);

        const limit = generation.limit
        const offset = generation.offset
        const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);

        setPokemons(response.data.results);
    }, [generation]);

    useEffect(() => {
        filterType ? handlePokemonsListByType() : handlePokemonsListDefault();
    }, [filterType]);

    useEffect(() => {
        pokemonSearch !== '' ? handleSearchPokemons() : handlePokemonsListDefault();
    }, [pokemonSearch]);

    useEffect(() => {
        Object.keys(generation).length !== 0 ? handlePokemonsListByGeneration() : handlePokemonsListDefault();
    }, [generation]);

    const handleMorePokemons = useCallback(
        async (offset: any) => {
            const response = await api.get(`/pokemon`, {
                params: {
                    limit: NUMBER_POKEMONS,
                    offset,
                },
            });

            setPokemons(state => [...state, ...response.data.results]);
            setPokemonsOffsetApi(state => state + NUMBER_POKEMONS);
        },
        [NUMBER_POKEMONS],
    );

    function handlePokemonDetail(name: string) {
        setPokemonDetail(name)
        sessionStorage.setItem('pokemon', name);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <main className="w-full relative flex flex-row items-stretch">
            <aside className={`
				w-full lg:max-w-[400px] sm:max-w-[350px] max-w-[320px] fixed left-0 top-0 z-30 h-screen transition-all duration-500 overflow-y-scroll scrollbar scrollbar-none pb-5 bg-zinc-50 dark:bg-zinc-800 shadow-lg divide-y-2 dark:divide-zinc-700 
				${openMenu ? "ml-0" : "lg:-ml-[400px] -ml-[350px]"}
			`}>
                <div className="sticky top-0 z-10 w-full">
                    <Search
                        value={pokemonSearch}
                        onChange={setPokemonSearch}
                        filtered={setFilterType}
                        filter={filterType}
                        currentGeneration={generation}
                        setGeneration={setGeneration}
                    />
                    {filterType &&
                        <div className="px-4 pb-4 pt-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-3 items-center">
                                <strong>Filtered by:</strong>
                                <TypeIcon rounded="full" padding="2" addClass="type-pokemon" type={filterType} />
                            </div>

                            <button
                                type="button"
                                onClick={() => setFilterType('' as typeDataKeys)}
                            >
                                <X
                                    size={20}
                                    weight="bold"
                                    className="transition-colors text-zinc-400 hover:text-zinc-200"
                                />
                            </button>
                        </div>
                    }
                    {Object.keys(generation).length !== 0 &&
                        <div className="px-4 pb-4 pt-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-3 items-center">
                                <strong>Filtered by:</strong>
                                <span>Generation {generation.text}</span>
                            </div>

                            <button
                                type="button"
                                onClick={() => setGeneration({} as GenerationsProps)}
                            >
                                <X
                                    size={20}
                                    weight="bold"
                                    className="transition-colors text-zinc-400 hover:text-zinc-200"
                                />
                            </button>
                        </div>
                    }
                </div>
                {/\d/.test(pokemonSearch) ? (
                    <>
                        <Card
                            key={pokemon.name}
                            name={pokemon.name}
                            showDetail={handlePokemonDetail}
                            switchMenu={setOpenMenu}
                            stateMenu={openMenu}
                        />
                    </>
                ) : filterType ? (
                    <>
                        {pokemonByType.map(pokemon => (
                            <Card
                                key={pokemon.pokemon.name}
                                name={pokemon.pokemon.name}
                                showDetail={handlePokemonDetail}
                                switchMenu={setOpenMenu}
                                stateMenu={openMenu}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        {pokemons.map(pokemon => (
                            <Card
                                key={pokemon.name}
                                name={pokemon.name}
                                showDetail={handlePokemonDetail}
                                switchMenu={setOpenMenu}
                                stateMenu={openMenu}
                            />
                        ))}
                    </>
                )}
                {!filterType && pokemonSearch === '' && Object.keys(generation).length === 0 && (
                    <div className="w-full py-5 px-4">
                        <button
                            type="button"
                            className="w-full bg-indigo-600 text-zinc-100 rounded max-w-[250px] h-9 font-sm font-medium capitalize block mx-auto hover:bg-indigo-700 hover:ring-2 hover:ring-offset-2 hover:ring-indigo-700 hover:ring-offset-zinc-50 dark:hover:ring-offset-zinc-800"
                            onClick={() => handleMorePokemons(pokemonsOffsetApi)}
                        >
                            Carregar mais
                        </button>
                    </div>
                )}
            </aside>

            <div
                className={`lg:hidden w-screen h-screen fixed z-20 inset-0 bg-white bg-opacity-50 ${openMenu ? 'visible' : 'invisible'}`}
                onClick={() => setOpenMenu(!openMenu)}
            />

            <section className={`
				flex flex-col items-center transition-all duration-500 ml-auto
				${openMenu ? "lg:w-[calc(100%-400px)] lg:overflow-auto overflow-hidden" : "w-full overflow-auto"}
			`}>
                <Pokemon
                    name={pokemonDetail}
                    showDetail={handlePokemonDetail}
                    switchMenu={setOpenMenu}
                    stateMenu={openMenu}
                    options={options}
                    setOptions={setOptions}
                />
            </section>
        </main>
    );
}