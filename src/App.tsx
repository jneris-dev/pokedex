import { useCallback, useEffect, useState } from "react";

import api from "./services/api";

import { Card } from "./components/Card";
import { Search } from "./components/Search";
import { Pokemon } from "./components/Pokemon";
import { PokemonProps } from "./interfaces/interfaces";

function App() {
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

	useEffect(() => {
		pokemonSearch.length > 0 ? handleSearchPokemons() : handlePokemonsListDefault();
	}, [pokemonSearch]);

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
				w-full lg:max-w-[400px] sm:max-w-[350px] max-w-[320px] fixed left-0 top-0 z-30 h-screen transition-all duration-500 overflow-y-scroll scrollbar pb-5 bg-zinc-50 dark:bg-zinc-800 shadow-lg divide-y-2 dark:divide-zinc-700 
				${openMenu ? "ml-0" : "lg:-ml-[400px] -ml-[350px]"}
			`}>
				<Search
					value={pokemonSearch}
					onChange={setPokemonSearch}
				/>
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
				{pokemonSearch.length < 1 && (
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
	)
}

export default App
