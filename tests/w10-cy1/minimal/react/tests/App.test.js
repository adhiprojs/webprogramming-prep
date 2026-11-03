import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

// Test that the heading renders correctly
test('renders_the_heading', () => {
  render(<App />);
  const heading = screen.getByText(/Crop Management System/i);
  expect(heading).toBeInTheDocument();
});

// Test that the search bar label renders correctly
test('renders_the_search_bar_label', () => {
  render(<App />);
  const searchBarLabel = screen.getByText(/Search by Crop Name/i);
  expect(searchBarLabel).toBeInTheDocument();
});

// Test that the crop list renders "Tomato"
test('renders_tomato', () => {
  render(<App />);
  const crop = screen.getByText(/Tomato/i);
  expect(crop).toBeInTheDocument();
});

// Test that the crop list renders "Apple"
test('renders_apple', () => {
  render(<App />);
  const crop = screen.getByText(/Apple/i);
  expect(crop).toBeInTheDocument();
});

// Test search functionality for "Tomato"
test('search_works_for_tomato', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search crops/i);
  
  // Simulate typing "Tomato" in the search bar
  fireEvent.change(searchInput, { target: { value: 'Tomato' } });
  
  // Check that "Tomato" is in the document
  const crop = screen.getByText(/Tomato/i);
  expect(crop).toBeInTheDocument();
  
  // Check that "Apple" is not in the document
  const otherCrop = screen.queryByText(/Apple/i);
  expect(otherCrop).not.toBeInTheDocument();
});

// Test search functionality for "Apple"
test('search_works_for_apple', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search crops/i);

  // Simulate typing "Apple" in the search bar
  fireEvent.change(searchInput, { target: { value: 'Apple' } });

  // Check that "Apple" is in the document
  const crop = screen.getByText(/Apple/i);
  expect(crop).toBeInTheDocument();

  // Check that "Tomato" is not in the document
  const otherCrop = screen.queryByText(/Tomato/i);
  expect(otherCrop).not.toBeInTheDocument();
});

// Test search functionality for "Carrot"
test('search_works_for_carrot', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search crops/i);

  // Simulate typing "Carrot" in the search bar
  fireEvent.change(searchInput, { target: { value: 'Carrot' } });

  // Check that "Carrot" is in the document
  const crop = screen.getByText(/Carrot/i);
  expect(crop).toBeInTheDocument();

  // Check that "Banana" is not in the document
  const otherCrop = screen.queryByText(/Banana/i);
  expect(otherCrop).not.toBeInTheDocument();
});

