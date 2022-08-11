import { useCallback, useEffect, useState } from "react";

import api from "./services/api";

import { Card } from "./components/Card";
import { Search } from "./components/Search";
import { Pokemon } from "./components/Pokemon";

interface PokemonProps {
	id: string;
	name: string;
}

function App() {
	const NUMBER_POKEMONS = 25;
	const NUMBER_MAX_POKEMONS_API = 1154;

	const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
	const [pokemonSearch, setPokemonSearch] = useState('');
	const [pokemonDetail, setPokemonDetail] = useState(
		sessionStorage.getItem('pokemon') || 'bulbasaur'
	);
	const [pokemonsOffsetApi, setPokemonsOffsetApi] = useState(NUMBER_POKEMONS);

	const handleSearchPokemons = useCallback(async () => {
		const response = await api.get(`/pokemon?limit=${NUMBER_MAX_POKEMONS_API}`);

		setPokemonSearch(pokemonSearch.toLocaleLowerCase());
		const pokemonsSearch = response.data.results.filter(
			({ name }: PokemonProps) => name.includes(pokemonSearch),
		);
		setPokemons(pokemonsSearch);
	}, [pokemonSearch]);

	const handlePokemonsListDefault = useCallback(async () => {
		const response = await api.get('/pokemon', {
			params: {
				limit: NUMBER_POKEMONS,
			},
		});
		setPokemons(response.data.results);
	}, []);

	useEffect(() => {
		const isSearch = pokemonSearch.length >= 2;

		if (isSearch) handleSearchPokemons();
		else handlePokemonsListDefault();
	}, [pokemonSearch, handlePokemonsListDefault, handleSearchPokemons]);

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
	}

	return (
		<main className="w-full relative flex flex-row">
			<aside className="w-full max-w-[400px] fixed left-0 top-0 h-screen overflow-y-scroll scrollbar pb-5 bg-white shadow-lg divide-y-2 z-10">
				<Search
					value={pokemonSearch}
					onChange={setPokemonSearch}
				/>
				{pokemons.map(pokemon => (
					<Card
						key={pokemon.name}
						name={pokemon.name}
						showDetail={handlePokemonDetail}
					/>
				))}
				{pokemonSearch.length <= 2 && (
					<div className="w-full py-5 px-4">
						<button
							type="button"
							className="w-full bg-red-600 text-zinc-100 rounded max-w-[250px] h-9 font-sm font-medium capitalize block mx-auto hover:bg-red-700 hover:ring-2 hover:ring-offset-2 hover:ring-red-700"
							onClick={() => handleMorePokemons(pokemonsOffsetApi)}
						>
							Carregar mais
						</button>
					</div>
				)}
			</aside>

			<section className="h-screen flex flex-col items-center w-[calc(100%-440px)] ml-auto">
				<Pokemon
					name={pokemonDetail}
					showDetail={handlePokemonDetail}
				/>
			</section>
		</main>
	)
}

export default App
