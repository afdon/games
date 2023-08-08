import { Game } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getGames from "./getGames";

const getGamesByTitle = async (title: string): Promise<Game[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!title) {
        const allGames = await getGames();
        return allGames;
    }

    const { data, error } = await supabase
    .from('game')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false });

    if (error) {
        console.log(error);
    }

    return (data as any) || [];
};

export default getGamesByTitle;