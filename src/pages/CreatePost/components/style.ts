import styled from 'styled-components';

export default styled.div`
  --transition-func: cubic-bezier(0.17, 0.67, 0.5, 0.71);
  position: relative;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
  animation-timing-function: var(--transition-func);
`;
