import React from "react";
import { Card, Pagination } from "../domain/post";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import useToggle from "../hooks/useToggle";
import avatar from "../public/images/avatar.jpg";

export default function Component() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 my-2">
      <div className="grid gap-1 md:col-span-2">
        <h3 className={styles.title}>Bài viết</h3>
        <Card name="Bài viết đầu tiên" />
        <Card name="Bài viết đầu tiên" />
        <Card name="Bài viết đầu tiên" />
        <Card name="Bài viết đầu tiên" />

        <Pagination />
      </div>
      <div className="">
        <div className={styles.info_wrapper}>
          <Image
            src="https://ucarecdn.com/2a59a3a6-231b-4642-8e0b-7c2ce95160cf/pexelsyogendrasingh5334185.jpg"
            layout="fill"
          />
          <div className="w-32 h-32 relative hover:scale-105 transform transition-all duration-500">
            <Image
              className={styles.avatar}
              src={avatar}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="text-center">
            <h3 className="font-semibold">Trung Tín</h3>
            <p className="text-sm leading-6">
              ❝Mình là người nghiện màu xanh.❞
            </p>
          </div>
        </div>

        <div className="order-1 mt-4 p-2 bg-black bg-opacity-80 text-black flex flex-col gap-2">
          <h3 className="text-white">Liên hệ tôi</h3>
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full rounded p-2 outline-none"
          />
          <input
            type="text"
            placeholder="Email"
            className="w-full rounded p-2 outline-none"
          />
          <textarea
            className="w-full rounded-md p-2 outline-none"
            placeholder="Nội dung"
          />
          <button className="p-1 bg-lime-400 place-self-start px-10 rounded shadow-xl">
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
