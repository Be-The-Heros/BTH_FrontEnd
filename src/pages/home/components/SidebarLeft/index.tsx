import { Button } from 'antd';
import React from 'react';
import { AiFillFlag, AiOutlineBook, AiOutlineExclamationCircle, AiOutlineFileProtect, AiTwotoneHome } from 'react-icons/ai';

import Style from './style'
import {FcAbout, FcDocument, FcHome, FcOrganization, FcViewDetails} from 'react-icons/fc'
export const SidebarLeft = () => {
  return (
    <Style>
      <div>
      <a href='#' className='home'>
        <FcHome style={{ fontSize: '2rem', marginTop:'-5px', marginRight:'10px'}}></FcHome>
        Home
      </a>
      <a href='#'>
        <FcOrganization style={{ fontSize: '2rem', marginTop:'-5px', marginRight:'10px'}}/>
        Orgnization
      </a>
      <a href='#'>
      <FcAbout style={{ fontSize: '2rem', marginRight:'10px'}}/> About
      </a>
      </div>
      <div>
        <h4>Orther</h4>
        <a>
        <FcViewDetails style={{fontSize: '2rem', marginRight:'10px'}}/> Privacy policy
        </a>
        <a href="#">
          <FcDocument style={{fontSize: '2rem', marginRight:'10px'}}/> Term of use
        </a>
      </div>
    </Style>
  );
};
