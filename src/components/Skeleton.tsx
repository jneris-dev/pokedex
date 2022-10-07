import Pokeball from "./Pokeball";

function SkeletonCard() {
    return (
        <div className="poke-card w-full mx-auto flex items-center p-4 relative gap-4 flex-row hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:cursor-pointer group animate-pulse">
            <figure className="min-w-[82px] figure-poke-card">
                <Pokeball />
            </figure>
            <div className="flex flex-col items-stretch justify-center relative">
                <div className="h-4 bg-zinc-200 rounded-full dark:bg-zinc-600 w-10 mb-2"></div>
                <div className="h-5 bg-zinc-300 rounded-full dark:bg-zinc-600 w-36"></div>
                <div className="flex flex-row items-center mt-3 gap-2">
                    <div className="w-7 h-7 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                    <div className="w-7 h-7 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                </div>
            </div>
        </div>
    );
}

function SkeletonPokemon() {
    return (
        <div className="w-full h-auto relative py-5 px-6 animate-pulse">
            <header className="w-full text-center mb-10 relative pt-3">
                <div className="block mx-auto w-[375px] h-[375px] mb-5 relative figure-poke-full pt-5">
                    <Pokeball />
                </div>
                <div className="h-8 bg-zinc-300 rounded-full dark:bg-zinc-600 w-16 mb-3 mx-auto block"></div>
                <div className="flex flex-row items-center w-full justify-center mb-3 gap-2">
                    <div className="rounded w-20 h-10 bg-zinc-400 dark:bg-zinc-600"></div>
                    <div className="rounded w-20 h-10 bg-zinc-400 dark:bg-zinc-600"></div>
                </div>
                <div className="h-10 bg-zinc-400 rounded-full dark:bg-zinc-600 w-60 mb-2 mx-auto block"></div>
                <div className="h-8 bg-zinc-400 rounded-full dark:bg-zinc-600 w-44 mx-auto block"></div>
            </header>
            <div className="w-full h-auto relative gap-5 flex md:flex-row flex-col max-w-[1024px] mx-auto">
                <div className="w-full flex flex-col gap-5">
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-md p-3 border-t-4 h-52 border-zinc-300 dark:border-zinc-700">
                        <div className="w-full p-3 border-b border-b-zinc-200 dark:border-b-zinc-700">
                            <div className="w-40 h-7 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                        </div>
                        <div className="p-3 flex flex-col gap-4">
                            <div className="w-2/3 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                            <div className="w-2/4 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                            <div className="w-3/4 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                        </div>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-md p-3 border-t-4 h-52 border-zinc-300 dark:border-zinc-700">
                        <div className="w-full p-3 border-b border-b-zinc-200 dark:border-b-zinc-700">
                            <div className="w-40 h-7 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                        </div>
                        <div className="p-3 flex flex-col gap-4">
                            <div className="w-2/3 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                            <div className="w-2/4 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                            <div className="w-3/4 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                        </div>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-md p-3 border-t-4 h-52 border-zinc-300 dark:border-zinc-700">
                        <div className="w-full p-3 border-b border-b-zinc-200 dark:border-b-zinc-700">
                            <div className="w-40 h-7 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                        </div>
                        <div className="p-3 flex flex-col gap-4">
                            <div className="w-2/3 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                            <div className="w-2/4 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                            <div className="w-3/4 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-md p-3 border-t-4 h-52 border-zinc-300 dark:border-zinc-700">
                        <div className="w-full p-3 border-b border-b-zinc-200 dark:border-b-zinc-700">
                            <div className="w-40 h-7 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                        </div>
                        <div className="p-3 flex flex-col gap-4">
                            <div className="w-2/3 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                            <div className="w-2/4 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                            <div className="w-3/4 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                        </div>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-md p-3 border-t-4 h-52 border-zinc-300 dark:border-zinc-700">
                        <div className="w-full p-3 border-b border-b-zinc-200 dark:border-b-zinc-700">
                            <div className="w-40 h-7 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                        </div>
                        <div className="p-3 flex flex-col gap-4">
                            <div className="w-2/3 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                            <div className="w-2/4 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                            <div className="w-3/4 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                        </div>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-md shadow-md p-3 border-t-4 h-52 border-zinc-300 dark:border-zinc-700">
                        <div className="w-full p-3 border-b border-b-zinc-200 dark:border-b-zinc-700">
                            <div className="w-40 h-7 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                        </div>
                        <div className="p-3 flex flex-col gap-4">
                            <div className="w-2/3 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                            <div className="w-2/4 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                            <div className="w-3/4 h-5 bg-zinc-300 rounded-full dark:bg-zinc-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { SkeletonCard, SkeletonPokemon }