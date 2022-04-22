/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from '@testing-library/react';
import App from './App';
import Nav from './components/Nav/Nav';

test('check city heading null', () => {
  render(<App />);
  expect(screen.queryByTestId('cityHeading')).toBeNull();
});

test('check cityList in the document', () => {
  render(<Nav />);
  const cityList= screen.getByTestId('cityList');
  expect(cityList).toBeInTheDocument();
});

test('check cityName length', () => {
  const {container } = render(<Nav />);
  const cityNames = container.querySelectorAll('.cityName');
  expect(cityNames).toHaveLength(7);
});

test('check cityName Sydney', () => {
  render(<Nav />);
  const cityName = screen.getByText('Sydney');
  expect(cityName).toBeInTheDocument();  
});





