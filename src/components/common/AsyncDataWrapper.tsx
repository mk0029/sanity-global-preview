// components/AsyncDataWrapper.tsx
import React from "react";

interface AsyncDataWrapperProps<T> {
  fetcher: () => Promise<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any;
}

export default async function AsyncDataWrapper<T>({
  fetcher,
  Component,
}: AsyncDataWrapperProps<T>) {
  const data = await fetcher();
  return <Component data={data} />;
}
