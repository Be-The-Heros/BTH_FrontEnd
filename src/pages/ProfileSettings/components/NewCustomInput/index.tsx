import React from "react";
import styled from "styled-components";
import { Input } from "antd";

interface NewsCustomInput {
  label?: string;
  placeholder?: string;
  className?: string;
}

const Container = styled.div`
  label {
    font-weight: 400;
    line-height: 33px;
    letter-spacing: 0em;
    margin-bottom: 3px;
  }

  input {
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 10px;
  }
`;

const NewCustomInput = (props: NewsCustomInput) => {
  const { label, placeholder, className } = props;
  return (
    <Container className={className}>
      <label>{label}</label>
      <Input placeholder={placeholder} />
    </Container>
  );
};

export default NewCustomInput;
