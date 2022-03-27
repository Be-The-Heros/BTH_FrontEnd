import { Button, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Comment from 'components/Comment';
import PopupLogin from 'components/PopupSuggestLogin';
import React from 'react'
import { FcBookmark, FcGallery } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { commentsState } from 'recoil/comments/state';
import { userState } from 'recoil/users/state';
import Style from './style'




export const PostDetail = (props :PostInfo) => {
  const user = useRecoilValue(userState);
  
  const [listComment, setListComment] = useRecoilState(commentsState);
  
  const [isBtnClick, setIsBtnClick] = React.useState(false);
  const [isOpenCmt, setIsOpentCmt] = React.useState(false);
  const addComment  = (comment: string)=>{
       
    setListComment(
      [ ...listComment,
        {
          id_post: props.id_post,
          id_comment:`00${listComment.length+1}` ,
          id_user: user.uid,
          avatar : user.avatar?user.avatar:'',
          name: user.name,
          content_comment:comment,
          children:[]
        }
      ]);
  }
  const repComment= ()=>{
    // setIsOpentCmt(true)
  }

  return (
    <>
    <  PopupLogin isOpen={(isBtnClick && user.isLoggedIn)} onClose={()=> setIsBtnClick(false)}/>
    <Style>
      <div className='postDetail_head'>
        <Link to={`/profile/${props.uid}`} className='postDetail_head_info'>
          <img src={props.avatar} alt='avatar'></img>
          <div className='postDetail_head_info_detail'>
            <h6>{props.name ? props.name : 'Ho Thanh'}</h6>
            <p>{props.created_at}</p>
          
          </div>
        </Link>
        
      </div>
      <div className='postDetail_body'>

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
      </div>
      <hr/>
      <div className='postDetail_comment'>
        <h3>Comment</h3>
        
        <Comment isOpen = {true}  onclick={(addComment)}/>
        
        {listComment.map((comment, index)=>{
          return (
            <div className='postDetail_comment_display' key={index}>
              <div className='postDetail_comment_display_detail'>
                <img src={comment.avatar} alt='avatar'></img>
                <div className='postDetail_comment_display_detail_content'>
                  <p>{comment.name}</p>
                  <span>{comment.content_comment}</span>
                </div>
              </div>
              <div className='postDetail_comment_display_action'>
                <button className='postDetail_comment_display_action_button' onClick={()=>{setIsOpentCmt(true)}}>Reply</button>
              </div>
              {comment.children?.map((child,index)=>{
                return(
                  <><div className='postDetail_comment_display_reply' key={index}>
                    <img src={child.avatar} alt='avatar'></img>
                    <div className='postDetail_comment_display_reply_content'>
                      <p>{child.name}</p>
                      <span>{child.content_comment}</span>
                    </div>

                  </div>
                  <div className='postDetail_comment_display_reply'>
                      { isOpenCmt ? <Comment isOpen={isOpenCmt} onclick={(repComment)} /> : '' }
                      
                    </div>
                    </>
                )
              })}

            </div>
          )
        })}
        
      </div>
    </Style>
  </>);
}


