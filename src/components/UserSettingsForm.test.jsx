import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UserSettingsForm from './UserSettingsForm';

describe('UserSettingsForm Component', () => {
  it('renders all form fields correctly', () => {
    render(<UserSettingsForm />);

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Settings/i })).toBeInTheDocument();
  });

  it('displays validation errors when inputs are invalid', async () => {
    render(<UserSettingsForm />);

    const emailInput = screen.getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitBtn = screen.getByRole('button', { name: /Save Settings/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('submits form successfully with valid data', async () => {
    render(<UserSettingsForm />);

    const submitBtn = screen.getByRole('button', { name: /Save Settings/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Settings updated successfully/i);
    });
  });
});