"use client"

import { generateUploadUrlAction } from "@/actions/upload.action";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone"
import Image from "next/image";
import { Spinner } from "../ui/spinner";

interface ImageDropzoneProps {
    value ?: string | string[];
    onChange : (url: any) => void;
    isMainImage ?: boolean
}

export default function ImageDropZone ({isMainImage = false ,value, onChange} : ImageDropzoneProps) {
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

                toast.success('Successfully Uploaded Image!');
                
                if (isMainImage) {
                  onChange(publicUrl);

                } else {
                    const currentValue = Array.isArray(value) ? value : []

                    onChange([...currentValue, publicUrl]);
                }
            }
        }catch (err) {
            toast.error(`Upload Gagal!, Message : ${err}`)
            console.log ('asu')
        }finally {
            setIsUploading(false);
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept : {"image/jpeg": [], "image/png" : [], "image/webp": []},
        maxFiles: isMainImage ? 1 : 5,
    })  

    return (
        <div {...getRootProps()} className={`border-2 border-dashed p-4 rounded-md text-center cursor-pointer transition-colors hover:border-primary hover:bg-primary/10 ${isDragActive ? "border-primary bg-primary/10" : "border-border"}`}>
            <input {...getInputProps()}/>
            {isUploading ? (
                <div className="flex gap-2 text-center items-center">
                    <Spinner/>
                    <p>Uploading Files...</p>
                </div>
            ) : isMainImage && typeof value === "string" && value ? (
                <Image src={value} width={300} height={300} alt="Preview" className="h-40 mx-auto object-cover rounded-md"/>
            ) : !isMainImage && Array.isArray(value) && value.length > 0 ? (
                <div className="flex flex-wrap gap-2 justify-center">
                    {value.map((url, idx) => (
                        <Image key={idx} src={url} width={100} height={100} alt={`Gallery ${idx}`} className="h-20 w-20 object-cover rounded-md"/>
                    ))}
                </div>
            ) : (
                <p>{isMainImage ? "Upload Gambar Utama (Single)" : "Drag & Drop Gambar Pendukung (Max 5)"}</p>
            )}
        </div>
    )
}