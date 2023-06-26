import * as router from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';

import ContactWrapper from './containers/ContactWrapper';

const navigate = jest.fn();

const initialState = { common: { showLoader: false, showModal: false } };
const mockStore = configureStore();
let store;

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

test('renders contact apps title', () => {
  store = mockStore(initialState);
  render(<Provider store={store}><ContactWrapper /></Provider>);
  const linkElement = screen.getByText(/contact apps/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders add new button', () => {
  store = mockStore(initialState);
  render(<Provider store={store}><ContactWrapper /></Provider>);
  const buttonAdd = screen.getByText(/add new contact/i);
  expect(buttonAdd).toBeInTheDocument();
});

test('renders footer', () => {
  store = mockStore(initialState);
  render(<Provider store={store}><ContactWrapper /></Provider>);
  const footerText = screen.getByText(/Hegi Tri Saputra - 2023/i);
  expect(footerText).toBeInTheDocument();
});

test('renders table list contact', () => {
  store = mockStore(initialState);
  render(<Provider store={store}><ContactWrapper /></Provider>);
  const tableList = screen.getByTestId('table-list');
  expect(tableList).toBeInTheDocument();
});
