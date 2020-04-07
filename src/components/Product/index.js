import React from 'react';
import uniqid from "uniqid";
import './style.scss';

const Product = ({ data }) => {
    const {id, category, name, photo, price, desc, ...other} = data;

    return (
        <div className="product" key={uniqid()}>
            <div style={{"gridArea": "a", "textAlign": "center"}}>
                { name }
            </div> 
            <div style={{"gridArea": "b", "minHeight": "180px", "textAlign": "center"}}>
                <img src={ photo } alt="Фото" />
            </div>
            <div style={{"display": "table", "gridArea": "c"}}>
                <div style={{"display": "table-cell", "verticalAlign": "middle", "textAlign": "left", "padding": "0"}}>
                    Цена
                </div>
                <div style={{"display": "table-cell", "verticalAlign": "middle", "textAlign": "right", "padding": "0", "fontWeight": "bold"}}>
                    { price } ₽
                </div>
            </div>
            <div style={{"gridArea": "e"}}>
                { Object.keys(other)[0] } 
            </div>
            <div style={{"gridArea": "f", "justifySelf": "end"}}>
                { other[Object.keys(other)[0]] }
            </div>
            <div style={{"gridArea": "g", "fontSize": "12px"}}>
                { desc }
            </div>
        </div>
    );
}
 export default Product;