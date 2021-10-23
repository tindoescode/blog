import React, { ReactChild, ReactChildren } from "react";
import Player from "../domain/youtube-player/Player";

// Components
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: ReactChild | ReactChildren;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}

      <Footer />

      <Player />
    </div>
  );
};

export default Layout;
