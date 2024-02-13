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