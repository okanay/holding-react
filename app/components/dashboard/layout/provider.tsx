import { useState, useEffect, createContext, useContext } from "react";

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
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);

  // Sayfa yüklendiğinde localStorage'dan panel durumunu al
  useEffect(() => {
    const savedState = localStorage.getItem("dashboardPanelExpanded");
    if (savedState !== null) {
      setIsPanelExpanded(savedState === "true");
    }
  }, []);

  // Panel durumunu değiştiren fonksiyon
  const togglePanel = () => {
    const newState = !isPanelExpanded;
    setIsPanelExpanded(newState);

    // Panel durumunu localStorage'a kaydet
    localStorage.setItem("dashboardPanelExpanded", newState.toString());

    // Özel event yayınla (diğer bileşenlerin dinleyebilmesi için)
    const event = new CustomEvent("dashboard-panel-toggle", {
      detail: { expanded: newState },
    });
    window.dispatchEvent(event);
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
