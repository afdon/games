"use client";

import uniqid from "uniqid";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const UploadGameModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            game: null,
            image: null,
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const gameFile = values.game?.[0];

            if (!imageFile || !gameFile || !user) {
                toast.error('Missing Fields');
                return;
            }
            
            const uniqueID = uniqid();
            
            // upload game
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient
            .storage
            .from('images')
            .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                cacheControl: '3600',
                upsert: false
            });

            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed to upload image.');
            }

            // upload game
            const {
                data: gameData,
                error: gameError,
            } = await supabaseClient
            .storage
            .from('images')
            .upload(`image-${values.title}-${uniqueID}`, gameFile, {
                cacheControl: '3600',
                upsert: false
            });

            if (gameError) {
                setIsLoading(false);
                return toast.error('Failed to upload image.');
            }

            const {
                error: supabaseError
            } = await supabaseClient
            .from('games')
            .insert({
                user_id: user.id,
                title: values.title,
                author: values.author,
                image_path: imageData.path,
                gameImage_path: gameData.path
            });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Game created!');
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error("Something went wrong!")
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <Modal
        title="Add a game"
        description="Upload a file"
        isOpen={uploadModal.isOpen}
        onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Game title"
                />
                <Input
                    id="creator"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Game creator"
                />
                <div>
                    <div className="pb-1">
                        Select a file to upload
                    </div>
                    <Input
                    id="game"
                    type="file"
                    disabled={isLoading}
                    accept=".mp4"
                    {...register('game', { required: true })}
                />  
                </div>
                <div>
                    <div className="pb-1">
                        Select an image
                    </div>
                    <Input
                    id="image"
                    type="file"
                    disabled={isLoading}
                    accept="image/*"
                    {...register('image', { required: true })}
                />  
                </div>
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    );
}
export default UploadGameModal;