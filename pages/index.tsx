import React from "react";
import { Card } from "../domain/post/Card";

export default function Component() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 my-2">
      <Card name="Bài viết đầu tiên anh dành cho em" />
      <Card name="Bài viết đầu tiên anh dành cho em" />
      <Card name="Bài viết đầu tiên anh dành cho em" />
      <Card name="Bài viết đầu tiên anh dành cho em" />
    </div>
  );
}
