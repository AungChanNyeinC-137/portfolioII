import { locations } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useLocationStore = create(
  immer((set) => ({
    finderActiveLocation: locations.work,
    photosActiveLocation: null,

    setFinderActiveLocation: (location) =>
      set((state) => {
        state.finderActiveLocation = location;
      }),

    setPhotosActiveLocation: (location) =>
      set((state) => {
        state.photosActiveLocation = location;
      }),

    resetFinder: () =>
      set((state) => {
        state.finderActiveLocation = locations.work;
      }),

    resetPhotos: (defaultLocation) =>
      set((state) => {
        state.photosActiveLocation = defaultLocation;
      }),
  }))
);

export default useLocationStore;