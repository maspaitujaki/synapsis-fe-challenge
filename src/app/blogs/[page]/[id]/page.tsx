import BlogPostDetail from "@/components/BlogPostDetail";

export default async function Page({params}: { params: {id: string}}) {
  return (
    <>
      <BlogPostDetail blog_id={params.id}/>
    </>
  );
}
