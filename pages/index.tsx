import React from "react";
import { Card } from "../domain/post";
import styles from "../styles/Home.module.scss";

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
        <h2 className="">Tác giả</h2>
        <div className={styles.avatar}></div>
        <h3 className="font-semibold">Trung Tín</h3>
        <p className="text-sm text-center leading-6">
          ❝Mình là người nghiện màu xanh.❞
        </p>
      </div>
    </div>
  );
}
