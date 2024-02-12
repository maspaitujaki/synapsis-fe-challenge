import BlogPostCard from "@/components/BlogPostCard";
import { Blog } from "@/models/Blog";

async function getBlogs(): Promise<Blog[]>{
  const res = await fetch(`https://gorest.co.in/public/v2/posts`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
export default async function Home() {
  const blogs = await getBlogs();
  return (
    <>
      <main>
        <h1 className="font-serif font-semibold text-4xl">Stories</h1>
        <section>
          <div className="space-y-2">
            {
              blogs.map((blog, idx) => (
                <BlogPostCard blog={blog} key={idx}/>
              ))
            }
          </div>
        </section>
      </main>
      <aside>
        
      </aside>
    </>
  );
}
