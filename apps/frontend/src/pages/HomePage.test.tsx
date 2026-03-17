import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the welcome heading', () => {
    render(<HomePage />);
    expect(screen.getByText('Welcome to Dragonvite')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<HomePage />);
    expect(
      screen.getByText(/production-ready monorepo scaffold/i)
    ).toBeInTheDocument();
  });

  it('renders a Get Started button', () => {
    render(<HomePage />);
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });

  it('renders a Learn More button', () => {
    render(<HomePage />);
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument();
  });
});
