export interface Blog {
  id: string
  user_id: number
  title: string
  body: string
}

export interface BlogDetail {
  id: string
  user_id: number
  title: string
  body: string
  comments: Comment[]
}

export interface Comment {
  id: number,
  post_id: number,
  name: string,
  email: string,
  body: string
}

export async function getBlogDetail(blog_id:string): Promise<Blog> {
  const res = await fetch(`https://gorest.co.in/public/v2/posts/${blog_id}`,{
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`
    }
  })
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Blog not found')
    }
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function getBlogComments(blog_id:string): Promise<Comment[]> {
  const res = await fetch(`https://gorest.co.in/public/v2/posts/${blog_id}/comments`,{
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`
    }
  })
  if (!res.ok) {
    throw new Error('Failed to Comments')
  }
 
  return res.json()
}

export async function getBlogs(page: string): Promise<Blog[]>{
  const res = await fetch(`https://gorest.co.in/public/v2/posts?page=${page}&per_page=5`,{
    cache:'no-store',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`
    }
  } )
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}