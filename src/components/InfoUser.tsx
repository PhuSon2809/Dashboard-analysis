import classNames from 'classnames';
import React from 'react';
import { FaInstagram } from "react-icons/fa6";
import ArrowListen from '~/assets/icons/ArrowListen';

interface Props {
  className?: string;
  name: string;
  des: string;
  avatar: string;
  role?: string;
}
const InfoUser = (props: Props) => {
  const { className, name, des, role } = props;
  return (
    <React.Fragment>
      <div className={classNames("flex items-center gap-3", className)}>
        <div className={classNames("w-ful md:min-w-[360px] min-w-[279px] md:h-[120px] h-[95px] rounded-full bg-[#FFFFFFA3] p-2 flex items-center gap-3")}>
          <div className='h-full aspect-square bg-slate-200 rounded-full overflow-hidden'>
            <img src={''} className='w-full h-full object-cover' alt="" />
          </div>
          <div className='flex flex-col flex-1'>
            <div className='text-[#0D0D0D] font-bold text-[20px]'>{name}</div>
            <div className='text-[##0D0D0D] text-[14px]'>{des}</div>
            <div className='flex items-center gap-2 mt-1'>
              <FaInstagram className="w-6 h-6 text-[#11B0F2]" />
              <span className='instagram-text'>Instagram</span>
            </div>
          </div>
        </div>
        {role && (
          <div className='flex items-center gap-3'>
            <ArrowListen className="w-12 h-12 -rotate-[90deg]" />
            <span className="absolute md:left-[-20px] left-0 top-[70px] md:top-[90px] font-semibold">{role}</span>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default React.memo(InfoUser);