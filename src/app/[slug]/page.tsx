import Detail from "@/components/Detail";

type Props = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: Props) => {
  return <Detail params={params} />;
};

export default Page;
