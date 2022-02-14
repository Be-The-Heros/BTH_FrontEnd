import styled from 'styled-components';

export default styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(to left, var(--primary) 50%, #ffff 50%);
  .logo {
    position: absolute;
    top: 1em;
    left: 0;
    width: 15em;
    img {
      min-width: 100%;
      min-height: 100%;
    }
  }
  .plugin {
    padding-top: 2em;
    &-google,
    &-facebook {
      background-color: var(--bg-plugin);
      padding: 0.5em 1em;
      border-radius: 0.35em;
      box-shadow: 0px 4px 19px rgba(119, 147, 65, 0.3);
      cursor: pointer;
      &:hover {
        background-color: var(--primary-light);
        color: var(--white);
      }
    }
    &-facebook {
      background-color: var(--background-dark);
      img {
        margin: 0 !important;
      }
    }
    &-icon {
      width: 1.25em;
      margin-right: 0.5em;
    }
  }
`;
