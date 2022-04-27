import styled from "styled-components";

export const HeaderSideStyle = styled.div`
  .header {
    &_chat {
      margin: 1em;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      z-index: 9;
      h1 {
        font-size: 2rem;
      }
      &_icons {
        margin-top: -0.1rem;
        Button {
          font-size: 1.75rem;
          background-color: white;
          border: none;

          box-shadow: none;
        }
      }
    }
    &_search {
      margin: 1em; 
      .ant-input-group-addon{
        display: none;
      } 
      .ant-input-affix-wrapper{
        /* border: 0.1px solid; */
        border-radius: 15px;
      }
      .ant-input-search .ant-input-group .ant-input-affix-wrapper:not(:last-child) {
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
      }
    }
    
  }
`;
