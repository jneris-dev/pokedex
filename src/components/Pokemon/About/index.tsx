interface Props {
    pokemon: {
        specie: string;
        height: number;
        weight: number;
    };
}

export function About({ pokemon }: Props) {
    const heightInFeetInches = Math.floor(pokemon.height * 3.2808) + '"' + Math.round(((pokemon.height * 3.2808) % 1) * 12) + '\'';
    const widthInPounds = (pokemon.weight * 2.205).toFixed(1);

    return (
        <ul className="w-full p-3 flex flex-col gap-3">
            <li className="w-full flex flex-row gap-3">
                <strong className="text-zinc-500">
                    Species:
                </strong>
                <span className="capitalize font-medium">
                    {pokemon.specie}
                </span>
            </li>
            <li className="w-full flex flex-row gap-3">
                <strong className="text-zinc-500">
                    Height:
                </strong>
                <span className="font-medium">
                    {pokemon.height}m ( {heightInFeetInches} )
                </span>
            </li>
            <li className="w-full flex flex-row gap-3">
                <strong className="text-zinc-500">
                    Weight:
                </strong>
                <span className="font-medium">
                    {pokemon.weight}kg ( {widthInPounds}lbs. )
                </span>
            </li>
        </ul>
    );
}