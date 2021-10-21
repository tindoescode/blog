import React, { ReactChild, ReactChildren } from "react";

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
    </div>
  );
};

export default Layout;
