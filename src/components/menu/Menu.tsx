import React, { CSSProperties } from "react";

import menuConfig from "./config";
import { Provider } from "./Context";

const Menu: React.FC = ({ children }) => {
  const heightStyles: CSSProperties = {
    height: menuConfig.height,
    minHeight: menuConfig.height,
    maxHeight: menuConfig.height
  };

  return (
    <Provider data-test="provider">
      <ul className="menu" data-test="menu" style={heightStyles}>
        {children}
      </ul>
    </Provider>
  );
};

export default Menu;
