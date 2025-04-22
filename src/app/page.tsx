import AsyncDataWrapper from "@/components/common/AsyncDataWrapper";
import Header from "@/components/Header";
import LeadCard from "@/components/LeadCard";
import { getBlogPosts } from "@/lib/blog-post";

export default function Home() {
  return (
    <>
      <Header />
      <AsyncDataWrapper
        Component={LeadCard}
        fetcher={() => getBlogPosts()}></AsyncDataWrapper>
    </>
  );
}
