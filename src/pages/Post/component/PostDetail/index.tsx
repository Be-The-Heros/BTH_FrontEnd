import { Button } from 'antd';
import PopupLogin from 'components/PopupSuggestLogin';
import React from 'react'
import { AiOutlineWarning } from 'react-icons/ai';
import { FcBookmark } from 'react-icons/fc';
import { IoMdShareAlt } from 'react-icons/io';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/users/state';
import Style from './style'




export const PostDetail = (props :PostInfo) => {
  const user = useRecoilValue(userState);
  const [isBtnClick, setIsBtnClick] = React.useState(false);

  const photo_length = props.photos.length;
  return (
    <>
    <  PopupLogin isOpen={isBtnClick } onClose={()=> setIsBtnClick(false)}/>
    <Style>
      <div className='postDetail_head'>
        <Link to={`/profile/${props.uid}`} className='postDetail_head_info'>
          <img src={props.avatar} alt='avatar'></img>
          <div className='postDetail_head_info_detail'>
            <h6>{props.name ? props.name : 'Ho Thanh'}</h6>
            <p>{props.created_at}</p>
          
          </div>
        </Link>
        {/* <div className='postDetail_head_join'>
          <Button className='postDetail_head_join_button' 
          type='ghost'
          onClick={()=>setIsBtnClick(!isBtnClick)}>
            Join
          </Button>
          <p>{props.joined} people</p>
        </div> */}
      </div>
      <Link to={`/postdetail/${props.id_post}`} className='postDetail_body'>

        <h3>{props.title}</h3>


        <div className='postDetail_body_title'>
          <FcBookmark style={{ fontSize: '2.25rem' }} />
          <p>Địa Chỉ: {props.residential_address}, {props.ward},{props.district}, {props.city} </p>
        </div>
        <div className='postDetail_body_content'>
          {props.content}
        </div>
        <div className='postDetail_body_photos'>
          {props.photos.map((photo, index) => {
            
            return (
              <img
                src={photo}
                alt='photo'
                key={index}
                style={{ margin: '1.2rem 0' }} />
            );
          })}
        </div>
      </Link>
      <div className='postDetail_footer'>
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
      <div className='postDetail_comment'></div>
    </Style>
  </>);
}


