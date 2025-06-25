import AsyncDataWrapper from "@/components/common/AsyncDataWrapper";
import SocketAndSwitch from "@/components/price-list/SocketAndSwitch";
import { getSocketAndSwitches } from "@/lib/getSocketAndSwitches";

export default function Home() {
  return (
    <>
      {/* <AsyncDataWrapper
        Component={Student}
        fetcher={() => getPosts()}></AsyncDataWrapper> */}
      <AsyncDataWrapper
        Component={SocketAndSwitch}
        fetcher={() => getSocketAndSwitches()}></AsyncDataWrapper>
    </>
  );
}
