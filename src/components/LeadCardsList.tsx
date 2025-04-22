/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/blog.tsx

import { getBlogPosts } from "@/lib/blog-post";
import { PortableText } from "next-sanity";
import Link from "next/link";
interface LeadCardsListProps {
  visibleCount: number;
}
export default async function LeadCardsList({
  visibleCount,
}: LeadCardsListProps) {
  const posts = await getBlogPosts(); // Fetch the posts

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

      <ul className="flex flex-col gap-y-8">
        {posts.map((obj: any, i: number) => {
          const author = obj.author;
          const authorImageUrl = author?.imageUrl ? author.imageUrl : null;
          console.log(authorImageUrl);
          const IsCardVisible = i + 1 <= visibleCount;

          return (
            <div
              key={i}
              id={i % 3 === 0 ? `${i + 1}-th-card` : undefined}
              style={{ maxHeight: IsCardVisible ? "550px" : "0px" }}
              className={`overflow-hidden transition-all ease-linear duration-300 rounded-md ${
                IsCardVisible ? "" : "pointer-events-none opacity-0"
              } hover:shadow-[0_0_20px_0_rgba(0,0,0,0.3)]`}>
              <Link
                href={`/card/${obj?.title?.toLowerCase()?.replace(/ /g, "-") || "404"}`}
                className={`${obj.bgImage} bg-full !bg-no-repeat w-full lg:max-w-[440px] 2xl:max-w-full min-h-[551px] relative xl:p-7 p-5 flex group`}>
                <div className="flex items-end mx-auto">
                  <div className="md:min-h-[320px] min-h-[250px] max-w-[382px] w-full bg-white rounded-3xl xl:p-[35px_28px_29px_28px] p-4 flex flex-col justify-between group-hover:scale-105 overflow-hidden transition-all ease-linear duration-300">
                    <div>
                      <p className="ff_maison font-semibold text-base leading-[20px] text-[#00AFB5] uppercase md:pb-4 pb-3">
                        lead-gen
                      </p>
                      <h2 className="font-light md:text-[30px] text-lg leading-[100%] text-black md:mb-4 mb-2 line-clamp-2 pb-0.5">
                        {obj.title}
                      </h2>
                      <p className="font-normal md:text-[15px] leading-[20px] md:text-xl text-base text-black line-clamp-3">
                        <PortableText value={author.description} />
                      </p>
                    </div>
                    <div>
                      <button className="cursor-pointer font-semibold md:text-base text-sm leading-[20px] text-black relative group">
                        <span className="inline-block transition-all ease-linear duration-300 w-0 h-px bg-black bottom-0 left-0 absolute group-hover:w-full"></span>
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </ul>
    </main>
  );
}
