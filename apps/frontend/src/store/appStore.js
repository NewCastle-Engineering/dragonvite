import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
export const useAppStore = create()(immer((set) => ({
    isLoading: false,
    error: null,
    setLoading: (loading) => set((state) => {
        state.isLoading = loading;
    }),
    setError: (error) => set((state) => {
        state.error = error;
    }),
})));
