import { Blog, Comment } from "@/models/Blog"

async function getBlogDetail(blog_id:string): Promise<Blog> {
  const res = await fetch(`https://gorest.co.in/public/v2/posts/${blog_id}`)
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Blog not found')
    }
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function getBlogComments(blog_id:string): Promise<Comment[]> {
  const res = await fetch(`https://gorest.co.in/public/v2/posts/${blog_id}/comments`)
  if (!res.ok) {
    throw new Error('Failed to Comments')
  }
 
  return res.json()
}

function CommentCard({comment}: {comment: Comment}) {
  return (
    <div className="py-2 border-b space-y-2">
      <p>from: <span className="font-semibold">{comment.name}</span></p>
      <p>{comment.body}</p>
    </div>
  )
}

export default async function BlogPostDetail({blog_id}: {blog_id: string}) {
  const blog = await getBlogDetail(blog_id);
  const comments = await getBlogComments(blog_id);
  return (
    <div className="border rounded p-2 space-y-2">
      <section>
        <h1 className="font-sans mt-2 mb-4 font-bold text-3xl">{blog.title}</h1>
        <p className="mt-2 mb-4 font-serif text-lg">{blog.body}</p>
        <p>By @{blog.user_id}</p>
      </section>
      <section>
        <p className="font-serif font-semibold text-xl">Comments ({comments.length})</p>
        {
          comments.map((comment, idx) => <CommentCard comment={comment} key={idx}/>)
        }
      </section>
    </div>
  )
}