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
    h3 {
      font-size: 1.25rem;
    }
    &_info {
      display: flex;
      text-decoration: none;
      color: var(--black);
      img {
        align-content: center;
        width: 4.75em;
        height: 4.75em;
        border-radius: 50%;
        border: 1px solid #ffff;
      }
      &_detail {
        margin-left: 0.5rem;
        margin-top: 0.25rem;
        &_locate {
          display: flex;
          margin-top: 0;
          margin-left: -4px;
        }
      }
    }

    &_join {
      Button {
        background-color: var(--primary);
        color: var(--black);
        margin-bottom: 1em;
        width: 100%;
      }
      p {
        text-align: center;
      }
    }
  }
  .Newfeed_body {
    text-decoration: none;
    color: var(--black);
    padding: 1rem 0;
    h3 {
      text-align: center;
    }
    &_title {
      display: flex;
      margin: 0.75em 0;
      .name {
        margin-top: 5px;
      }
      .text {
        text-align: left;
        color: var(--dark);
        font-size: 1rem;
      }
    }
    &_content {
      font-size: 1rem;
    }
    &_photos {
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;
    }
  }
  .Newfeed_footer {
    margin: 1.5rem 0;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
  }
  .menu-item {
    display: flex;
    justify-self: center;
    align-items: center;
    svg {
      margin-right: 10px;
    }
  }
  .ant-image {
    height: 100%;
    img {
      height: 100%;
    }
  }
`;
