import { Game } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getGames = async (): Promise<Game[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('created_at', { ascending: false });

    if (error) {
        console.log(error);
    }

    return (data as any) || [];
};

export default getGames;