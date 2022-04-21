import styled from "styled-components";
export default styled.div`
  background-color: var(--white);
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.75rem;
`
export const ReuseStyle = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  //box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
export const UsersContainer = styled(ReuseStyle)`
  padding: 1em 1em;
  padding-bottom: 0.5em;

  .user-container__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
    
    button{
        background-color: #dee2e6;
        color: var(--black);
        width: 100%;
        font-weight:bold;
    }
    }
`;

export const User = styled.div`
  position: relative;
  border: 0.2px solid rgba(0, 0, 0, 0.3);
  margin-bottom: 2em;
  border-radius: 10px;
  background: #ffffff;

  .follow__user {
    position: absolute;
    top: 1.5em;
    right: 1em;
    font-weight: 400;
    line-height: 28px;
    width: 9em;

    /* Dark 70 */
    color: rgba(0, 0, 0, 0.7);
  }
  button {
        background-color: var(--primary);
        color: var(--black);
        width: 100%;
    }
  .user__location {
    display: flex;
    flex-direction: row;
    align-items: center;

    &__icon {
      width: 15px;
      height: 15px;
      margin-right: 2px;
    }

    &__address {
      font-weight: 200;
      letter-spacing: 0em;
    }
  }
`;
