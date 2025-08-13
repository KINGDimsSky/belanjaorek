import { CreateAPost } from "@/lib/actions";
import { prisma } from "@/lib/db"
import Link from "next/link"

export default async function BlogPage () {
    const users = await prisma.user.findUnique({
        where : {
            email : "dimssky@gmail.com"
        },
        include : {
            Posts : true
        },
    })
    const Totalpost = await prisma.posts.count();

    return (
        <div className="flex flex-col min-h-screen items-center">
            <h2 className="mt-12 text-2xl font-semibold">Total Posts ({Totalpost})</h2>
            <div className="flex flex-col gap-4 mt-4">
                {users?.Posts.map((post) => (
                <div key={post.id} className="bg-primary p-4 cursor-pointer">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </div>
            ))}
            </div>
            
            <form className="flex flex-col mt-2" action={CreateAPost}>
                <label htmlFor="">Title</label>
                <input type="text" name="title" id="title" className="bg-secondary"/>
                <label htmlFor="content">Content</label>
                <textarea name="content" id="content" className="resize-none bg-secondary"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}