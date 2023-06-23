import {
  Routes,
  Route,
} from 'react-router-dom';

import ContactWrapper from './containers/ContactWrapper';
import FormContact from './containers/FormContact';
import DetailContact from './containers/DetailContact';

function App() {
  return (<>
    <Routes>
      <Route path='/' element={<ContactWrapper />}></Route>
      <Route path='/add' element={<FormContact />}></Route>
      <Route path='/detail' element={<DetailContact />}></Route>
    </Routes>
  </>
  );
}

export default App;
