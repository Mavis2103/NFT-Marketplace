import { Header, Footer } from "containers";
import React from "react";

import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

const Init = ({ Component, Props }) => {
  return (
      <div>
        <Header />
        <Component {...Props} />
        <Footer />
      </div>
  );
};

export default Init;
