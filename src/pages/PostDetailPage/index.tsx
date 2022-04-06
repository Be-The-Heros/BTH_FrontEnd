import Loading from 'components/Loading';
import { useQueryPostDetail } from 'hooks/post/detail/useDetailPost';
import { SidebarLeft, SidebarRight } from 'pages/Homepage/components';
import { NewFeed } from 'pages/Homepage/components/NewFeed';
import React from 'react';
import { useParams } from 'react-router';
import { LayoutApp } from 'templates/LayoutApp';
// ts-ignore

export default function PostDetailPage() {
  const { post_id } = useParams<{ post_id: string }>();
  const postData = useQueryPostDetail(post_id || '');
  document.title = 'Truơng Thành Huy - Post Detail';
  return (
    <LayoutApp sidebarLeft={<SidebarLeft />} sidebarRight={<SidebarRight />}>
      <meta name='description' content='Some description.' />
      {postData.isLoading ? (
        <Loading />
      ) : (
        postData.data?.data && (
          <NewFeed {...postData.data?.data} post_id={post_id || ''} />
        )
      )}
    </LayoutApp>
  );
}
