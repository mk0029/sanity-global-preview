/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Detail.tsx

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default function Detail() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop(); // get the slug from URL
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      const query = `*[_type == "post" && slug.current == $slug][0]`;
      const data = await client.fetch(query, { slug });
      setPost(data);
    };

    fetchPost();
  }, [slug]);

  if (!post) return <p className="p-4">Loading...</p>;

  const postImageUrl = post?.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>

      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width={550}
          height={310}
          quality={100}
        />
      )}

      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>

      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}
