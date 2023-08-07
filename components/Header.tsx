'use client';

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

import Button from "./Button";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/UseAuthModal";
import usePlayer from "@/hooks/usePlayer";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className,
}) => {
    const player = usePlayer();
    const authModal = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        player.reset();
        router.refresh();

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Logged out!')
        }
    }

    return (
        <div
            className={twMerge(`
        h-fit
        p-6
        `,
                className
            )}
        >
            <div className="
            w-full
            mb-4
            flex
            items-center
            justify-between
            ">
                <div className="
                hidden
                md:flex
                gap-x-2
                items-center
                ">
                    <button
                        onClick={() => router.back()}
                        className="
                    rounded-full
                    bg-black
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                    ">
                        <RxCaretLeft className="text-white" size={35} />
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className="
                    rounded-full
                    bg-black
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                    ">
                        <RxCaretRight className="text-white" size={35} />
                    </button>
                </div>
                <div className="
                    flex
                    md:hidden
                    gap-x-2
                    items-center
                    ">
                    <button className="
                        rounded-full
                        p-2
                        bg-white
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                        ">
                        <HiHome className="text-black" size={20} />
                    </button>
                    <button className="
                        rounded-full
                        p-2
                        bg-white
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                        ">
                        <BiSearch className="text-black" size={20} />
                    </button>
                </div>
                <div className="
                flex
                justify-between
                items-center
                gap-x-4
                ">
                    {user ? (
                        <div className="flex gap-x-4 items-center">
                            <Button
                            onClick={handleLogout}
                            className="bg-white px-6 py-2"
                            >
                                Logout
                            </Button>
                            <Button
                            onClick={() => router.push('/account')}
                            className="bg-white"
                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                    <>
                        <div>
                            <Button
                                onClick={authModal.onOpen}
                                className="
                            bg-transparent
                            text-neutral-300
                            font-medium
                            "
                            >
                                Sign up
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick={authModal.onOpen}
                                className="
                            bg-white
                            px-6
                            py-2
                            "
                            >
                                Log in
                            </Button>
                        </div>
                    </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}

export default Header;