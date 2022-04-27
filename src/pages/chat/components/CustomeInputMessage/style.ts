import styled from "styled-components";

export const CustomeFormInputMessStyle = styled.div`
  .textMessage {
    &_form {
      display: "flex";
      flex-direction: "row";
      justify-content: "space-around";
      button {
        border: "none";
        background: "#f0f2f5";
      }
      .ant-input-affix-wrapper {
        border: 1px solid #d9d9d9;
        border-radius: 15px;
      }
    }
  }
`;
