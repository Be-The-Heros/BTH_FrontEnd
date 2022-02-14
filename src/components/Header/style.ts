import styled from 'styled-components';
export default styled.div`
  background-color: #ffff;
  padding: 0.5em 7em;
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
