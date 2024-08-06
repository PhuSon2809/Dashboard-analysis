import classNames from 'classnames';
import React from 'react';
import { FaInstagram } from "react-icons/fa6";

interface Props {
  className?: string;
}
const InfoUser = (props: Props) => {
  const { className } = props;
  return (
    <React.Fragment>
      <div className={classNames("w-ful md:min-w-[360px] min-w-[279px] md:h-[120px] h-[95px] rounded-full bg-[#FFFFFFA3] p-2 flex items-center gap-3", className)}>
        <div className='h-full aspect-square bg-slate-200 rounded-full'></div>
        <div className='flex flex-col flex-1'>
          <div className='text-[#0D0D0D] font-bold text-[20px]'>John Doe</div>
          <div className='text-[##0D0D0D] text-[14px]'>Software Engineer</div>
          <div className='flex items-center gap-2 mt-1'>
            <FaInstagram className="w-6 h-6 text-[#11B0F2]" />
            <span className='instagram-text'>Instagram</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default React.memo(InfoUser);