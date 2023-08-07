import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContent";

//don't cache this page
export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  const game = "Minesweeper"

  // throw new Error('Test!')

  return (
    <div className='
    bg-neutral-900
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
          ">
            {/* {game} */}
            {/* Latest Games */}
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
            {/* <ListItem
              image="/images/gamewave.png"
              name="Latest"
              href="latest"
            />
            <ListItem
              image="/images/liked.png"
              name="Liked"
              href="liked"
            /> */}
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            {/* Play the Game... */}
          </h1>
        </div>
        {/* <div>
          <PageContent songs={songs} />
        </div> */}
        <div>
          
        </div>
      </div>
    </div>
  );
}
