import React  from 'react';
import NavBar from '../NavBar';
import Shop from '../Shop';
import Cart from '../Cart';
import ProductDetail from '../ProductDetail';
import { ProductsProvider } from '../ProductsContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';

function App() {

  return (
    <ProductsProvider>
      <BrowserRouter>
        <NavBar />
        <div className="app">
          <Switch>
            <Route path="/" exact component={Shop} />
            <Route path="/cart" component={Cart} />
            <Route path="/category/:category" component={Shop} />
            <Route path="/product/:name" component={ProductDetail} />
          </Switch>
        </div>
      </BrowserRouter>
    </ProductsProvider>
  );
}

export default App;
 