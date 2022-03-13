
import { Post } from 'recoil/users/types';
import {userState} from 'recoil/users/state';
import Style from './style';
import { useRecoilState } from 'recoil';
import { AiFillEnvironment, AiOutlineWarning } from "react-icons/ai";
import { IoMdShareAlt } from 'react-icons/io';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { Button } from 'antd';


export const NewFeed = (prop : Post)=>{
    const [user, setUser] = useRecoilState(userState);
    console.log(prop.photos);
    
    return(
        <Style>
            <div className='Newfeed_head'>
                <div className='Newfeed_head_info'>
                    <img src= {user.avatar} alt='avatar'></img>
                    <div className='Newfeed_head_info_detail'>
                        <h6>{user.name}Ho Thanh</h6>
                        <p>{prop.create_at}</p> 
                        <div className='Newfeed_head_info_detail_locate'>
                            <AiFillEnvironment style={{ fontSize: '120%'}}/>
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
                     <svg width="28" height="35" viewBox="0 0 28 35" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <rect width="28" height="35" fill="url(#pattern0)"/>
                        <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_111_502" transform="translate(0 0.0930233) scale(0.0111111 0.00904393)"/>
                        </pattern>
                        <image id="image0_111_502" width="90" height="90" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAADpUlEQVR4nO2du2sUURSHP8WYBxEEH2iMlVGxiRII9gZbRUwlClbaqCn9AxTZdCKClU1iGhH0D7BQCGqKkGihCGoQSbASY9ZH0OxazKYQN5uZOec+ZjgfTLPMnPzOx83M3dnZu2AYhmEYhlEkOoARYAqoAnXBthabgVFgAZgHKo3X1kKSoQq8AK4A7SkdOKcXeImssTSiK032rbTYXyvPbKPHoHSgK7mV6Pkm+8632F8z0yzCkb1RcjBwEegX1igCh4ELkgJS0WeEx2dhvMlrYx7/vs9e/2MJ3X/R9S6GFZLTheuLYbPtWwofa7JBcjCtxeRFmmmVqLJJTx1GSky0J2IU3aNQY49CDVViFH0ukhpRoX1lrwPLwFXyjeyexrHLjrLlJsZZR8zYrCN2TLQnTLQnTLQnTLQnTLQnTLQnTLQnTLQnTLQnTLQniiD6HXANOA7sBbqAbmAIeBwwl1dc3CFb3RaAYdYfDCNAzXEW8d07Ka4amgS2Z8ixi2TE33eYqXSiXwFbBZnOAyuOsgVDu5EacFQh16iDbKUS/UgpVzew6CBfbmKbdTxQqlMFHirVUiE20U8Va00q1hITk+ga8Fmx3gfFWmJiEr0M/FasV1WsJSYm0Z3ANsV6uxVriYlJNOhM7VY5olhLTGyizyrWOqFYKzja89QV4JBCrgEH2Ur1huUT0KaQaxPw0UG+3MR26niDzszjD/BeoY4asYneqVjroGKt4Lg4Rw8o5DrlIFupztF14C2wX5CpH/jiKFswXDRTp/lX3dIy4TBXMFw19APYlyNPH/DTYa5guGqoDjwh21SvjeTun8tMwXDZVB24myHLHQ95guG6sTpwOkWOYU9ZchPbPLoZaebWO5ynEFIE0aXARHvCRHsidtG/gOkU+0039i0tLq/wU8BghiyDJAtORTnrkKLdyCLJW+ghQaZjwD0ie4BGipbcceAkyWJYWrSTfJw1BnxVyhoMSeg5kkdut3jI2d34W3PCzMHIG/gmuqM3LZ3ArRx5Cyn6epCk/3KDkoueJY4p5UaS57C9ifbd9G2SZ+xCUyPJUhiyjoi+MDGbcgCPI9r3CjRdJJ+AxEAX8D3jMbl92VI/2bClfmLHRHvCRHvCRHvCRHvCRHvCRHvCRHtCKjqqr5g5RrT0vFT0a+HxRULUq1T0hPD4IhG013aSe8ySj4eKsM3Q+hcyvNBLuWXPENFS9u3AZeA5bn6bxfe2BDwDLhHBSDYMwzAMw0jPX7YrKc+C2+mcAAAAAElFTkSuQmCC"/>
                        </defs>
                    </svg>
                    <p className='name'>Tên: </p>
                </div>
                <div className='Newfeed_body_title'>
                    <AiFillEnvironment style={{ fontSize: '150%'}}/>
                    <p>Địa Chỉ: </p>

                </div>
               <div> 
                   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam explicabo, dolorem sed autem deleniti temporibus laborum, neque officia suscipit reprehenderit possimus fugit aperiam, quis sequi nemo. Inventore enim debitis non.
                </div>
                <div>
                    {prop.photos.map((photo,index)=>
                        <img src= {photo} alt='photo' key={index}/>
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