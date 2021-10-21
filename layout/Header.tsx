import React, { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import useToggle from "../hooks/useToggle";

function Header() {
  const [menu, toggleMenu] = useToggle(false);

  return (
    <div className={styles.header}>
      <div
        className={`${styles.navigatorCollapse} ${
          menu ? styles.navigatorCollapse__active : ""
        }`}
      >
        <div
          onClick={() => toggleMenu()}
          className="absolute p-2 -top-3 -bottom-3 right-0 left-0 select-none z-10"
        />
      </div>
      <div className={styles.logo}>
        <h1>
          <Link href="/">Laputa</Link>
        </h1>
      </div>
      <nav className={`${styles.navigator} ${menu ? styles.menu_active : ""}`}>
        <ul className="flex-grow">
          <li>
            <a href="" data-tooltip="Về trang chủ">
              Home
            </a>
          </li>
          <li>
            <a href="">Blog</a>
          </li>
          <li>
            <a href="">About me</a>
          </li>
          <li>
            <a href="">Contact</a>
          </li>
        </ul>

        <div className="bg-black text-white rounded">
          <Link href="/api/auth/login">
            <a className="text-white flex gap-1 items-center">
              <LoginSvg />
              Đăng nhập
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
}

const LoginSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
    />
  </svg>
);
export default Header;
