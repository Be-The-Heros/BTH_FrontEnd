import { OperationType } from 'firebase/auth';
import React from 'react';
import { AiOutlineStar, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FcConferenceCall } from 'react-icons/fc';
import { IoLocationOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { organizationState } from 'recoil/organizations/state';
import Style from './style';

export const SidebarRight = (props:PostInfo) => {
 
  return (
    <Style>
      <div className='user'>
        <Link to={`/profile/${props.uid}`} className='user_info'>
          <img src={props.avatar} alt='avatar'></img>
          <div className='user_info_name'>
            <h6>{props.name ? props.name : 'Ho Thanh'}</h6> 
          </div>
        </Link>
        <div className='user_detail'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos veritatis necessitatibus veniam doloremque repellat corporis amet adipisci temporibus nemo repellendus, quam rem hic ab libero corrupti nihil nisi quidem ratione.</div>
        
        <div className='user_label'>Location</div>
        <div></div>
        <div className='user_label' >Joined</div>
        <div></div>
      </div>
      </Style>
  );
};
