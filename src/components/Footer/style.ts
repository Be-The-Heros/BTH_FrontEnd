import styled from "styled-components";
export default styled.div`
  .site-footer {
    justify-content: center;
    background-color: #fff;
    width: 100%;
    padding: 20px 0 0;
    font-size: 15px;
    line-height: 24px;
    color: #737373;
    position: relative;
    .container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 100%;
    }
    .footer_content {
      width: "100%";
      display: "flex";
      flex-direction: "column";
      justify-content: "center";
    }
    p {
      text-align: center;
    }
    button {
      padding-bottom: 0px;
      border: none;
      border-radius: 20px;
      background-color: #08f;
      height: 34px;
      width: 15%;
      color: #fffdf0;
    }
    a {
      color: #737373;
    }
    a:hover {
      color: #3366cc;
      text-decoration: none;
    }
    .social-icons a {
      width: 40px;
      height: 40px;
      line-height: 40px;
      margin-left: 6px;
      margin-right: 0;
      border-radius: 100%;
      background-color: white;
    }
    .wave {
      height: 150px;
      overflow: hidden;
    }
    .wave-box {
      height: 100%;
      width: 100%;
    }
    .wave-border {
      stroke: none;
      fill: #08f;
      z-index: 99;
    }
    .wave-content {
      position: absolute;
      margin-bottom: 2px;
      bottom: 0px;
      right: 43.5%;
      text-align: center;
      color: #fffdf0;
      opacity: 0.7;
      font-size: 14px;
    }
    .footer__logo {
      width: 100%;
      img {
        border-radius: 15px;
        width: 12%;
      }
      padding: 20px;
    }
  }
  .social-icons {
    padding-left: 0;
    margin-bottom: 0;
    margin-top: 20px;
    list-style: none;
    display: flex;
    justify-content: center;
    li {
      display: inline-block;
      margin-bottom: 2px;
      box-shadow: 6px 4px 5px #e0e0e0;
      border-radius: 30px;
    }
    a {
      background-color: #eceeef;
      color: #818a91;
      font-size: 16px;
      display: inline-block;
      line-height: 44px;
      width: 44px;
      height: 44px;
      text-align: center;
      margin-right: 8px;
      border-radius: 100%;
      -webkit-transition: all 0.2s linear;
      -o-transition: all 0.2s linear;
      transition: all 0.2s linear;
    }
    a:active,
    a:focus,
    a:hover {
      color: #fff;
      background-color: #29aafe;
    }
    a.facebook:hover {
      background-color: #3b5998;
    }
    a.twitter:hover {
      background-color: #00aced;
    }
    a.linkedin:hover {
      background-color: #007bb6;
    }
    a.github:hover {
      background-color: black;
    }
  }

  .social-icons.size-sm a {
    line-height: 34px;
    height: 34px;
    width: 34px;
    font-size: 14px;
  }
`;
