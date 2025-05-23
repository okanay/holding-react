import { useState, createContext, useContext } from "react";

// Context türünü tanımla
type ContextType = {
  isPanelExpanded: boolean;
  togglePanel: () => void;
};

// Context'i oluştur
const DashboardLayoutContext = createContext<ContextType | undefined>(
  undefined,
);

// DashboardLayoutProvider bileşeni
export const DashboardLayoutProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isPanelExpanded, setIsPanelExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768;
    }
    return false;
  });

  // Panel durumunu değiştiren fonksiyon
  const togglePanel = () => {
    setIsPanelExpanded(!isPanelExpanded);
  };

  return (
    <DashboardLayoutContext.Provider value={{ isPanelExpanded, togglePanel }}>
      {children}
    </DashboardLayoutContext.Provider>
  );
};

// DashboardLayout hook'u
export const useDashboardLayout = () => {
  const context = useContext(DashboardLayoutContext);

  if (context === undefined) {
    throw new Error(
      "useDashboardLayout must be used within a DashboardLayoutProvider",
    );
  }

  return context;
};
