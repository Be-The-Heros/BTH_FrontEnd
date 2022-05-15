import { Button } from 'antd';
import Loading from 'components/Loading';
import { useQueryInfoGroupChat } from 'hooks/invite/info/useQueryInfoGroupChat';
import { useJoinGroupChat } from 'hooks/invite/join/useJoinGroupChat';
import { useGetStatusChat } from 'hooks/invite/status/useGetStatusChat';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import Style from './style';
export const InviteChatPage = () => {
  const { invite_id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useGetStatusChat(invite_id || '');
  const info = useQueryInfoGroupChat(
    invite_id || '',
    !data?.isMember && !isLoading
  );

  const joinMutation = useJoinGroupChat();
  React.useEffect(() => {
    if (joinMutation.isSuccess || (isSuccess && data?.isMember)) {
      window.open(`/chat/${invite_id}`, '_blank');
    }
  }, [invite_id, data?.isMember, joinMutation.isSuccess]);

  return (
    <Style className='invite_chat-page d-flex justify-content-center'>
      {info.isLoading && joinMutation.isLoading ? (
        <Loading />
      ) : (
        <div className='invite_chat-box d-flex flex-wrap justify-content-center align-items-center'>
          {info.data?.avatar && (
            <div className='invite_chat-box__avatar w-100'>
              <img src={info.data?.avatar} alt={'avt-group'}></img>
            </div>
          )}
          <div className='invite_chat-box__name w-100'>
            {info.data?.name_group}
          </div>
          <div className='invite_chat-box__member w-100'>
            {info.data?.total_member} members
          </div>
          <div className='invite_chat-box__footer w-100 mt-4'>
            <Button onClick={() => joinMutation.mutate(invite_id!)}>
              JOIN GROUP
            </Button>
          </div>
        </div>
      )}
    </Style>
  );
};
