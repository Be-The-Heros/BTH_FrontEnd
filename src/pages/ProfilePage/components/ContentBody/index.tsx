import React from "react";
import styled from "styled-components";
import { Typography, CardHeader, Avatar } from "@mui/material";

import PostcardIcon from "assets/icons/postcard.svg";
import NoteIcon from "assets/icons/note.svg";
import ProjectsIcon from "assets/icons/projects.svg";
import StarIcon from "assets/icons/star.svg";
import StarsIcon from "assets/icons/stars.svg";
import LocationIcon from "assets/icons/location.svg";
import {
  InformContainer,
  Organization,
  OrganizationsContainer,
  PostsContainer,
  Review,
  ReviewsContainer,
  SocialDataContainer,
  SocialDataItem,
} from "./style";
import { useGetUsersPosts } from "hooks/post/getUsersPosts/getUsersPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "components/Loading";
import { NewFeed } from "pages/Homepage/components/NewFeed";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 3em;
`;

interface ContentBodyProps {
  uid: string;
}

const ContentBody = (props: ContentBodyProps) => {
  const [pagination, setPagination] = React.useState({
    uid: props.uid,
    page: 1,
    size: 8,
  });

  const [dataRender, setDataRender] = React.useState<PostInfo[]>([]);
  const postQuery = useGetUsersPosts({ ...pagination });
  const [isHasMore, setIsHasMore] = React.useState(true);

  React.useEffect(() => {
    if (postQuery.data && isHasMore) {
      setDataRender([...dataRender, ...(postQuery.data?.data.list || [])]);
    }
    if (
      postQuery.data &&
      postQuery.data?.data.total <= pagination.page * pagination.size
    ) {
      setIsHasMore(false);
      return;
    }
    setIsHasMore(true);
  }, [pagination.page, postQuery.data?.data.list]);

  const renderReviewList = () => {
    return Array(8)
      .fill(null)
      .map((item) => (
        <Review>
          <CardHeader
            avatar={
              <Avatar
                alt="Remy Sharp"
                src="https://1.bigdata-vn.com/wp-content/uploads/2021/11/1636289811_593_Tai-Ngay-505-Anh-Avatar-Anime-dep-de-thuong-nhat.jpg"
              />
            }
            title={
              <Typography variant="body1" style={{ fontWeight: 600 }}>
                Anna Scot
              </Typography>
            }
            subheader="Jan 30"
          />
          <div className="review__header__stars">
            <Typography variant="body1">4.5</Typography>
            <img
              src={StarIcon}
              style={{
                width: 25,
                height: 25,
                marginBottom: 4,
                paddingLeft: 3,
              }}
            />
          </div>
          <Typography variant="body1" className="review__comment">
            Great person!
          </Typography>
        </Review>
      ));
  };

  const renderOrganizationsList = () => {
    return Array(3)
      .fill(null)
      .map((item) => (
        <Organization>
          <CardHeader
            avatar={
              <Avatar
                alt="organization-image"
                src="https://logos-world.net/wp-content/uploads/2020/10/UNICEF-Logo.png"
              />
            }
            title={
              <Typography variant="body1" style={{ fontWeight: 600 }}>
                UNICEF
              </Typography>
            }
            subheader={
              <div className="organization__location">
                <img
                  src={LocationIcon}
                  alt="location-icon"
                  className="organization__location__icon"
                />
                <Typography className="organization__location__address">
                  New York City, USA
                </Typography>
              </div>
            }
          />
          <Typography variant="body1" className="organization__role">
            Admin
          </Typography>
        </Organization>
      ));
  };

  return (
    <Container>
      <InformContainer>
        <SocialDataContainer>
          <SocialDataItem>
            <img src={PostcardIcon} />
            <Typography>2 posts published</Typography>
          </SocialDataItem>
          <SocialDataItem>
            <img src={NoteIcon} />
            <Typography>10 comments written</Typography>
          </SocialDataItem>
          <SocialDataItem>
            <img src={ProjectsIcon} />
            <Typography>5 projects joined</Typography>
          </SocialDataItem>
        </SocialDataContainer>

        <Typography variant="h5" className="review-title">
          Reviews (4.5{" "}
          {
            <img
              src={StarIcon}
              alt="star-icon"
              style={{
                width: 30,
                height: 30,
                paddingLeft: 2,
                paddingBottom: 5,
              }}
            />
          }
          )
        </Typography>

        <ReviewsContainer>
          <div className="review-container__header">
            <Typography
              variant="body1"
              className="review-container__header__reviews-number"
            >
              15 reviews
            </Typography>
            <Typography
              variant="h6"
              className="review-container__header__review-link"
            >
              Review
            </Typography>
          </div>

          <div className="review-container__review-list">
            {renderReviewList()}
          </div>
        </ReviewsContainer>

        <Typography variant="h5" className="organization-title">
          Organizations
        </Typography>

        <OrganizationsContainer>
          <div className="organization-container__header">
            <Typography
              variant="body1"
              className="organization-container__header__organizations-number"
            >
              3 organizations
            </Typography>
            <Typography
              variant="h6"
              className="organization-container__header__organizations-link"
            >
              See all
            </Typography>
          </div>
          {renderOrganizationsList()}
        </OrganizationsContainer>
      </InformContainer>
      {dataRender.length !== 0 ? (
        <PostsContainer>
          <InfiniteScroll
            loader={<Loading />}
            next={() =>
              setTimeout(() => {
                setPagination((pagination) => ({
                  ...pagination,
                  page: pagination.page + 1,
                }));
              }, 2000)
            }
            hasMore={isHasMore}
            refreshFunction={postQuery.refetch}
            dataLength={dataRender.length}
          >
            {dataRender.map((post, index) => {
              return <NewFeed {...post} key={index} />;
            })}
          </InfiniteScroll>
        </PostsContainer>
      ) : (
        !postQuery.isLoading && (
          <h1 style={{ marginRight: 280 }}>There's no post</h1>
        )
      )}
    </Container>
  );
};

export default ContentBody;
