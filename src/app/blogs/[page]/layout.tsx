import BlogPagination from "@/components/BlogPagination"
import BlogPostList from "@/components/BlogPostList"

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params : {
    page: string,
  }
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="flex justify-between">
            <p className="font-serif font-semibold text-4xl">Stories</p>
            <BlogPagination currPage={params.page} />
          </div>
          <main>
            <BlogPostList page={params.page}/>
          </main>
        </div>
        <aside>
          {children}
        </aside>
      </div>
    </>
  )
}