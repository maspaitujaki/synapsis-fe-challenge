import { Blog } from "@/models/Blog";
import BlogPostCard from "./BlogPostCard";

async function getBlogs(page: number): Promise<Blog[]>{
  const res = await fetch(`https://gorest.co.in/public/v2/posts?page=${page}&per_page=5`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function BlogPostList() {
  const blogs = await getBlogs(1);

  return (
    <section>
      <div className="space-y-2">
        {
          blogs.map((blog, idx) => (
            <BlogPostCard blog={blog} key={idx}/>
            ))
        }
      </div>
    </section>
  )
}