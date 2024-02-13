import { getBlogs } from "@/models/Blog";
import BlogPostCard from "./BlogPostCard";

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