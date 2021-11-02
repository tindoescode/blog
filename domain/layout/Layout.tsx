import React, { ReactChild, ReactChildren } from "react";
import AdminNav from "../admin/AdminNav";
import Player from "../youtube-player/Player";

// Components
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: ReactChild | ReactChildren;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <AdminNav />

      <div className="max-w-6xl mx-auto">
        <Header />

        <div className="my-1">{children}</div>

        <Footer />
      </div>
      {/* <Player /> */}
    </>
  );
};

export default Layout;
