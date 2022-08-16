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
	const NUMBER_MAX_POKEMONS_API = 929;

	const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
	const [pokemonSearch, setPokemonSearch] = useState('');
	const [pokemonDetail, setPokemonDetail] = useState(
		sessionStorage.getItem('pokemon') || 'bulbasaur'
	);
	const [pokemonsOffsetApi, setPokemonsOffsetApi] = useState(NUMBER_POKEMONS);
	const [openMenu, setOpenMenu] = useState(
		window.innerWidth > 1024 ? true : false
	);

	const handleSearchPokemons = useCallback(async () => {
		const response = await api.get(`/pokemon?limit=${NUMBER_MAX_POKEMONS_API}`);

		setPokemonSearch(pokemonSearch.toLocaleLowerCase());
		const pokemonsSearch = response.data.results.filter(
			({ name }: PokemonProps) => name.includes(pokemonSearch),
		);
		setPokemons(pokemonsSearch)
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
		<main className="w-full relative flex flex-row items-stretch">
			<aside className={`
				w-full sm:max-w-[350px] max-w-[300px] fixed left-0 top-0 z-30 h-screen transition-all duration-500 overflow-y-scroll scrollbar pb-5 bg-white shadow-lg divide-y-2 
				${openMenu ? "ml-0" : "-ml-[350px]"}
			`}>
				<Search
					value={pokemonSearch}
					onChange={setPokemonSearch}
				/>
				{pokemons.map(pokemon => (
					<Card
						key={pokemon.name}
						name={pokemon.name}
						showDetail={handlePokemonDetail}
						switchMenu={setOpenMenu}
						stateMenu={openMenu}
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

			<div
				className={`lg:hidden w-screen h-screen fixed z-20 inset-0 bg-white bg-opacity-50 ${openMenu ? 'visible' : 'invisible'}`}
				onClick={() => setOpenMenu(!openMenu)}
			/>

			<section className={`
				flex flex-col items-center transition-all duration-500 ml-auto h-screen
				${openMenu ? "lg:w-[calc(100%-350px)] lg:overflow-auto overflow-hidden" : "w-full overflow-auto"}
			`}>
				<Pokemon
					name={pokemonDetail}
					showDetail={handlePokemonDetail}
					switchMenu={setOpenMenu}
					stateMenu={openMenu}
				/>
			</section>
		</main>
	)
}

export default App
