import AsyncDataWrapper from "@/components/common/AsyncDataWrapper";
import LeadDetail from "@/components/LeadDetail";
import { getBlogPosts } from "@/lib/blog-post";
import React from "react";

const page = () => {
  return (
    <div>
      <AsyncDataWrapper Component={LeadDetail} fetcher={() => getBlogPosts()} />
    </div>
  );
};

export default page;
