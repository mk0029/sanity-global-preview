/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface list {
  data: any;
}
const LeadDetail = ({ data: posts }: list) => {
  const { projectId, dataset } = client.config();
  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;
  const pathname = usePathname();
  const slug = pathname.replace("/card/", "");
  const filteredList = posts.filter((obj: any) => obj.slug.current === slug);
  return (
    <div className="py-20">
      {filteredList?.map((obj: any, i: number) => {
        const author = obj.author;
        const authorImageUrl = author?.imageUrl ? author.imageUrl : null;
        const postImageUrl = obj?.detailImage
          ? urlFor(obj.detailImage)?.width(1100).height(630).url()
          : null;

        return (
          <div key={i}>
            <div className="container mx-auto px-3">
              <h1 className="ff_sohne font-bold lg:text-[80px] sm:text-[50px] text-4xl leading-[100%] text-center mx-auto text-black ">
                {obj.title}
              </h1>
              <p className="font-normal text-base leading-[150%] text-black text-center pt-3 max-w-[400px] mx-auto lg:pb-10 pb-6">
                {obj.subheading}
              </p>
              <div className="flex items-center gap-3 justify-center pb-12">
                <Image
                  width={41}
                  height={41}
                  className="size-10 max-w-10 rounded-full object-cover"
                  src={authorImageUrl}
                  alt="userimage"
                  quality={100}
                />
                <div className="flex items-center gap-2">
                  <p className="font-normal text-base leading-160% text-[#4DBC15]">
                    {author.name}
                    {/* {author.bio && (
                      <div className="prose prose-base text-gray-500 dark:text-gray-400">
                        <PortableText value={author.bio} />
                      </div>
                    )} */}
                  </p>
                  <p className="font-normal text-base leading-160% text-[#646464] h-fit">
                    .
                  </p>
                  <p className="font-normal text-base leading-160% text-[#646464]">
                    {new Date(obj.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Image
                width={1100}
                height={630}
                src={postImageUrl || ""}
                sizes="100vw"
                alt="img"
                quality={100}
                className="mx-auto lg:h-[630px] object-cover object-top"
              />
              <div className="md:pt-20 pt-10 flex flex-col gap-3">
                <p className="text-center font-bold text-3xl">{obj.title}</p>
                <p className="text-center font-normal text-lg max-w-[300px] mx-auto">
                  {obj.description}
                </p>
              </div>
              {/* {obj.briefInfo.map((item, index) => (
              <div key={index}>
                <p className="max-w-[500px] mx-auto pt-3">{item}</p>
              </div>
            ))} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeadDetail;
