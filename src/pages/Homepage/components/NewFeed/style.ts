import { Button } from 'antd';
import styled from 'styled-components';

export default styled.div`
  background-color: var(--white);
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.75rem;
  
  .Newfeed_head {
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
  .Newfeed_body {
    
    
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
  .Newfeed_footer {
    margin: 1.5rem 0;
    display: flex;
    justify-content: space-around;
    Button{
      color: var(--black) ;
    }
  }
`;
