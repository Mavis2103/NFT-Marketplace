import React from "react";

import "../styles/globals.css";

const Init = ({ Component, Props }) => {
  return (
    <div>
      Header
      <Component {...Props} />
      Footer
    </div>
  );
};

export default Init;
