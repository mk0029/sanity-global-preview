import { client } from "@/sanity/client";
// import { type SanityDocument } from "next-sanity"; // you can skip this if not using TypeScript

const POSTS_QUERY = `*[
  _type == "post" &&
  defined(slug.current)
] | order(publishedAt desc)[0...12] {
  _id,
  title,
  slug,
  publishedAt
}`;

const options = { next: { revalidate: 30 } };

export async function getPosts() {
  const posts = await client.fetch(POSTS_QUERY, {}, options);
  return posts;
}
