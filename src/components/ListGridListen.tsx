import classNames from "classnames";
import React from "react";
import { isEven } from "~/utils/utils";
import InfoUser from "./InfoUser";

const data = [
  {
    name: "test",
    des: "United States",
    avatar: "",
  }
]

const ListGridListen  = () => {
  return (
    <React.Fragment>
      <div className="w-full h-full md:flex block items-center justify-center">
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-3 items-center justify-center">
          {/* {[...Array(6)].map((_, index) => (
            <div key={index} className={classNames("relative h-full min-w-[300px] w-full bg-gray-200 rounded-lg", isEven(index) ? "rotate-12" : "-rotate-12" )}>
              <div className="absolute inset-0 bg-black opacity-50" />
              <div className="p-4 text-center text-white">
                Listening #{index + 1}
              </div>
            </div>
          ))} */}
         {[...Array(6)].map((_, index) => (
            <InfoUser key={index} className={isEven(index) ? "md:rotate-12 rotate-3" : "md:-rotate-12 -rotate-3"} />
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default React.memo(ListGridListen);