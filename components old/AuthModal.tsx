"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";

import uesAuthModal from "@/hooks/UseAuthModal";

import Modal from "./Modal";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = uesAuthModal();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose])
    

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }
    
    return (
        <Modal
        title="Log In"
        description="Log in to your account"
        isOpen={isOpen}
        onChange={onChange}
        >
            <Auth 
                theme="dark"
                magicLink
                // providers={["github", "google"]}
                providers={["google"]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#404040',
                                brandAccent: 'orange.500'
                            }
                        }
                    }
                }}
            />
        </Modal>
    );
}
export default AuthModal;