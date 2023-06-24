import {
  Routes,
  Route,
} from 'react-router-dom';
import "@fontsource/nunito";

import ContactWrapper from './containers/ContactWrapper';
import DetailContact from './containers/DetailContact';
import FormContact from './containers/FormContact';
import { APP_NAME } from './constants';

function App() {
  document.title = APP_NAME;

  return (
    <Routes>
      <Route path='/' element={<ContactWrapper />}></Route>
      <Route path='/edit' element={<DetailContact />}></Route>
      <Route path='/add' element={<FormContact />}></Route>
    </Routes>
  );
}

export default App;
