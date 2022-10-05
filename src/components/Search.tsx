import { FormEvent, useCallback, useState } from "react";
import { FunnelSimple, MagnifyingGlass, X } from "phosphor-react";

interface SearchProps {
    value: string;
    onChange(value: string): void;
}

export function Search({ value, onChange }: SearchProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState('');

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
    };

    function handleReset() {
        setSearch('')
        onChange('')
    }

    return (
        <form className="w-full px-3 sticky top-0 bg-zinc-200 z-10 py-5 flex flex-row gap-3" onSubmit={handleSubmit}>
            <button className="w-auto h-11 flex items-center justify-center cursor-not-allowed">
                <FunnelSimple size={26} weight="bold" className="text-zinc-600" />
            </button>
            <label className="flex-1 h-auto relative">
                <input
                    type="text"
                    autoComplete="false"
                    value={search}
                    className="w-full bg-zinc-100 h-11 rounded text-zinc-700 pl-3 pr-9 focus:outline-zinc-400"
                    placeholder={isFocused ? '' : 'Search Pokemon'}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                />
                <X
                    size={16}
                    weight="bold"
                    className={`absolute right-3 top-[calc(50%-8px)] z-10 cursor-pointer transition-all text-zinc-700 ${search.length <= 0 && 'invisible opacity-0'}`}
                    onClick={handleReset}
                />
            </label>
            <button
                className="w-11 h-11 flex items-center justify-center bg-red-600 text-zinc-100 rounded hover:bg-red-700 transition-colors"
                type="submit"
            >
                <MagnifyingGlass size={20} weight="bold" />
            </button>
        </form>
    );
}