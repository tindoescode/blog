import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className="order-last md:order-none">
        &copy;Laputa all right reserved.
      </div>
      <div className="">
        <h3>Contact</h3>
        <div className="flex flex-col">
          <Link href="/">
            <a className="flex items-center gap-1">
              <FacebookSvg /> Facebook
            </a>
          </Link>
          <Link href="/">
            <a className="flex items-center gap-1">
              <InstagramSvg />
              Instagram
            </a>
          </Link>
          <Link href="/">
            <a className="flex items-center gap-1">
              <LinkedinSvg />
              Linkedin
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

const FacebookSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    style={{ fill: "#000000" }}
  >
    {" "}
    <path d="M21,3H3v18h9.621v-6.961h-2.343v-2.725h2.343V9.309c0-2.324,1.421-3.591,3.495-3.591c0.699-0.002,1.397,0.034,2.092,0.105 v2.43h-1.428c-1.13,0-1.35,0.534-1.35,1.322v1.735h2.7l-0.351,2.725h-2.365V21H21V3z"></path>
  </svg>
);

const InstagramSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    className="w-5 h-5"
    viewBox="0 0 50 50"
    style={{ fill: "#000000" }}
  >
    <path d="M 16 3 C 8.8545455 3 3 8.8545455 3 16 L 3 34 C 3 41.145455 8.8545455 47 16 47 L 34 47 C 41.145455 47 47 41.145455 47 34 L 47 16 C 47 8.8545455 41.145455 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.054545 5 45 9.9454545 45 16 L 45 34 C 45 40.054545 40.054545 45 34 45 L 16 45 C 9.9454545 45 5 40.054545 5 34 L 5 16 C 5 9.9454545 9.9454545 5 16 5 z M 37 11 C 35.9 11 35 11.9 35 13 C 35 14.1 35.9 15 37 15 C 38.1 15 39 14.1 39 13 C 39 11.9 38.1 11 37 11 z M 25 14 C 18.954545 14 14 18.954545 14 25 C 14 31.045455 18.954545 36 25 36 C 31.045455 36 36 31.045455 36 25 C 36 18.954545 31.045455 14 25 14 z M 25 16 C 29.954545 16 34 20.045455 34 25 C 34 29.954545 29.954545 34 25 34 C 20.045455 34 16 29.954545 16 25 C 16 20.045455 20.045455 16 25 16 z"></path>
  </svg>
);

const LinkedinSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    className="w-5 h-5"
    viewBox="2 1 27 27"
    style={{ fill: "#000000" }}
  >
    {" "}
    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
  </svg>
);
export default Footer;
