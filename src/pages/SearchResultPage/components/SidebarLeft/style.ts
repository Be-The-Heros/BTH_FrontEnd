import styled from "styled-components";

export default styled.div`
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 0.5em;
    a {
      margin: 1.5rem;
      text-decoration: none;
      color: var(--black);
    }
    .div_all:hover,
    .div_posts:hover,
    .div_users:hover {
      box-shadow: 3px 3px 4px 2px #e0e0e0;
      border-radius: 8px;
      -moz-border-radius: 8px;
      -webkit-border-radius: 8px;
    }
    .div_all,
    .div_posts,
    .div_users {
      margin-bottom: 2em;
      margin-top: 0;
    }
    hr {
      color: black;
      margin-top: 0;
    }
  }
`;
