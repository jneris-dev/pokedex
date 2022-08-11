import { useCallback, useState } from "react";

interface SearchProps {
    value: string;
    onChange(value: string): void;
}

export function Search({ value, onChange }: SearchProps) {
    const [isFocused, setIsFocused] = useState(false);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    return (
        <div className="w-full px-3 sticky top-0 bg-zinc-200 z-10 py-5">
            <input
                type="text"
                autoComplete="false"
                value={value}
                className="w-full bg-zinc-100 h-11 rounded text-zinc-700 px-3 focus:outline-zinc-400"
                placeholder={isFocused ? '' : 'Search Pokemon'}
                onChange={e => onChange(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            />
        </div>
    );
}