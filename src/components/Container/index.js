import React from "react";
import { Switch, Route, withRouter }      from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Shop            from '../Shop';
import Cart            from '../Cart';
import ProductDetail   from '../ProductDetail';
import Checkout        from '../Checkout';
import Login           from '../Login';
import Logout          from '../Logout';
import OrderRegistered from '../OrderRegistered';
import LK              from '../LK';
import Register        from '../Register';
import './style.scss'

const Container = ({ location }) => {
  return (
    <div className="app">
        <TransitionGroup className="transition-group">
            <CSSTransition
                key={location.key}
                timeout={{ enter: 300, exit: 300 }}
                classNames="fade">
                <section className="route-section">
                    <Switch location={location}>
                        <Route path="/" exact             component={Shop} />
                        <Route path="/category/:category" component={Shop} />
                        <Route path="/product/:name"      component={ProductDetail} />
                        <Route path="/cart"               component={Cart} />
                        <Route path="/checkout"           component={Checkout} />
                        <Route path="/orderRegistered"    component={OrderRegistered} />
                        <Route path="/register"           component={Register} />
                        <Route path="/login"              component={Login} />
                        <Route path="/logout"             component={Logout} />
                        <Route path="/LK"                 component={LK} />
                    </Switch>
                </section>
            </CSSTransition>
      </TransitionGroup>        
    </div>
  );
}

export default withRouter(Container);
