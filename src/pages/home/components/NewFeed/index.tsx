
import { Post } from 'recoil/users/types';
import {userState} from 'recoil/users/state';
import Style from './style';
import { useRecoilState } from 'recoil';
import { AiFillEnvironment, AiOutlineWarning } from "react-icons/ai";
import { IoMdShareAlt } from 'react-icons/io';
import {VscLocation} from 'react-icons/vsc'
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { Button } from 'antd';
import { FcBookmark, FcContacts, FcVoicePresentation } from 'react-icons/fc';


export const NewFeed = (prop : Post)=>{
    const [user, setUser] = useRecoilState(userState);
    
    let n = prop.photos.length;
    return(
        <Style>
            <div className='Newfeed_head'>
                <div className='Newfeed_head_info'>
                    <img src= {user.avatar} alt='avatar'></img>
                    <div className='Newfeed_head_info_detail'>
                        <h6>{user.name? user.name : 'Ho Thanh'}</h6>
                        <p>{prop.create_at}</p> 
                        <div className='Newfeed_head_info_detail_locate'>
                            <VscLocation style={{ fontSize: '1.25rem'}}/>
                            <div>{prop.residential_address}</div>
                        </div>
                    </div>
                   
                </div> 
                <div className='Newfeed_head_join'>
                    <Button className='Newfeed_head_join_button' type="ghost">Join</Button>
                    <p>120 people</p>
                </div>
            </div>
            <div className='Newfeed_body'>
                <a href='#'><h3>Hỗ Trợ Trẻ Em Thiện Nguyện</h3></a>
                <div className='Newfeed_body_title'>
                    <FcVoicePresentation style={{fontSize:'2.5rem', }}></FcVoicePresentation>
                    <p className='name'>Tên: </p>
                </div>
                <div className='Newfeed_body_title'>
                    <FcBookmark style={{ fontSize: '2.25rem'}}/>
                    <p>Địa Chỉ: </p>

                </div>
               <div className='Newfeed_body_content'> 
                   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam explicabo, dolorem sed autem deleniti temporibus laborum, neque officia suscipit reprehenderit possimus fugit aperiam, quis sequi nemo. Inventore enim debitis non.
                </div>
                <div className='Newfeed_body_photos'>
                    
                    {prop.photos.map((photo,index)=>{
                        let w= (100 / n ) ;
                        return <img src= {photo} alt='photo' key={index} style={{width:`${w}%`, height:'100%'}}/>
                    }
                        
                    )}
                    
                    
                </div>

            </div>
            <div className='Newfeed_footer'>
                <Button type='link'>
                    <IoMdShareAlt style={{fontSize: '200%'}}/> Share
                </Button>
                <Button type='link'>
                    <MdOutlineStickyNote2 style={{fontSize: '200%'}}/> Comment
                </Button>
                <Button type='link'>
                    <AiOutlineWarning style={{fontSize: '200%'}}/> Report
                </Button>
            </div>
        </Style>
    )
}

function calc(arg0: number): import("csstype").Property.Width<string | number> | undefined {
    throw new Error('Function not implemented.');
}
