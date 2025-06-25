/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CustomImage from "../common/visuals/CustomImage";
import Avatar from "../common/visuals/Avatar";
import Heading from "../common/typography/Heading";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SocketAndSwitch = ({ data: items }: { data: any }) => {
  console.log(items);
  return (
    <div>
      <div className="container">
        <div className="flex -mx-3">
          {items.map((item: any, index: number) => {
            return (
              <div key={index} className="w-3/12 px-3">
                <CustomImage
                  className="group w-full max-h-[200px]"
                  alt="dummy image"
                  src="/assets/images/download.jpeg"
                />
                <div className="p-2">
                  <Heading as="h3">{item.brand}</Heading>
                  <Heading as="h6">
                    {item.numberOfPins && item.numberOfPins + " pin "}
                    {item.itemType} {item.ampere && item.ampere + "A"}
                    {item.modular && " Modular"}
                  </Heading>
                  <p>
                    {item.price}₹{" "}
                    <span className="scale-90 inline-block">only</span>
                  </p>{" "}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SocketAndSwitch;
