import create from "zustand";

const useHasVerifiedState = create<{ hasVerified: boolean; setHasVerified: (v: boolean) => void }>((set) => ({
  hasVerified: false,
  setHasVerified: (v: boolean) => set({ hasVerified: v }),
}));

export const useHasVerified = () => {
  return useHasVerifiedState((state) => ({
    hasVerified: state.hasVerified,
    setHasVerified: state.setHasVerified,
  }));
};
