import BlogPostCard from "@/components/BlogPostCard";
import { Blog } from "@/models/Blog";

export default async function Home() {
  return (
    <div className="flex items-center justify-center border rounded h-screen">
      <p className="font-medium text-md">Blog&apos;s content will be shown here</p>
    </div>
  );
}
