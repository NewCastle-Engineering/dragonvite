import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from './appStore';

describe('appStore', () => {
  beforeEach(() => {
    useAppStore.setState({ isLoading: false, error: null });
  });

  describe('setLoading', () => {
    it('sets isLoading to true', () => {
      useAppStore.getState().setLoading(true);
      expect(useAppStore.getState().isLoading).toBe(true);
    });

    it('sets isLoading to false', () => {
      useAppStore.setState({ isLoading: true });
      useAppStore.getState().setLoading(false);
      expect(useAppStore.getState().isLoading).toBe(false);
    });
  });

  describe('setError', () => {
    it('sets an error message', () => {
      useAppStore.getState().setError('Something went wrong');
      expect(useAppStore.getState().error).toBe('Something went wrong');
    });

    it('clears the error when set to null', () => {
      useAppStore.setState({ error: 'old error' });
      useAppStore.getState().setError(null);
      expect(useAppStore.getState().error).toBeNull();
    });
  });

  it('has correct initial state', () => {
    const state = useAppStore.getState();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });
});
