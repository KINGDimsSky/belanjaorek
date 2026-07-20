"use server"
 
import { getAuthSession } from "@/services/user.service"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"


const s3 = new S3Client({
    region: process.env.SUPABASE_S3_REGION as string,
    endpoint : process.env.SUPABASE_S3_ENDPOINT as string,
    forcePathStyle: true,
    credentials : {
        accessKeyId : process.env.SUPABASE_ACCESS_KEY_ID as string, 
        secretAccessKey : process.env.SUPABASE_SECRET_ACCESS_KEY as string,
    }
})

export async function generateUploadUrlAction (fileName : string, filetype: string) {
    const session = await getAuthSession();

    if (!session) return {message: 'Unauthorized', success: false, url : null}

    const uniqueName = `${Date.now()}-${fileName.replace(/\s+/g, "-")}`;
    const bucketName = process.env.SUPABASE_S3_BUCKET_NAME as string;

    try {
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key : uniqueName,
            ContentType : filetype
        })

        const signedUrl = await getSignedUrl(s3, command, {expiresIn: 60});

        const publicUrl = `${process.env.NEXT_PUBLIC_S3_IMAGE_URL}/${uniqueName}`;

        return {success : true, signedUrl, publicUrl}
    }catch (err) {
        return {success : false, message: 'Gagal Membuat URL', url : null}
    }
}

