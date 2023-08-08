"use client";

import { Game } from '@/types';
import useOnPlay from '@/hooks/useOnPlay';
import GameItem from '@/components/SongItem';

interface PageContentProps {
    games: Game[];
}

const PageContent: React.FC<PageContentProps> = ({
    games
}) => {
    const onPlay = useOnPlay(games);

    

    if (songs.length === 0) {
        return (
            <div className='mt-4 text-neutral-400'>
                No games available.
            </div>
        )
    }

    return (
        <div
            className='
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-3
                lg:grid-cols-4  
                xl:grid-cols-5
                2xl:grid-cols-8
                gap-4
                mt-4
                '
        >
            {games.map((item) => (
                <GameItem
                    key={item.id}
                    onClick={(id: string) => onPlay(id)}
                    data={item}
                />
            ))}
        </div>
    );
}

export default PageContent;