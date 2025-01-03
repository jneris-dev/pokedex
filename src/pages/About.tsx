import { CaretLeft, Heart } from "phosphor-react";
import { Link } from "react-router-dom";

export function About() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col gap-1 py-8 px-5">
            <div className="max-w-2xl w-full">
                <Link to={"/"} className="w-auto inline-flex">
                    <CaretLeft size={32} className="cursor-pointer hover:text-zinc-300" />
                </Link>
            </div>
            <div className="max-w-2xl w-full bg-zinc-50 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 min-h-[500px] rounded shadow-lg flex flex-col items-center justify-center sm:p-10 p-8">
                <img src="/pokedex-logo.png" className="max-w-full w-32 block mx-auto mb-3" alt="" />
                <h1 className="text-2xl font-bold mb-2 text-center">
                    About Project Pokedéx
                </h1>
                <strong className="block mb-5 text-zinc-500">
                    7.2.5
                </strong>
                <p className="text-center mb-8">
                    Web application for listing and viewing pokemons, developed with ReactJS. All data about pokémons such as name, number, type, image and among other things, were possible using the REST API <a href="https://pokeapi.co/" className="text-indigo-500 hover:text-indigo-600 transition-colors" target="_blank">PokéApi</a>.
                </p>
                <a href="https://github.com/jneris-dev/pokedex" target="_blank" rel="no-referrer" title="Pokedex GitHub - JNeris" className="outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-offset-zinc-800 focus:ring-zinc-900">
                    <button className="w-auto h-12 flex items-center gap-3 bg-zinc-900 rounded px-4 hover:bg-[#0C0C0E] transition-all ring-[#0C0C0E] hover:ring-offset-2 hover:ring-offset-zinc-50 dark:hover:ring-offset-zinc-800 hover:ring-2 outline-none">
                        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" className="fill-zinc-100 w-7 h-7">
                            <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                        <strong className="text-zinc-200">Visit GitHub</strong>
                    </button>
                </a>
                <p className="flex items-center gap-1 mt-6">
                    Pokedéx is made with <Heart size={15} weight="fill" className="text-red-500" /> by
                    <a
                        href="https://jneris.com.br/"
                        target="_blank"
                        rel="noopener"
                        title="JNeris | Developer Front-end - Designer UI"
                        className="text-indigo-500 hover:text-indigo-600 transition-colors"
                    >
                        JNeris
                    </a>
                </p>
            </div>
        </div>
    );
}