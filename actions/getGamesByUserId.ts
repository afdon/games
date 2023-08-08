import { Game } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getGamesByUserId = async (): Promise<Game[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: sessionData,
        error: sessonError
    } = await supabase.auth.getSession();

    if (sessonError) {
        console.log(sessonError.message);
        return [];
    }

    const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('user_id', sessionData.session?.user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
};

export default getGamesByUserId;