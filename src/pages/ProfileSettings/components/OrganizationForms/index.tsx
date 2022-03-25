import React from "react";

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

  return <Container active={active}>OrganizationForms</Container>;
};

export default OrganizationForms;
