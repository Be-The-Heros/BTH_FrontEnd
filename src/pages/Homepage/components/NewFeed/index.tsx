import { userState } from 'recoil/users/state';
import Style from './style';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AiFillEnvironment, AiOutlineWarning } from 'react-icons/ai';
import { IoMdShareAlt } from 'react-icons/io';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { Button } from 'antd';
import { FcBookmark, FcContacts, FcVoicePresentation } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import PopupLogin from 'components/PopupSuggestLogin';
import React from 'react';

export const NewFeed = (props: PostInfo) => {
  const user = useRecoilValue(userState);
  const [isBtnClick, setIsBtnClick] = React.useState(false);

  const photo_length = props.photos.length;
  return (
    <>
    <  PopupLogin isOpen={isBtnClick && !user.isLoggedIn} onClose={()=> setIsBtnClick(false)}/>
    <Style>
      <div className='Newfeed_head'>
        <Link to={`/profile/${props.uid}`} className='Newfeed_head_info'>
          <img src={props.avatar} alt='avatar'></img>
          <div className='Newfeed_head_info_detail'>
            <h6>{props.name ? props.name : 'Ho Thanh'}</h6>
            <p>{props.created_at}</p>
            {/* <div className='Newfeed_head_info_detail_locate'>
      <VscLocation style={{ fontSize: '1.25rem' }} />
      <div>{props.residential_address}</div>
    </div> */}
          </div>
        </Link>
        <div className='Newfeed_head_join'>
          <Button className='Newfeed_head_join_button' 
          type='ghost'
          onClick={()=>setIsBtnClick(!isBtnClick)}>
            Join
          </Button>
          <p>{props.joined} people</p>
        </div>
      </div>
      <Link to='/post' className='Newfeed_body'>

        <h3>{props.title}</h3>


        <div className='Newfeed_body_title'>
          <FcBookmark style={{ fontSize: '2.25rem' }} />
          <p>Địa Chỉ: {props.residential_address}, {props.ward},{props.district}, {props.city} </p>
        </div>
        <div className='Newfeed_body_content'>
          {props.content}
        </div>
        <div className='Newfeed_body_photos'>
          {props.photos.map((photo, index) => {
            const w = 100 / photo_length;
            return (
              <img
                src={photo}
                alt='photo'
                key={index}
                style={{ width: `${w}%`, height: '100%' }} />
            );
          })}
        </div>
      </Link>
      <div className='Newfeed_footer'>
        <Button type='link'>
          <IoMdShareAlt style={{ fontSize: '150%', margin: '0 0.5rem 0.2rem' }} /> Share
        </Button>
        <Button type='link'>
          <MdOutlineStickyNote2 style={{ fontSize: '120%', margin: '0 0.5rem 0.2rem' }} /> Comment
        </Button>
        <Button type='link'>
          <AiOutlineWarning style={{ fontSize: '120%', margin: '0 0.5rem 0.2rem' }} /> Report
        </Button>
      </div>
    </Style></>
  );
};
