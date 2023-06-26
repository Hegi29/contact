import * as router from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';

import ContactWrapper from './containers/ContactWrapper';
import FormContact from './containers/FormContact';

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

test('contact form', () => {
  store = mockStore(initialState);
  render(<Provider store={store}><FormContact /></Provider>);

  const fieldFirstName = screen.getByLabelText('First Name');
  const fieldLastName = screen.getByLabelText('Last Name');
  const fieldAge = screen.getByLabelText('Age');
  const fieldPhoto = screen.getByLabelText('URL Photo');

  expect(fieldFirstName).toBeInTheDocument();
  expect(fieldLastName).toBeInTheDocument();
  expect(fieldAge).toBeInTheDocument();
  expect(fieldPhoto).toBeInTheDocument();
});

test('add new contact', () => {
  store = mockStore(initialState);
  render(<Provider store={store}><FormContact /></Provider>);

  const fieldFirstName = screen.getByLabelText('First Name');
  const fieldLastName = screen.getByLabelText('Last Name');
  const fieldAge = screen.getByLabelText('Age');
  const fieldPhoto = screen.getByLabelText('URL Photo');
  const buttonSave = screen.getByText(/save/i);

  fireEvent.change(fieldFirstName, { target: { value: 'john' } });
  fireEvent.change(fieldLastName, { target: { value: 'doe' } });
  fireEvent.change(fieldAge, { target: { value: '20' } });
  fireEvent.change(fieldPhoto, { target: { value: '-' } });

  expect(fieldFirstName).toHaveDisplayValue("john");
  expect(fieldLastName).toHaveDisplayValue("doe");
  expect(fieldAge).toHaveDisplayValue("20");
  expect(fieldPhoto).toHaveDisplayValue("-");

  fireEvent.click(buttonSave);

  setTimeout(() => {
    const confirm = screen.getByText(/confirmation/i);
    expect(confirm).toBeInTheDocument();
    const buttonYes = screen.getByText(/yes/i);
    expect(buttonYes).toBeInTheDocument();
    fireEvent.click(buttonYes);

    setTimeout(() => {
      const infoSuccess = screen.getByText(/Successully added, this message will disappear in 2 seconds/i);
      expect(infoSuccess).toBeInTheDocument();
    }, 2000)
  }, 2000)
});
