import React from "react";
import logo from "assets/images/logo_text.svg";
import Style from "./style";
import { ImFacebook } from "react-icons/im";
import { ImTwitter } from "react-icons/im";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
export const Footer = () => {
  return (
    <Style>
      <div className="site-footer -flex align-items-center ">
        <p>
          <div className="container">
            <div className="footer__logo">
              <img src={logo} alt="logo" />
            </div>

            <div className="footer_content">
              <p>
                Betheheroes.com <i>BE COME A HERO</i> is a website that helps
                connect us together
              </p>
              <button>Contact Us</button>

              <ul className="social-icons">
                <li>
                  <a className="facebook" href="#">
                    <ImFacebook />
                  </a>
                </li>
                <li>
                  <a className="twitter" href="#">
                    <ImTwitter />
                  </a>
                </li>
                <li>
                  <a className="github" href="#">
                    <FiGithub />
                  </a>
                </li>
                <li>
                  <a className="linkedin" href="#">
                    <FaLinkedinIn />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </p>
        <div className="wave">
          <svg
            className="wave-box"
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
          >
            <path
              className="wave-border"
              d="M0.00,49.99 C150.00,150.00 349.20,-49.99 500.00,49.99 L500.00,150.00 L0.00,150.00 Z"
            ></path>
          </svg>
          <p className="wave-content">@ 2022 All Rights Reserved </p>
        </div>
      </div>
    </Style>
  );
};
