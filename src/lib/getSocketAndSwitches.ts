import { client } from "@/sanity/client";
// import { type SanityDocument } from "next-sanity"; // you can skip this if not using TypeScript

const STUDENT_QUERY = `*[
  _type == "socketsAndSwitches"
] {
  _id,
  brand,
  itemType,
  modular,modal,ampere,slug,price,description,createdAt,updatedAt,numberOfPins,
}`;

const options = { next: { revalidate: 30 } };

export async function getSocketAndSwitches() {
  const posts = await client.fetch(STUDENT_QUERY, {}, options);
  return posts;
}
