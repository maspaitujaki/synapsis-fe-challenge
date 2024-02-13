import { Comment, getBlogComments, getBlogDetail } from "@/models/Blog"
import { getUserDetail } from "@/models/User"

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
  let username = "";
  try {
    const user = await getUserDetail(blog.user_id);
    username = `${user.name} @${user.id}`
  } catch (error) {
    username = `@${blog.user_id}`
  }
  return (
    <div className="border rounded p-2 space-y-2">
      <section>
        <h1 className="font-sans mt-2 mb-4 font-bold text-3xl">{blog.title}</h1>
        <p className="mt-2 mb-4 font-serif text-lg">{blog.body}</p>
        <p>By {username}</p>
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