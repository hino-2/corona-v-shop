import React, { useContext } from 'react';
import uniqid from 'uniqid';
import Category from "../Category";
import { ProductsContext } from '../ProductsContext';
import './style.scss';

const CategoryBar = () => {
    const context = useContext(ProductsContext);
    // console.log('catbar', context);
    
    let categories = new Set();
    context.products.forEach(item => categories.add(item.category));
    categories = [...categories].map((item) => <div key={uniqid()}><Category name={item} key={uniqid()} /></div>);
    
    // console.log(categories);
    

    return (
        <div className="category-bar">
            {categories}
        </div>
    );
}

export default CategoryBar;