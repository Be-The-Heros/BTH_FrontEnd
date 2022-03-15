import { userState } from 'recoil/users/state';
import Style from './style';
import { useRecoilState } from 'recoil';
import { AiFillEnvironment, AiOutlineWarning } from 'react-icons/ai';
import { IoMdShareAlt } from 'react-icons/io';
import { VscLocation } from 'react-icons/vsc';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { Button } from 'antd';
import { FcBookmark, FcContacts, FcVoicePresentation } from 'react-icons/fc';
import { Link } from 'react-router-dom';

export const NewFeed = (props: PostInfo) => {
  const [user, setUser] = useRecoilState(userState);

  const photo_length = props.photos.length;
  return (
    <Style>
      <div className='Newfeed_head'>
        <Link to={`/profile/${user.uid}` }className='Newfeed_head_info'>
          <img src={user.avatar} alt='avatar'></img>
          <div className='Newfeed_head_info_detail'>
            <h6>{user.name ? user.name : 'Ho Thanh'}</h6>
            <p>{props.created_at}</p>
            {/* <div className='Newfeed_head_info_detail_locate'>
              <VscLocation style={{ fontSize: '1.25rem' }} />
              <div>{props.residential_address}</div>
            </div> */}
          </div>
        </Link>
        <div className='Newfeed_head_join'>
          <Button className='Newfeed_head_join_button' type='ghost'>
            Join
          </Button>
          <p>120 people</p>
        </div>
      </div>
      <div className='Newfeed_body'>
        <Link to='/post'>
          <h3>Hỗ Trợ Trẻ Em Thiện Nguyện</h3>
        </Link>
        
        <div className='Newfeed_body_title'>
          <FcBookmark style={{ fontSize: '2.25rem' }} />
          <p>Địa Chỉ: </p>
        </div>
        <div className='Newfeed_body_content'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
          explicabo, dolorem sed autem deleniti temporibus laborum, neque
          officia suscipit reprehenderit possimus fugit aperiam, quis sequi
          nemo. Inventore enim debitis non.
        </div>
        <div className='Newfeed_body_photos'>
          {props.photos.map((photo, index) => {
            const w = 100 / photo_length;
            return (
              <img
                src={photo}
                alt='photo'
                key={index}
                style={{ width: `${w}%`, height: '100%' }}
              />
            );
          })}
        </div>
      </div>
      <div className='Newfeed_footer'>
        <Button type='link'>
          <IoMdShareAlt style={{ fontSize: '200%' }} /> Share
        </Button>
        <Button type='link'>
          <MdOutlineStickyNote2 style={{ fontSize: '200%' }} /> Comment
        </Button>
        <Button type='link'>
          <AiOutlineWarning style={{ fontSize: '200%' }} /> Report
        </Button>
      </div>
    </Style>
  );
};
