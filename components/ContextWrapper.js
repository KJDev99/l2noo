"use client";

import Global from "../contexts/global"; // Absolute path emas, nisbiy yo‘l
import { useState } from "react";

function ContextWrapper({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Global.Provider value={{ mobileOpen, setMobileOpen }}>
      {children}
    </Global.Provider>
  );
}

export default ContextWrapper;
