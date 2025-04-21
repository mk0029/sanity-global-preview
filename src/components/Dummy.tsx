/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPosts } from "@/lib/getPosts";
import Link from "next/link";
import React from "react";

const Dummy = async () => {
  const posts = await getPosts();

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts?.map((post: any) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/${post.slug.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Dummy;
