import Loading from "components/Loading";
import { useGetProfileInformByUID } from "hooks/profile/getProfileInform/useGetProfileInform";
import React from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/users/state";
import styled from "styled-components";
import { ContentBody, Profile } from "./components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2% 5em;
`;

const ProfilePage = () => {
  const user = useRecoilValue(userState);

  const { uid } = useParams();

  const isCurrentUser = user.uid === uid;
  const mutation = useGetProfileInformByUID();

  React.useEffect(() => {
    mutation.mutate({ uid: uid! });

    if (mutation.isSuccess) {
      console.log("Data:", mutation);
    } else {
      console.log("Error: ", mutation.error);
    }
  }, [uid]);

  if (mutation.data === undefined) {
    return <Loading cover="content" />;
  }
  return (
    <Container>
      <Profile isCurrentUser={isCurrentUser} profileInfo={mutation.data} />
      <hr className="solid"></hr>
      <ContentBody uid={uid!} />
    </Container>
  );
};

export default ProfilePage;
