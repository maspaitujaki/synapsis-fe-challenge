import { Blog } from "@/models/Blog"
import { User } from "@/models/User"
import Link from "next/link"


async function getUserDetail(user_id: number): Promise<User>{
  const res = await fetch(`https://gorest.co.in/public/v2/users/${user_id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function BlogPostCard( {blog} : {blog: Blog}) {
  let username = "";
  try {
    const user = await getUserDetail(blog.user_id);
    username = `${user.name} @${user.id}`
  } catch (error) {
    username = `@${blog.user_id}`
  }
  return (
    <article>
      <div className="p-2 border rounded shadow max-w-xl hover:shadow-md">
        <Link href='/'>
          <h2 className="font-semibold text-xl">{blog.title}</h2>
          <p className="text-slate-500">{username}</p>
        </Link>
      </div>
    </article>
  )
}