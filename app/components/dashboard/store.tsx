import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

interface DataState {
  view: {
    job: {
      create: "editor" | "form";
    };
  };
  setView: (view: DataState["view"]) => void;
}

export function DashboardProvider({ children }: PropsWithChildren) {
  const [store] = useState(() =>
    createStore<DataState>()(
      immer((set) => ({
        view: {
          job: {
            create: "form",
          },
        },
        setView: (view) =>
          set((state) => {
            state.view = view;
          }),
      })),
    ),
  );

  return (
    <DashboardContext.Provider value={store}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard hook must be used within a DashboardProvider",
    );
  }

  return useStore(context, (state) => state);
}

const DashboardContext = createContext<DashboardContextType>(undefined);
type DashboardContextType = StoreApi<DataState> | undefined;
