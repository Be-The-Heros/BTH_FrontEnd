import logo from "assets/images/logo_text.svg";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { ImFacebook, ImTwitter } from "react-icons/im";
import Style from "./style";
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
                <a href={"https://betheheros.tk/"}>Be the heroes</a>{" "}
                <i>BE COME A HERO</i> is a website that helps connect us
                together
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
            width="1920"
            height="147"
            viewBox="0 0 1920 147"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0L172.579 26.9263C226.931 35.4066 282.311 34.8593 336.485 25.3065L412.174 11.96C457.179 4.02414 503.059 2.29561 548.533 6.8227L674.676 19.3806C708.361 22.734 742.298 22.658 775.967 19.1538L894.204 6.84788C937.878 2.30244 981.96 3.5297 1025.31 10.498L1122.43 26.1076C1175.57 34.6497 1229.75 34.5544 1282.86 25.8253L1380.4 9.79426C1419.99 3.2884 1460.22 1.57039 1500.21 4.67729L1640.72 15.5915C1666.42 17.5883 1692.24 17.5938 1717.95 15.608L1920 0V148H0V0Z"
              fill="url(#paint0_linear_428_1865)"
              fillOpacity="0.8"
            />
            <defs>
              <linearGradient
                id="paint0_linear_428_1865"
                x1="0"
                y1="74"
                x2="1920"
                y2="74"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0052D4" />
                <stop offset="0.5" stopColor="#4364F7" />
                <stop offset="1" stopColor="#6FB1FC" />
              </linearGradient>
            </defs>
          </svg>

          <p className="wave-content">@ 2022 All Rights Reserved </p>
        </div>
      </div>
    </Style>
  );
};
