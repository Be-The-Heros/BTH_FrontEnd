import styled from 'styled-components';
export default styled.div`
  background-color: #ffff;
  padding: 0.5em 5em;
  box-shadow: 1px 1px 2px rgb(0 0 0 / 20%);
  border-bottom: 1px solid #f2f2f2;
  position: fixed;
  width: 100%;
  z-index: 999;
  .header {
    &__logo {
      height: 3.25em;
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
        width: 3em;
        border-radius: 50%;
        border: 1px solid #ffff;
        cursor: pointer;
        height: 3em;
      }
      svg {
        font-size: 1.75em;
        cursor: pointer;
      }
    }
    &__create-post,
    &__btn-login {
      button {
        background-color: var(--primary);
        color: var(--black);
      }
    }
    &__btn-register {
      button {
        background-color: var(--bg-main);
      }
    }
  }
`;
