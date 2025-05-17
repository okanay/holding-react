import { Editor } from "@tiptap/react";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useEditor } from "./config";

declare global {
  type TiptapViewMode = "editor" | "preview" | "json" | "html";
}

type Props = PropsWithChildren & {
  initialContent?: string;
};

interface DataState {
  editor: Editor;
  view: {
    mode: TiptapViewMode;
    setMode: (mode: TiptapViewMode) => void;
  };
}

const TiptapContext = createContext<TiptapContextType>(undefined);

type TiptapContextType = StoreApi<DataState> | undefined;

export function TiptapProvider({ children, initialContent = "" }: Props) {
  const editor = useEditor(initialContent);

  const [store] = useState(() =>
    createStore<DataState>()(
      immer((set, get) => ({
        editor,
        view: {
          mode: "editor",
          setMode: (mode: TiptapViewMode) =>
            set((state) => {
              state.view.mode = mode;
            }),
        },
      })),
    ),
  );

  return (
    <TiptapContext.Provider value={store as StoreApi<DataState>}>
      {children}
    </TiptapContext.Provider>
  );
}

export const useTiptapContext = () => {
  const context = useContext(TiptapContext);

  if (!context) {
    throw new Error(
      "useTiptapContext hook must be used within an TiptapProvider",
    );
  }

  const editor = useStore(context, (state) => state);
  return editor;
};
