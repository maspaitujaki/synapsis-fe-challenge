import BlogPostDetail from "@/components/BlogPostDetail";
import { Suspense } from "react";

export default async function Page({params}: { params: {id: string}}) {
  return (
    <Suspense fallback={<Loading/>}>
      <BlogPostDetail blog_id={params.id}/>
    </Suspense>
  );
}

function Loading() {
  return(
    <div className="flex items-center justify-center border rounded h-screen">
      <p className="font-medium text-md">Loading...</p>
    </div>
  )
}
