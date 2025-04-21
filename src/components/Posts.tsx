import Link from "next/link";
import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Image from "next/image";

// Image builder setup
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// Expanded posts query with author dereferencing
const POSTS_QUERY = `*[
  _type == "post-ls" && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  author->{
    _id,
    name,
    image,
    bio
  },
  mainImage,
  categories,
  body
}`;

export const revalidate = 30;

export default async function Posts() {
  const posts = await client.fetch<SanityDocument[]>(
    POSTS_QUERY,
    {},
    {
      next: { revalidate },
    }
  );
  console.log(posts[1].body[3].content[0].children, "qwerty");
  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>

      <ul className="flex flex-col gap-y-8">
        {posts.map((post) => {
          const author = post.author;
          console.log(post.author, "maped post");
          const authorImageUrl = author?.image
            ? urlFor(author.image)?.width(80).height(80).url()
            : null;

          return (
            <li key={post._id} className="border-b border-gray-300 pb-6">
              <Link href={`/${post.slug.current}`} className="hover:underline">
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
                    {Array.isArray(author.bio) && (
                      <div className="prose prose-sm text-gray-500 dark:text-gray-400">
                        <PortableText value={author.bio} />
                      </div>
                    )}
                    <h2>Content</h2>

                    {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      post.body.map((obj: any, index: number) => {
                        return (
                          <div key={index}>
                            <h2> {obj.heading}</h2>
                            <p>{obj.text}</p>
                            {// eslint-disable-next-line @typescript-eslint/no-explicit-any
                            obj?.content?.map((objX: any, ind: number) =>
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              objX.children.map((objY: any, indX: number) => (
                                <div
                                  className="dynemic-html-content-from-server"
                                  dangerouslySetInnerHTML={{
                                    __html: objY.text,
                                  }}
                                  key={ind + indX}></div>
                              ))
                            )}
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
