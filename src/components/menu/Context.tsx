import React, { createContext, useState } from "react";

type State = {
  openedItem: string | null;
};

export type Context = State & {
  setOpenedItem: (item: string | null) => void;
};

const MenuContext = createContext<Context>({
  openedItem: null,
  setOpenedItem: () => {}
});

const ContextProvider: React.FC = ({ children }) => {
  const [openedItem, setOpenedItem] = useState<string | null>(null);
  const contextValue = { openedItem, setOpenedItem };

  return (
    <MenuContext.Provider value={contextValue} data-test="context">
      {children}
    </MenuContext.Provider>
  );
};

export const Provider = ContextProvider;

export default MenuContext;
