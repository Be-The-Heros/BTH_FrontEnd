import { Button } from 'antd';
import styled from 'styled-components';

export default styled.div`
  background-color: var(--white);
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.75rem;
  
  .postDetail_head {
    display: flex;
    justify-content: space-between;

    &_info {
      display: flex;
      text-decoration: none ;
      color: var(--black);
      img {
        align-content: center;
        width: 4.75em;
        height: 4.75em;
        border-radius: 50%;
        border: 1px solid #ffff;
      }
      &_detail {
        margin-left: 1rem;
        margin-top:0.75rem ;
        &_locate {
          display: flex;
          margin-top: 5px;
          margin-left: -4px;
        }
      }
    }

    &_join {
      Button {
        background-color: var(--primary);
        color: var(--black);
        margin-bottom: 1em;
        width: 100% ;
      }
      p{
        text-align: center ;
        
      }
    }
  }
  .postDetail_body {
    
    
    text-decoration: none;
    color: var(--black) ;
    margin-bottom: 3rem;
    h3 {
      text-align: center;
    }
    &_title {
      display: flex;
      margin: 1em 0;
      .name {
        margin-top: 5px;
      }
      p {
        text-align: center;
        margin-left: 10px;
        color: var(--dark);
        font-size: 1.2rem;
      }
    }
    &_content {
      font-size: 1rem;
    }
    &_photos {
      margin-top: 1rem;
      
    }
  }
  .postDetail_comment {
    margin: 1.5rem 0;
    
    
    &_display{
      p{
        margin: 0;
        color: var(--black);
        font-weight:bold ;
      }
      img {
        align-content: center;
        width: 3.75em;
        height: 3.75em;
        border-radius: 50%;
        border: 1px solid #ffff;
      }
      &_detail{
        display:flex ;
        margin-top: 1.5rem ;
        &_content{
          margin: 0 0.3rem;
          border-radius: 0.625rem;
          background-color: #f0f2f5 ;
          padding:0.3rem 0.5rem ;
        }
        
      }
      &_reply{
        display: flex;
        margin: 1.5rem 3.3rem;
        &_content{
          margin: 0 0.3rem;
          border-radius: 0.625rem;
          background-color: #f0f2f5 ;
          padding:0.3rem 0.5rem ;
        }
      }
      &_action{
        margin-left:4rem ;
        margin-top: 0.5rem;
        button{
          border: none;
          font-size: 0.75rem;
          margin:0 ;
          padding: 0;
          background-color:var(--white) ;
          box-shadow:none;
        }
        
        &_button :hover{
          button{
            background-color: var(--white) ;
          }
          
        }
      }
    }
  }
`;
