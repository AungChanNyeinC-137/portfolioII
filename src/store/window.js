import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const resetWindowState = (win) => {
  win.isMinimized = false;
  win.isMaximized = false;
  win.position = null;
  win.size = null;
  win.previousPosition = null;
  win.previousSize = null;
};

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if(!win) return;
        win.isOpen = true;
        win.isMinimized = false;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if(!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
        resetWindowState(win);
      }),
    minimizeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isMinimized = true;
        win.zIndex = INITIAL_Z_INDEX;
      }),
    restoreWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.isMinimized = false;
        win.zIndex = state.nextZIndex++;
      }),
    focusWindow: (windowKey) => set((state) => {
        const win = state.windows[windowKey];
        if (!win || !win.isOpen || win.isMinimized) return;
        win.zIndex = state.nextZIndex++;
    }),
    maximizeWindow: (windowKey, bounds, previousBounds) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isMaximized = true;
        win.isMinimized = false;
        win.position = bounds.position;
        win.size = bounds.size;
        win.previousPosition = previousBounds.position;
        win.previousSize = previousBounds.size;
        win.zIndex = state.nextZIndex++;
      }),
    restoreMaximizedWindow: (windowKey, bounds = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isMaximized = false;
        win.position = bounds?.position ?? win.previousPosition;
        win.size = bounds?.size ?? win.previousSize;
        win.previousPosition = null;
        win.previousSize = null;
        win.zIndex = state.nextZIndex++;
      }),
  })),
);
export default useWindowStore;
