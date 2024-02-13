import BlogPostList from "@/components/BlogPostList"
import { Suspense } from "react"

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <p className="font-serif font-semibold text-4xl">Stories</p>
      <div className="grid grid-cols-2 gap-2">
        <main>
          <BlogPostList/>
        </main>
        <aside>
          {children}
        </aside>
      </div>
    </>
  )
}