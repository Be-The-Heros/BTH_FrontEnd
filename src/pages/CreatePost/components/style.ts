import styled from 'styled-components';

export default styled.div`
  --transition-func: cubic-bezier(0.17, 0.67, 0.5, 0.71);
  position: relative;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
  animation-timing-function: var(--transition-func);
  .note {
    font-weight: bold;
    position: relative;
    &_title {
      position: absolute;
      top: 4rem;
      background-color: var(--white);
      padding: 3% 4%;
      border-radius: 0.5rem;
    }
    &_address {
      position: absolute;
      top: 9rem;
      background-color: var(--white);
      padding: 3% 4%;
      border-radius: 0.5rem;
    }
    &_resident_address {
      position: absolute;
      top: 15rem;
      background-color: var(--white);
      padding: 3% 4%;
      border-radius: 0.5rem;
    }
    &_content {
      position: absolute;
      top: 21rem;
      background-color: var(--white);
      padding: 3% 4%;
      border-radius: 0.5rem;
    }
    &_chat {
      position: absolute;
      top: 25rem;
      background-color: var(--white);
      padding: 3% 4%;
      border-radius: 0.5rem;
    }
    &_photo {
      position: absolute;
      top: 33rem;
      background-color: var(--white);
      padding: 3% 4%;
      border-radius: 0.5rem;
    }
  }
`;
