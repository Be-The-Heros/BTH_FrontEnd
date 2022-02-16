import styled from 'styled-components';

export default styled.div`
  background-color: var(--bg-main);
  min-height: 50em;
  display: flex;
  justify-content: space-around;

  /* align-items: center; */
  padding: 2% 5em;

  .sidebar-left,
  .sidebar-right {
    background-color: var(--white);
    min-height: 30em;
    width: 20em;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2em;
    padding: 1% 2%;
  }

  .main-content {
    background-color: var(--white);
    padding: 1% 2%;
    border-radius: 1em;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 50em;
  }
  @media (max-width: 1024px) {
    .sidebar-right {
      display: none !important;
    }
  }
`;