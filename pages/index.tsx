import React from "react";
import { Card } from "../domain/post";
import styles from "../styles/Home.module.scss";
import Image from "next/image";

export default function Component() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 my-2">
      <div className="grid gap-1 md:col-span-2">
        <Card name="Bài viết đầu tiên" />
        <Card name="Bài viết đầu tiên" />
        <Card name="Bài viết đầu tiên" />
        <Card name="Bài viết đầu tiên" />
      </div>

      <div className={styles.info_wrapper}>
        <Image
          src="https://ucarecdn.com/2a59a3a6-231b-4642-8e0b-7c2ce95160cf/pexelsyogendrasingh5334185.jpg"
          layout="fill"
        />
        <h2>Tác giả</h2>
        <div className={styles.avatar}>
          <Image
            objectFit="cover"
            layout="fill"
            src="https://ucarecdn.com/e01a2f10-c961-47c4-b1af-e72945981c35/245426956_1499392753763807_1343181823774965097_n.jpg"
          />
        </div>
        <h3 className="font-semibold">Trung Tín</h3>
        <p className="text-sm text-center leading-6">
          ❝Mình là người nghiện màu xanh.❞
        </p>
      </div>
    </div>
  );
}
