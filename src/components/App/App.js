import React  from 'react';
import NavBar from '../NavBar';
import Shop from '../Shop';
import Cart from '../Cart';
import ProductDetail from '../ProductDetail';
import Checkout from '../Checkout';
import Login from '../Login';
import Logout from '../Logout';
import OrderRegistered from '../OrderRegistered';
import LK from '../LK';
import Register from '../Register';
import { ContextProvider } from '../GeneralContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';

const App = () => (
  <ContextProvider>
    <BrowserRouter>
      <NavBar />
      <div className="app">
        <Switch>
          <Route path="/" exact component={Shop} />
          <Route path="/cart" component={Cart} />
          <Route path="/category/:category" component={Shop} />
          <Route path="/product/:name" component={ProductDetail} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path="/orderRegistered" component={OrderRegistered} />
          <Route path="/LK" component={LK} />
        </Switch>
      </div>
    </BrowserRouter>
  </ContextProvider>
)


//TODO: checkout page, server-side rendering, auth/account

export default App;
 