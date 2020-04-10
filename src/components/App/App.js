import React  from 'react';
import NavBar from '../NavBar';
import Shop from '../Shop';
import Cart from '../Cart';
import { ProductsProvider } from '../ProductsContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';

function App() {

  return (
    <BrowserRouter>
      <ProductsProvider>
        <NavBar />
        <div className="app">
          <Switch>
            <Route path="/" exact component={Shop} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </div>
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
 