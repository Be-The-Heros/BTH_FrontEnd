import styled from 'styled-components';

export default styled.div`
  .invite_chat-box {
    background-color: #fff;
    min-height: 200px;
    width: 400px;
    border-radius: 30px;
    box-shadow: 1px 1px 2px rgb(0 0 0 / 20%);
    text-align: center;
    padding: 1rem;
    &__name {
      font-weight: bold;
      font-size: 1.5rem;
    }
    &__avatar {
      img {
        border-radius: 50%;
        height: 100px;
        width: 100px;
        object-fit: cover;
      }
    }
  }
`;
