import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the Dragonvite title in the navbar', () => {
    render(<App />);
    expect(screen.getByText('Dragonvite')).toBeInTheDocument();
  });

  it('renders the home page content', () => {
    render(<App />);
    expect(screen.getByText('Welcome to Dragonvite')).toBeInTheDocument();
  });
});
