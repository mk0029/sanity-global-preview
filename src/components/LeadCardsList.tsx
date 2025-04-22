/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";

interface LeadCardsListClientProps {
  visibleCount: number;
  posts: any[];
}
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
export default function LeadCardsList({
  visibleCount,
  posts,
}: LeadCardsListClientProps) {
  return (
    <>
      {posts?.map((obj, i) => {
        const IsCardVisible = i + 1 <= visibleCount;

        const postImageUrl = obj?.detailImage
          ? urlFor(obj.detailImage)?.width(440).height(550).url()
          : null;
        return (
          <div
            key={i}
            id={i % 3 === 0 ? `${i + 1}-th-card` : undefined}
            style={{ maxHeight: IsCardVisible ? "550px" : "0px" }}
            className={`overflow-hidden transition-all ease-linear duration-300 rounded-md ${
              IsCardVisible ? "" : "pointer-events-none opacity-0"
            } hover:shadow-[0_0_20px_0_rgba(0,0,0,0.3)] shadow-[0_0_20px_0_rgba(0,0,0,0.1)]`}>
            <Link
              href={`/card/${obj.slug.current || "/404"}`}
              className={`w-full lg:max-w-[440px] 2xl:max-w-full min-h-[551px] xl:p-7 p-5 flex group relative`}>
              <Image
                className="absolute top-0 left-0 h-full w-full object-cover object-center z-0"
                width={999}
                height={999}
                src={postImageUrl || ""}
                quality={100}
                sizes="100vw"
                alt="bg cover content"
              />
              <div className="flex items-end mx-auto relative z-10">
                <div className="md:min-h-[320px] min-h-[250px] max-w-[382px] w-full bg-white rounded-3xl xl:p-[35px_28px_29px_28px] shadow-[0_0_20px_0_rgba(0,0,0,0.1)] p-4 flex flex-col justify-between group-hover:scale-105 overflow-hidden transition-all ease-linear duration-300">
                  <div>
                    <p className="ff_maison font-semibold text-base leading-[20px] text-[#00AFB5] capitalize md:pb-4 pb-3">
                      {obj.category}
                    </p>
                    <h2 className="font-light md:text-[30px] text-lg leading-[100%] text-black md:mb-4 mb-2 line-clamp-2 pb-0.5">
                      {obj.title}
                    </h2>
                    <div className="font-normal md:text-[15px] leading-[20px] md:text-xl text-base text-black line-clamp-3">
                      <PortableText value={obj.body} />
                    </div>
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
    </>
  );
}
