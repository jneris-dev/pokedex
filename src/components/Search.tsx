import { FormEvent, useCallback, useState } from "react";
import { FunnelSimple, MagnifyingGlass, X } from "phosphor-react";
import { Filters } from "./Filters";
import { typeDataKeys } from "../util/typesEffectiveness";
import { GenerationsProps } from "../interfaces/interfaces";

interface SearchProps {
    value: string;
    onChange(value: string): void;
    filtered(value: any): void;
    filter: typeDataKeys;
    currentGeneration: GenerationsProps;
    setGeneration(generation: GenerationsProps): void;
}

export function Search({ value, onChange, filtered, filter, currentGeneration, setGeneration }: SearchProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState(false)

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (search.length < 1) {
            setSearch('')
            onChange('')
        };

        onChange(search);
        filtered('')
    };

    function handleReset() {
        setSearch('')
        onChange('')
    }

    function openFilters() {
        setFilters(!filters)
        filtered('')
        handleReset()
        setGeneration({
            text: "",
            offset: 0,
            limit: 0
        })
    }

    return (
        <>
            <div className="w-full px-3 bg-zinc-200 dark:bg-zinc-700 py-5 flex flex-row gap-3">
                <button className="w-auto h-11 flex items-center justify-center cursor-pointer" onClick={openFilters}>
                    <FunnelSimple size={26} weight="bold" className="text-zinc-600 dark:text-zinc-300" />
                </button>
                <form onSubmit={handleSubmit} className="flex flex-1 flex-row gap-3">
                    <label className="flex-1 h-auto relative">
                        <input
                            type="text"
                            autoComplete="false"
                            value={search}
                            className="w-full bg-zinc-100 dark:bg-zinc-600 h-11 rounded text-zinc-700 dark:text-zinc-300 pl-3 pr-9 focus:outline-zinc-400 dark:focus:outline-zinc-600"
                            placeholder={isFocused ? '' : 'Search Pokemon'}
                            onChange={(e) => setSearch(e.target.value)}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                        <X
                            size={16}
                            weight="bold"
                            className={`absolute right-3 top-[calc(50%-8px)] z-10 cursor-pointer transition-all text-zinc-700 dark:text-zinc-300 ${search.length <= 0 && 'invisible opacity-0'}`}
                            onClick={handleReset}
                        />
                    </label>
                    <button
                        className="w-11 h-11 flex items-center justify-center bg-indigo-600 text-zinc-100 rounded hover:bg-indigo-700 transition-colors"
                        type="submit"
                    >
                        <MagnifyingGlass size={20} weight="bold" />
                    </button>
                </form>
            </div>
            {filters &&
                <Filters
                    state={filters}
                    show={setFilters}
                    filtered={filtered}
                    filter={filter}
                    clearSearch={handleReset}
                    currentGeneration={currentGeneration}
                    setGeneration={setGeneration}
                />
            }
        </>
    );
}