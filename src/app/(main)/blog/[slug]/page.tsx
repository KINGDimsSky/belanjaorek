import { prisma } from "@/lib/db"

interface PropsPage {
    params : {
        slug: string
    }
}

export default async function DetailedBlogPages({params} : PropsPage) {
    const {slug} = params
    const post = await prisma.posts.findUnique({
        where : {
            slug : slug
        },
        include : {
            Author : true
        }
    })
    return (
        <div className="flex flex-col min-h-screen items-center">
            <h2 className="mt-12 text-2xl font-semibold">{post?.title}</h2>
            <h2 className="mt-2">{post?.content}</h2>
            <h2>{post?.Author.email}</h2>
        </div>
    )
}