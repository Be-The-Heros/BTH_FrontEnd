import Loading from 'components/Loading';
import { useQueryPostDetail } from 'hooks/post/detail/useDetailPost';
import { SidebarLeft, SidebarRight } from 'pages/Homepage/components';
import { NewFeed } from 'pages/Homepage/components/NewFeed';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { LayoutApp } from 'templates/LayoutApp';
import logo_text from 'assets/images/logo_text.svg';
// ts-ignore

export default function PostDetailPage() {
  const { post_id } = useParams<{ post_id: string }>();
  const postData = useQueryPostDetail(post_id || '');

  return (
    <LayoutApp sidebarLeft={<SidebarLeft />} sidebarRight={<SidebarRight />}>
      {postData.isLoading ? (
        <Loading />
      ) : (
        postData.data && (
          <React.Fragment>
            <Helmet>
              <meta charSet='utf-8' />
              <meta
                property='og:title'
                content={postData.data?.content}
                data-react-helmet='true'
              />
              {postData.data?.photos?.map((photo_url) => (
                <meta
                  property='og:image'
                  content={photo_url}
                  data-react-helmet='true'
                />
              ))}
            </Helmet>
            <NewFeed {...postData.data} post_id={post_id || ''} />
          </React.Fragment>
        )
      )}
    </LayoutApp>
  );
}
