import React from "react";
import { useNavigate } from "react-router";

import styled from "styled-components";

interface OrganizationFormsProps {
  active: boolean;
}

const Container = styled.div<OrganizationFormsProps>`
  width: 100%;
  display: ${(props) => !props.active && "none"};
`;

const OrganizationForms = (props: OrganizationFormsProps) => {
  const { active } = props;
  const navigate = useNavigate();

  const userToken = localStorage.getItem("token");
  return (
    <Container active={active}>
      <div
        onClick={() =>
          window.open(
            `http://localhost:3000/profile/kyc?token=${userToken}`,
            "_blank"
          )
        }
      >
        KYC Link
      </div>
    </Container>
  );
};

export default OrganizationForms;
