import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('String Calculator', () => {
  test('renders the calculator', () => {
    render(<App />);
    expect(screen.getByText(/String Calculator/i)).toBeInTheDocument();
    expect(screen.getByText(/Enter Numbers/i)).toBeInTheDocument();
    expect(screen.getByTestId('format-p-element')).toBeInTheDocument();
    expect(screen.getByTestId('format-span-element')).toBeInTheDocument();
    expect(screen.getByTestId('text-input-element')).toBeInTheDocument();
    expect(screen.getByText(/Calculate/i)).toBeInTheDocument();
    expect(screen.queryByTestId('result-element')).not.toBeInTheDocument();
  });

  test('calculates the sum of input numbers', () => {
    render(<App />);
    
    const input = screen.getByTestId('text-input-element');
    const button = screen.getByRole('button', { name: /Calculate/i });

    // Test with comma-separated values
    fireEvent.change(input, { target: { value: '1,2,3' } });
    fireEvent.click(button);
    expect(screen.getByText(/Result: 6/i)).toBeInTheDocument();
  });

  test('calculates when empty string', () => {
    render(<App />);
    
    const input = screen.getByTestId('text-input-element');
    const button = screen.getByRole('button', { name: /Calculate/i });

    // Test with comma-separated values
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);
    expect(screen.queryByTestId('result-element')).not.toBeInTheDocument();
  });

  test("throws error when input contains non-numeric characters", () => {
    render(<App />);
    const input = screen.getByTestId('text-input-element');
    const button = screen.getByRole('button', { name: /Calculate/i });
    fireEvent.change(input, { target: { value: '1,a,3' } });
    fireEvent.click(button);
    expect(screen.getByText(/Result: Invalid input: Only comma-separated numbers are allowed./i)).toBeInTheDocument();
    
  });

  test("throws error when input contains special characters", () => {
    render(<App />);
    const input = screen.getByTestId('text-input-element');
    const button = screen.getByRole('button', { name: /Calculate/i });
    fireEvent.change(input, { target: { value: '1,2$3' } });
    fireEvent.click(button);
    expect(screen.getByText(/Result: Invalid input: Only comma-separated numbers are allowed./i)).toBeInTheDocument();
  });

});
