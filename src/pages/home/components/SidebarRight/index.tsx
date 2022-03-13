import React from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import Style from './style';

export const SidebarRight = () => {
  return (
  <Style>
    <div className='sidebar_top'>
      <p>Top Organizations</p>
      <a href='#'>See All</a>
    </div>
    <div className='sidebar_group'>
      <div className='sidebar_group_icon'>
       <AiOutlineUsergroupAdd style={{fontSize: '250%'}}/>
      </div>
      <div className='sidebar_group_bg'>
        <svg width="60" height="62" viewBox="0 0 60 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="30" cy="31" rx="30" ry="31" fill="#C4C4C4"/>
          </svg>
       </div> 
    </div>
  </Style>
    );
};
