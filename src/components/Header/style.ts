import styled from 'styled-components';
export default styled.div`
  background-color: #ffff;
  padding: 0.5em 5em;
  box-shadow: 0px 4px 19px rgba(119, 147, 65, 0.3);
  .header {
    &__logo {
      width: 4em;
      img {
        border-radius: 15px;
        border: 2px solid #ffff;
      }
    }
    &__search {
      margin-left: 2em;
      width: 60%;
    }
    &__notification {
      svg {
        font-size: 1.75em;
        margin: 0 0.45em;
        cursor: pointer;
      }
    }
    &__avatar {
      img {
        width: 2.75em;
        border-radius: 50%;
        border: 1px solid #ffff;
      }
      svg {
        font-size: 1.75em;
        cursor: pointer;
      }
    }
    &__create-post {
      button {
        background-color: var(--primary);
        color: #ffff;
      }
    }
  }
`;
