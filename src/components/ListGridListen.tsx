import React from "react";
import InfoUser from "./InfoUser";

const data = [
  {
    name: "Dulce Press 1",
    des: "United States",
    avatar: "https://i.pinimg.com/736x/45/1c/60/451c60a1725dbdd7b2f4c8337c4a024b.jpg",
    className: "md:rotate-[10deg] rotate-[5deg]",
  },
  {
    name: "Dulce Press 2",
    des: "United States",
    avatar: "https://i.pinimg.com/736x/45/1c/60/451c60a1725dbdd7b2f4c8337c4a024b.jpg",
    className: "-rotate-[10deg] -rotate-[5deg]"
  },
  {
    name: "Dulce Press 3",
    des: "United States",
    avatar: "https://i.pinimg.com/736x/45/1c/60/451c60a1725dbdd7b2f4c8337c4a024b.jpg",
    className: "rotate-[10deg] rotate-[5deg]"
  },
  {
    name: "Dulce Press 4",
    des: "United States",
    avatar: "https://i.pinimg.com/736x/45/1c/60/451c60a1725dbdd7b2f4c8337c4a024b.jpg",
     className: "-rotate-[10deg] -rotate-[5deg] flex-row-reverse",
     role: "Nail Salon"
  },
  {
    name: "Dulce Press 5",
    des: "United States",
    avatar: "https://i.pinimg.com/736x/45/1c/60/451c60a1725dbdd7b2f4c8337c4a024b.jpg",
    className: "rotate-[10deg] rotate-[5deg]"
  },
  {
    name: "Dulce Press 6",
    des: "United States",
    avatar: "https://i.pinimg.com/736x/45/1c/60/451c60a1725dbdd7b2f4c8337c4a024b.jpg",
     className: "-rotate-[10deg] -rotate-[5deg]"
  }
]

const ListGridListen  = () => {
  return (
    <React.Fragment>
      <div className="w-full h-full md:flex block items-center justify-center py-5">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-8 gap-8 items-center justify-center">
         {data.map((user, index) => (
            <InfoUser key={index} {...user} className={user.className} />
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default React.memo(ListGridListen);