import styled from "styled-components";

export const CustomChatHeaderStyle= styled.div`
  .header_message {
    display: "flex";
    flex-direction: row;
    justify-content: space-between;
    z-index: 9;
    background-color: white;
    border: "1px solid #d9d9d9";
    min-height: 4rem;

    &_info {
      display: "flex";
      flex-direction: row;
      justify-content: space-between;
      margin-top: auto;
      margin-left: 1em;
    }
  }
`;
