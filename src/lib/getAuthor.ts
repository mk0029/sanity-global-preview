// utils/getAuthor.ts (or wherever you wanna place it)

import { client } from "@/sanity/client";

export async function getAuthor(postId: string) {
  const query = `
    *[_type == "post-ls" && _id == $postId][0]{
      author->{
        _id,
        name,
        image,
        bio
      }
    }
  `;

  const result = await client.fetch(query, { postId });

  return result?.author || null;
}
