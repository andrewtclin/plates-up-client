import React, { createContext, useContext, useState } from "react";

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [font, setFont] = useState("standard");

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => useContext(FontContext);
