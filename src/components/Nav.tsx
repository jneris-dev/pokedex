import { Sidebar } from "phosphor-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";
import { PokemonTypesProps } from "../interfaces/interfaces";

interface Props {
    pokemon: {
        type: PokemonTypesProps[];
    },
    stateMenu: boolean;
    switchMenu(value: boolean): void;
    options: boolean;
    setOptions(value: boolean): void;
}

export function Nav({ pokemon, switchMenu, stateMenu, options, setOptions }: Props) {
    const { theme, setTheme } = useTheme();
    const refDropdown = useRef<HTMLDivElement>(null);
    const refButton = useRef<HTMLButtonElement>(null);

    function handleToggleTheme() {
        setTheme(!theme)
    }

    function handleOptions() {
        setOptions(!options)
    }

    const handleClickOutside = (e: { target: any; }) => {
        if (!refDropdown.current?.contains(e.target)) {
            setOptions(false)
        } else {
            setOptions(!options)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)
    }, [])

    return (
        <nav className={`w-full absolute top-0 left-0 flex flex-row justify-between items-center z-10 ${pokemon.type && pokemon.type[0].color.text}`}>
            <Sidebar
                size={30}
                weight="bold"
                className="cursor-pointer"
                onClick={() => { switchMenu(!stateMenu), setOptions(false) }}
            />
            <div className="relative">
                <button
                    data-dropdown-toggle="dropdownAvatar"
                    type="button"
                    id="dropdownUserAvatarButton"
                    ref={refButton}
                    onClick={handleOptions}
                >
                    <figure className="sm:w-12 w-9 sm:h-12 h-9 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-zinc-100 ring-zinc-300 transition-all hover:ring-zinc-400 dark:ring-offset-zinc-900 dark:hover:ring-zinc-700 dark:ring-zinc-800">
                        <img src="https://avatars.githubusercontent.com/jneris-dev" className="max-w-full h-auto" alt="" />
                    </figure>
                </button>
                <div id="dropdownAvatar" ref={refDropdown} className={`absolute right-0 z-10 w-32 mt-2 bg-zinc-50 dark:bg-zinc-800 rounded divide-y divide-zinc-200 dark:divide-zinc-700 shadow ${!options && 'hidden'}`}>
                    <ul className="py-1 text-sm text-zinc-700 dark:text-zinc-100" aria-labelledby="dropdownUserAvatarButton">
                        <li>
                            <button className="block py-2 px-4 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full
                            pointer-events-none opacity-40">My Team</button>
                        </li>
                        <li>
                            <button onClick={handleToggleTheme} className="block py-2 px-4 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full">
                                {theme ? "Light" : "Dark"} Mode
                            </button>
                        </li>
                        <li>
                            <Link to={"/about"} className="block py-2 px-4 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full">About</Link>
                        </li>
                    </ul>
                    <div className="py-1">
                        <button className="block py-2 px-4 text-sm text-zinc-700 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full
                        pointer-events-none opacity-40">Sign out</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
