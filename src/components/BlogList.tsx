/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/blog.tsx

import Link from "next/link";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { getBlogPosts } from "@/lib/blog-post";
export default async function BlogPage() {
  const posts = await getBlogPosts(); // Fetch the posts
  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <ul className="flex flex-col gap-y-8">
        {posts.map((post: any) => {
          const author = post.author;
          const authorImageUrl = author?.imageUrl ? author.imageUrl : null;
          return (
            <li key={post._id} className="border-b border-gray-300 pb-6">
              <Link
                href={`/blog/${post.slug.current}`}
                className="hover:underline">
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </Link>
              {author && (
                <div className="flex items-center gap-4 mt-4">
                  {authorImageUrl && (
                    <Image
                      src={authorImageUrl}
                      alt={author.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-sm">{author.name}</p>
                    {author.bio && (
                      <div className="prose prose-sm text-gray-500 dark:text-gray-400">
                        <PortableText value={author.bio} />
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.subtitle}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Read time: {post.readTime}
                </p>
              </div>
              <div className="mt-6">
                {post.body.map((block: any, index: number) => {
                  if (block._type === "image") {
                    return (
                      <Image
                        key={index}
                        src={block.asset.url}
                        alt="Blog Image"
                        width={600}
                        height={400}
                      />
                    );
                  } else if (block._type === "block") {
                    return (
                      <div key={index}>
                        <PortableText value={block} />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
