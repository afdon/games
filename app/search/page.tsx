import getGamesByTitle from "@/actions/getGamesByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

interface SearchProps {
    searchParams: {
        title: string;
    }
};

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
    const games = await getGamesByTitle(searchParams.title);

    return (
        <div
            className="
                bg-neutral-900
                rounded-lg
                h-[100vh]
                w-full
                overflow-hidden
                overflow-y-auto
            "
        >
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Search
                    </h1>
                    <SearchInput />
                </div>
            </Header>
            <SearchContent games={games} />
        </div>
    )
};

export default Search;