import React from "react";
import { IdentityVerification, PersonalInformation } from "./containers";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 3rem 1rem;
`;

const KycScreen = () => {
  const [tabState, setTabState] = React.useState<
    "personalInformation" | "identityVerification"
  >("personalInformation");

  return (
    <Container>
      <PersonalInformation
        active={tabState === "personalInformation"}
        handleSetTabState={() => setTabState("identityVerification")}
      />
      <IdentityVerification active={tabState === "identityVerification"} />
    </Container>
  );
};

export default KycScreen;
