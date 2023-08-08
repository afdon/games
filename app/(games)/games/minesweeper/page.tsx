// import getGames from "@/actions/getGames";
import Header from "@/components/Header";
import Minesweeper from "@/games/minesweeper/Minesweeper";

export const revalidate = 0;

export default async function Home() {
  // const songs = await getGames();

  const game = "Minesweeper"

  return (
    <div className='
    bg-black
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto
    p-4
    '>
      <Header>
        <div className="mb-2 mt-4 p-2">
          <h1 className="
          text-white
          text-3xl
          font-semibold
          mt-[-60px]
          ">
            {game}
          </h1>
          <div
            className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
          gap-3
          mt-4
          "
          >
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            {/* Minesweeper */}
          </h1>
        </div>
        <div>
          <Minesweeper />
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}
