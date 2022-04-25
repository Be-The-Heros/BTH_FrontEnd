import React from "react";

import styled from "styled-components";
import _toLowerCase from "lodash/lowerCase";

interface MenuItemProps {
  title?: "Profile" | "Notifications" | "Accounts" | "Verification";
  active?: boolean;
  icon?: React.ReactNode;
  onClick?: (
    state: "Profile" | "Notifications" | "Accounts" | "Verification"
  ) => void;
}

const Container = styled.div<MenuItemProps>`
  width: 80%;
  padding: 0.3rem;
  padding-left: 2rem;
  padding-top: 0.8rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  transition: 0.2s all ease-in-out;

  box-shadow: ${(props) => props.active && "0px 4px 4px rgba(0, 0, 0, 0.25)"};
  border-radius: 10px;

  &:hover {
    background-color: ${(props) => !props.active && "rgba(0, 0, 0, 0.1)"};
  }
  background-color: ${(props) => props.active && "#fff"};
`;

const Span = styled.span<MenuItemProps>`
  font-size: 1rem;
  margin-right: 1rem;
  padding-bottom: 0.7rem;
`;

const Title = styled.h1<MenuItemProps>`
  font-size: 0.9rem;
  font-weight: 400;
  color: ${(props) => (props.active ? "#302C40" : "#AAA5A5")};
`;

const MenuLink = (props: MenuItemProps) => {
  const { title, active, icon, onClick } = props;

  return (
    <Container
      active={active}
      onClick={() => {
        if (onClick) {
          console.log("TITLE: ", title, active);

          onClick(title!);
        }
      }}
    >
      <Span>{icon}</Span>

      <Title active={active}>{title}</Title>
    </Container>
  );
};

export default MenuLink;
