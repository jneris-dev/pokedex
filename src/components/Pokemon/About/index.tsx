interface Props {
    pokemon: {
        specie: string;
        height: string;
        weight: string;
    };
}

export function About({ pokemon }: Props) {
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
                    {pokemon.height}
                </span>
            </li>
            <li className="w-full flex flex-row gap-3">
                <strong className="text-zinc-500">
                    Weight:
                </strong>
                <span className="font-medium">
                    {pokemon.weight}
                </span>
            </li>
        </ul>
    );
}