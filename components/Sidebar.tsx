'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { IoLogoGameControllerB } from 'react-icons/io';
import { MdOutlineGames } from 'react-icons/md';
import { RiGameFill } from 'react-icons/ri';

import { Song } from '@/types';
import usePlayer from '@/hooks/usePlayer';

import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';
import { twMerge } from 'tailwind-merge';
import GameLibrary from './GameLibrary';


interface SidebarProps {
    children: React.ReactNode;
    songs: Song[]
};

const Sidebar: React.FC<SidebarProps> = ({
    children,
    songs
}) => {
    const pathname = usePathname();
    const player = usePlayer();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: 
            pathname !== '/search' && 
            pathname !== '/game' &&
            pathname !== '/games' &&
            pathname !== '/leaderboard',
            href: '/',
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search'
        },
        {
            icon: MdOutlineGames,
            label: 'Game',
            active: pathname === '/game',
            href: '/game'
        },
        {
            icon: IoLogoGameControllerB,
            label: 'Games',
            active: pathname === '/games',
            href: '/games'
        },
        {
            icon: RiGameFill,
            label: 'Leaderboard',
            active: pathname === '/leaderboard',
            href: '/leaderboard'
        }
    ], [pathname])
    
    return (
        <div className={twMerge(`
            flex
            h-full
        `,
            player.activeId && "h-[calc(100% -80px)]"
        )}>
            <div className='
            hidden
            md:flex
            flex-col
            gap-y-2
            h-full
            w-[300px]
            p-2
            '>
                <Box>
                    <div
                    className='
                    flex
                    flex-col
                    gap-y-4
                    px-5
                    py-4
                    '
                    >
                        {routes.map((item) => (
                            <SidebarItem
                            key={item.label}
                            {...item}
                            />
                        ))}
                    </div>
                </Box>
                <Box className='overflow-y-auto h-full'>
                    <GameLibrary songs={songs}/>
                </Box>
                <Box className='overflow-y-auto h-full'>
                    <Library songs={songs}/>
                </Box>
            </div>
            <main className='h-full flex-1 overflow-y-auto py-2'>
                {children}
            </main>
        </div>
    );
}
export default Sidebar;