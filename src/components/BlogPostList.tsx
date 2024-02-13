import { Blog } from "@/models/Blog";
import BlogPostCard from "./BlogPostCard";

async function getBlogs(page: string): Promise<Blog[]>{
  const res = await fetch(`https://gorest.co.in/public/v2/posts?page=${page}&per_page=5`,{cache:'no-store'})
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function BlogPostList({page}: {page:string}) {
  const blogs = await getBlogs(page);
  return (
    <section>
      <div className="space-y-2">
        {
          blogs.map((blog, idx) => (
            <BlogPostCard blog={blog} page={page} key={idx}/>
            ))
        }
      </div>
    </section>
  )
}