import React from "react";

import { Provider } from "./Context";

const Menu: React.FC = ({ children }) => {
  return (
    <Provider data-test="provider">
      <ul className="menu" data-test="menu">
        {children}
      </ul>
    </Provider>
  );
};

export default Menu;
