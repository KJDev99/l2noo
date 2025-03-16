import { createContext, useContext, useState } from "react";

// Global kontekst yaratamiz
const GlobalContext = createContext();

// Provider komponent
export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState(null);

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Contextni osonroq ishlatish uchun hook
export const useGlobal = () => {
  return useContext(GlobalContext);
};

export default GlobalContext;
