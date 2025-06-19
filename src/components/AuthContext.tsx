"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction
} from "react";

interface ToggleContextType {
  whatToggleIsVisible: number;
  setWhatToggleIsVisible: Dispatch<SetStateAction<number>>;
  toggleAction: () => void;
}

// Nom du contexte avec majuscule
const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

// Le Provider React commence par une majuscule
export function ToggleProvider({ children }: { children: ReactNode }) {
  const [whatToggleIsVisible, setWhatToggleIsVisible] = useState(0);

  const toggleAction = (): void => {
    if (whatToggleIsVisible === 1) setWhatToggleIsVisible(0);
    else setWhatToggleIsVisible(1);
  };

  return (
    <ToggleContext.Provider
      value={{ whatToggleIsVisible, setWhatToggleIsVisible, toggleAction }}
    >
      {children}
    </ToggleContext.Provider>
  );
}

// Hook personnalisé commence par "use"
export function useToggle() {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error("useToggle must be used within a ToggleProvider");
  }
  return context;
}
