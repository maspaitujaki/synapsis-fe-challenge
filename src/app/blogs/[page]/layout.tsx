import BlogPagination from "@/components/BlogPagination"
import BlogPostList from "@/components/BlogPostList"
import { Suspense } from "react"

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
            <Suspense fallback={<BlogListSkeleton/>}>
              <BlogPostList page={params.page}/>
            </Suspense>
          </main>
        </div>
        <aside>
          {children}
        </aside>
      </div>
    </>
  )
}

function BlogListSkeleton(){
  const SingleSkeleton = (
    <div className="p-2 border rounded shadow hover:shadow-md">
      <div className="animate-pulse space-y-2">
        <div className="h-16 bg-slate-200"></div>
        <div className="h-4 max-w-30 bg-slate-200"></div>
      </div>
    </div>
  )
  return (
    <>
      {SingleSkeleton}
      {SingleSkeleton}
      {SingleSkeleton}
      {SingleSkeleton}
      {SingleSkeleton}
    </>
  )
}