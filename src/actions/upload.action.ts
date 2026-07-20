"use server"
 
import { getAuthSession } from "@/services/user.service"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"


const s3 = new S3Client({
    region: 'auto',
    endpoint : `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials : {
        accessKeyId : process.env.R2_ACCESS_KEY_ID!, 
        secretAccessKey : process.env.R2_SECRET_ACCESS_KEY!
    }
})

export async function generateUploadUrlAction (fileName : string, filetype: string) {
    const session = await getAuthSession();

    if (!session) return {message: 'Unauthorized', success: false, url : null}

    const uniqueName = `${Date.now()}-${fileName.replace(/\s+/g, "-")}`;
    const bucketName = process.env.R2_BUCKET_NAME!;

    try {
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key : uniqueName,
            ContentType : filetype
        })

        const signedUrl = await getSignedUrl(s3, command, {expiresIn: 60});

        const publicUrl = `${process.env.R2_PUBLIC_URL}/${uniqueName}`;

        return {success : true, signedUrl, publicUrl}
    }catch (err) {
        return {success : false, message: 'Gagal Membuat URL', url : null}
    }
}

