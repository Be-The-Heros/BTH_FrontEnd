import styled from 'styled-components';
export default styled.div`
  background-color: var(--primary);
  padding: 0.5em 7em;
  .header {
    &__logo {
      width: 3em;
      img {
        border-radius: 15px;
      }
    }
    &__search {
      margin-left: 2em;
      width: 60%;
    }
    &__create-post {
      .btn--white {
        background-color: #fff;
        color: var(--dark);
        font-weight: 500;
        border-radius: 30px;
      }
    }
  }
`;
