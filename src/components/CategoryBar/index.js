import React, { useContext } from 'react';
import { Link }              from 'react-router-dom';
import uniqid                from 'uniqid';
import Category              from "../Category";
import { GeneralContext }    from '../GeneralContext';
import './style.scss';

const CategoryBar = () => {
    const products = useContext(GeneralContext).products;
    
    let categories = new Set();
    products.forEach(item => categories.add(item.category));
    categories = [...categories].map((item) => 
        <div key={uniqid()}>
            <Link to={`/category/${item}`} style={{textDecoration: "none"}}>
                <Category name={item} key={uniqid()} />
            </Link>
        </div>
    );
    
    return (
        <div className="category-bar">
            { categories }
        </div>
    );
}

export default CategoryBar;