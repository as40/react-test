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

  test('calculates the sum of input numbers separated with newline, comma, semicolon', () => {
    render(<App />);
    
    const input = screen.getByTestId('text-input-element');
    const button = screen.getByRole('button', { name: /Calculate/i });

    // Test with multiple delimiters values
    fireEvent.change(input, { target: { value: '//;\\n1;2' } });
    fireEvent.click(button);
    expect(screen.getByText(/Result: 3/i)).toBeInTheDocument();
  });

  test('calculates when empty string', () => {
    render(<App />);
    
    const input = screen.getByTestId('text-input-element');
    const button = screen.getByRole('button', { name: /Calculate/i });

    // Test with empty values
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
    expect(screen.getByText(/Invalid input: Only comma, semicolon, newline separated numbers are allowed./i)).toBeInTheDocument();
    
  });

  test("throws error when input contains special characters", () => {
    render(<App />);
    const input = screen.getByTestId('text-input-element');
    const button = screen.getByRole('button', { name: /Calculate/i });
    fireEvent.change(input, { target: { value: '1,2$3' } });
    fireEvent.click(button);
    expect(screen.getByText(/Invalid input: Only comma, semicolon, newline separated numbers are allowed./i)).toBeInTheDocument();
  });

  test("throws error when input contains negative numbers", () => {
    render(<App />);
    const input = screen.getByTestId('text-input-element');
    const button = screen.getByRole('button', { name: /Calculate/i });
    fireEvent.change(input, { target: { value: '//;\\n1;2;-1;-2' } });
    fireEvent.click(button);
    expect(screen.getByText(/Error: Negative numbers are not allowed -1,-2./i)).toBeInTheDocument();
  });

});
