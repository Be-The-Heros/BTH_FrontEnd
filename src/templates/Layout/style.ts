import styled from 'styled-components';
import { DISTANCE_HEADER } from 'styles/distance';

export default styled.div`
  .td-layout {
    padding-top: ${DISTANCE_HEADER}rem;
    background-color: var(--bg-main);
    width: 100%;
    min-height: 100vh;
    padding-bottom: ${DISTANCE_HEADER}rem;
  }
`;
