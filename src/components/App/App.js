import React               from 'react';
import NavBar              from '../NavBar';
import Container           from '../Container';
import { ContextProvider } from '../GeneralContext';
import { BrowserRouter }   from 'react-router-dom';
import './App.scss';

const App = () => (
  <ContextProvider>
    <BrowserRouter>
      <div>
        <NavBar />
        <Container />
      </div>
    </BrowserRouter>
  </ContextProvider>
)

export default App;
 