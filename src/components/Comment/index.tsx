import { Button } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/users/state';

import Style from './style'
interface CommentProps{
    onclick: (cmt: string)=>void;
    isOpen : boolean;
}
export default function Comment( {onclick, isOpen= false}: CommentProps) {
    
    const [comment, setComment] = React.useState("");
    const user = useRecoilValue(userState);
    const addComment= ()=>{
       
        onclick(comment);
        setComment('');
        
    }
    
  return (
    <Style>
        <div className='comment_create'>
          <img src={user.avatar} alt='avatar'></img>
          <div>
            <TextArea placeholder='Write a comment.....'
            className='comment_create_input'
            autoSize
            value={comment}
            onChange={e=>setComment(e.target.value)}

            />
            <Button className='comment_create_submit' onClick={addComment}>Send</Button>
          </div>
          
        </div>
    </Style>
  )
}


