// utils/posts.js

import { client } from "@/sanity/client";

export async function getBlogPosts() {
  const query = `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc)[0...12] {
    _id,
    title,
    slug,
    subtitle,
    category,
    readTime,
    detailImage,
    publishedAt,
    author->{
      _id,
      name,
      image,
      bio,
      "imageUrl": image.asset->url
    },
    body
  }`;

  try {
    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}
