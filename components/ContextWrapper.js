import Global from "../contexts/global"; // Absolute path emas, nisbiy yo‘l
import { useEffect, useState } from "react";

function ContextWrapper({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(window.innerWidth < 768); // yoki kerakli shart
  }, []);

  return (
    <Global.Provider value={{ mobileOpen, setMobileOpen }}>
      {children}
    </Global.Provider>
  );
}

export default ContextWrapper;
