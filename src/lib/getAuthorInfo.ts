import { client } from "@/sanity/client";

export async function getAuthorInfo(list: string, postId: string) {
  const query = `*[_type == $list && _id == $postId][0]{
    author->{
      _id,
      name,
      image,
      bio,
      role,
      email,
      socials,
      "imageUrl": image.asset->url
    }
  }`;

  try {
    const data = await client.fetch(query, { list, postId });
    return data?.author || null;
  } catch (err) {
    console.error("Error fetching author info:", err);
    return null;
  }
}
