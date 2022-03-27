import styled from "styled-components";

export default styled.div`
    .comment_create{
      display: flex ;
      margin: 1rem 0 ;
      img {
        align-content: center;
        width: 3.75em;
        height: 3.75em;
        border-radius: 50%;
        border: 1px solid #ffff;
      }
      &_input{
        height: 2.75rem;
        margin:0.3rem 0.5rem;
        width: 450px;
        word-wrap: break-word ;
        overflow:hidden ;
      }
      &_submit{
          background-color: var(--primary) ;
          margin: 0.3rem ;
      }
    }
`