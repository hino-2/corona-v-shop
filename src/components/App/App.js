import React  from 'react';
import NavBar from '../NavBar';
import CategoryBar from '../CategoryBar';
import ProductList from '../ProductList';
import { ProductsProvider } from '../ProductsContext';
import './App.scss';

function App() {

  return (
    <ProductsProvider>
      <div className="app">
        <NavBar />
        <CategoryBar />
        <ProductList />
      </div>
    </ProductsProvider>
  );
}

export default App;
 