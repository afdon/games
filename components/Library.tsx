'use client';

// import { IoLogoGameControllerB } from 'react-icons/io';
// import { TbPlaylist } from 'react-icons/tb';
// import { RiGameFill } from 'react-icons/ri';
import { MdOutlineGames } from 'react-icons/md';

import { AiOutlinePlus } from 'react-icons/ai';

import useAuthModal from '@/hooks/UseAuthModal';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';
import { Game, Song } from '@/types';
import useOnPlay from '@/hooks/useOnPlay';
import useOnGamePlay from '@/hooks/useOnGamePlay';
import useSubscribeModal from '@/hooks/useSubscribeModal';

import MediaItem from './MediaItem';

interface LibraryProps {
    games: Game[];
}

const Library: React.FC<LibraryProps> = ({
    games
}) => {
    const subscribeModal = useSubscribeModal();
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user, subscription } = useUser();

    const onGamePlay = useOnGamePlay(games);

    const onClick = () => {
        if (!user) {
            return authModal.onOpen();
        }

        // if (!subscription) {
        //     return subscribeModal.onOpen();
        // }

        // return uploadModal.onOpen();
        return uploadModal.onOpen();
    };

    return (
        <div className="flex flex-col">
            <div className="
            flex
            items-center
            justify-between
            px-5
            pt-4
            ">
                <div className="
                inline-flex
                items-center
                gap-x-2
                ">
                    <MdOutlineGames className="text-neutral-400" size={26} />
                    <p className='
                    text-neutral-400
                    font-medium
                    text-md
                    '>
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus
                onClick={onClick}
                size={20}
                className='
                text-neutral-400
                cursor-pointer
                hover:text-white
                transition
                '
                />
            </div>
            <div
            className='
            flex
            flex-col
            gap-y-2
            mt-4
            px-3
            '>
                {games.map((item) => (
                    <MediaItem
                    onClick={(id: string) => onGamePlay(id)}
                    key={item.id}
                    data={item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Library;