import { Blog } from "@/models/Blog"
import { getUserDetail } from "@/models/User"
import Link from "next/link"

export default async function BlogPostCard({blog, page} : {blog: Blog, page:string}) {
  let username = "";
  try {
    const user = await getUserDetail(blog.user_id);
    username = `${user.name} @${user.id}`
  } catch (error) {
    username = `@${blog.user_id}`
  }
  return (
    <article>
      <div className="p-2 border rounded shadow hover:shadow-md">
        <Link href={`/blogs/${page}/${blog.id}`}>
          <p className="font-semibold text-xl">{blog.title}</p>
          <p className="text-slate-500">{username}</p>
        </Link>
      </div>
    </article>
  )
}