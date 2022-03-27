import React, { Key } from "react";
import styled from "styled-components";
import { ContentBody, Profile } from "./components";
import Loading from "components/Loading";
import { useGetProfileInform } from "hooks/profile/getProfileInform/useGetProfileInform";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 4em 6em 0;
`;

const ProfilePage = () => {
  let { uid } = useParams();

  const mutation = useGetProfileInform();

  React.useEffect(() => {
    mutation.mutate();

    if (mutation.isSuccess) {
      console.log("Data:", mutation);
    } else {
      console.log("Error: ", mutation.error);
    }
  }, []);

  if (mutation.data === undefined) {
    return <Loading cover="content" />;
  }
  return (
    <Container>
      <Profile profileInfo={mutation.data} />
      <hr className="solid"></hr>
      <ContentBody uid={uid!} />
    </Container>
  );
};

export default ProfilePage;
