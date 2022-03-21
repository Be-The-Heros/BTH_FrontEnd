import styled from "styled-components";
import { ContentBody, Profile } from "./components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 4em 6em 0;
`;

const ProfilePage = () => {
  return (
    <Container>
      <Profile />
      <hr className="solid"></hr>
      <ContentBody />
    </Container>
  );
};

export default ProfilePage;
