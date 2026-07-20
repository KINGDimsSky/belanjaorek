"use client"

import { generateUploadUrlAction } from "@/actions/upload.action";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone"
import Image from "next/image";
import { Spinner } from "../ui/spinner";

interface ImageDropzoneProps {
    value : string;
    onChange : (url: string) => void;
}

export default function ImageDropZone ({value, onChange} : ImageDropzoneProps) {
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles : File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const {success, signedUrl, publicUrl } = await generateUploadUrlAction(file.name, file.type);

            if (success && signedUrl ) {
                await fetch(signedUrl, {
                    method : "PUT",
                    body: file,
                    headers: { "Content-Type" : file.type}
                }); 

                onChange(publicUrl)
            }
        }catch (err) {
            toast.error(`Upload Gagal!, Message : ${err}`)
        }finally {
            setIsUploading(false);
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept : {"image/jpeg": [], "image/png" : [], "image/webp": []},
        maxFiles: 1,
    })

    return (
        <div {...getRootProps()} className={`border-2 border-dashed p-4 rounded-md text-center cursor-pointer transition-colors hover:border-primary hover:bg-primary/10 ${isDragActive ? "border-primary bg-primary/10" : "border-border"}`}>
            <input {...getInputProps()}/>
            {isUploading ? (
                <div className="flex gap-2 text-center items-center">
                    <Spinner/>
                    <p>Uploading Files...</p>
                </div>
            ) : value ? (
                <Image src={value} alt="Preview" className="h-40 mx-auto object-cover rounded-md"/>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files (Max 5MB)</p>
            )}
        </div>
    )
}