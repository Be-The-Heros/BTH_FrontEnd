import React from 'react';
import Style from './style';
import {
  FcAbout,
  FcDocument,
  FcHome,
  FcOrganization,
  FcRedo,
  FcViewDetails,
} from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/users/state';
import PopupLogin from 'components/PopupSuggestLogin';
export const SidebarLeft = (props : PostInfo) => {
  const user = useRecoilValue(userState);
  const [isBtnClick, setIsBtnClick] = React.useState(false);
  return (
    <Style>
        <  PopupLogin isOpen={isBtnClick && !user.isLoggedIn} onClose={()=> setIsBtnClick(false)}/>
        <div className='sidebar'>
        
          <Button 
          type='ghost'
          onClick={()=>setIsBtnClick(!isBtnClick)}>
            Join
          </Button>
           
          <Link  className='sidebar_share' to={'/'}>
            <FcRedo style={{ fontSize: '3rem' }} />
            
          </Link>
          <span>Share</span>
        </div>
        
    
      
    </Style>
  );
};
