
"use client";

import Button from "@/components/ui/Button";
import { useRouter } from 'next/navigation'

const Reset = () => {
    
    const router = useRouter()
    
    const refresh = () => {
        router.refresh()
        // router.push(/games/${game}/new)
    }

    return (
        <>
            <Button
                onClick={refresh}
            >
                Reset
            </Button>
        </>
    );
}

export default Reset;