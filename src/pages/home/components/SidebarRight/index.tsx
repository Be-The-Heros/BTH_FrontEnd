import React from 'react';
import { AiOutlineStar, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FcConferenceCall } from 'react-icons/fc';
import { IoLocationOutline } from 'react-icons/io5';
import Style from './style';



export const SidebarRight = () => {
  return (
    <Style>
      <div className='sidebar_top'>
        <div>Top Organizations</div>
        <a href='#'>See All</a>
      </div>
      <div className='sidebar_group'>
        <div className='sidebar_group_detail'>
          <FcConferenceCall style={{ fontSize: '3.2rem', marginTop: '-8px' }} />
          <div className='sidebar_group_detail_name'>
            UNICEFE
            <div>
              <IoLocationOutline /> Ha Noi
            </div>
          </div>
        </div>
        <div className='sidebar_group_rate'>
          <div style={{ textAlign: 'center' }}>
            5 <AiOutlineStar style={{ fontSize: '1.25rem' }} />
          </div>
          <span>(100 reviews)</span>
        </div>
      </div>
      <div className='sidebar_group'>
        <div className='sidebar_group_detail'>
          <FcConferenceCall style={{ fontSize: '3.2rem', marginTop: '-8px' }} />
          <div className='sidebar_group_detail_name'>
            UNICEFE
            <div>
              <IoLocationOutline /> Ha Noi
            </div>
          </div>
        </div>
        <div className='sidebar_group_rate'>
          <div style={{ textAlign: 'center' }}>
            5 <AiOutlineStar style={{ fontSize: '1.25rem' }} />
          </div>
          <span>(100 reviews)</span>
        </div>
      </div>
    </Style>
  );
};
