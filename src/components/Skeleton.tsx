import Pokeball from "./Pokeball";

function SkeletonCard() {
    return (
        <div className="poke-card w-full mx-auto flex items-center p-4 relative gap-4 flex-row hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:cursor-pointer group animate-pulse">
            <figure className="min-w-[82px] figure-poke-card">
                <Pokeball />
            </figure>
            <div className="flex flex-col items-stretch justify-center relative">
                <div className="h-4 bg-zinc-600 rounded-full dark:bg-zinc-600 w-10 mb-2"></div>
                <div className="h-5 bg-zinc-600 rounded-full dark:bg-zinc-600 w-36"></div>
                <div className="flex flex-row items-center mt-3 gap-2">
                    <div className="w-7 h-7 bg-zinc-600 rounded-full dark:bg-zinc-600" />
                    <div className="w-7 h-7 bg-zinc-600 rounded-full dark:bg-zinc-600" />
                </div>
            </div>
        </div>
    );
}

export { SkeletonCard }