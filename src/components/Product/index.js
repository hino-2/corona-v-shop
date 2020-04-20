import React, { useContext } from 'react';
import { Link }              from 'react-router-dom';
import uniqid                from "uniqid";
import Button                from '@material-ui/core/Button';
import { makeStyles }        from '@material-ui/core/styles';
import { GeneralContext }    from '../GeneralContext';
import './style.scss';

const useStyles = makeStyles({
    root: {
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '22px',
        background: '#df641a',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 30,
        width: 50,
        minWidth: 20,
        lineHeight: 'normal',
        padding: '0 5px',
        transition: '0.3s all',
        '&:hover': {
            transform: 'scale(1.2)',
            backgroundColor: '#df641a',
            transition: '0.3s all'
        }
    },
    label: {
        textTransform: 'capitalize',
    },
});

const Product = ({ data }) => {
    const {id, category, name, photo, price, desc, ...other} = data;
    const classes = useStyles();
    const context = useContext(GeneralContext);

    return (
        <div className="product" key={uniqid()}>
            <div style={{gridArea: "a", textAlign: "center"}}>
                <Link to={`/product/${name}`} style={{textDecoration: "none", color: "white"}}>
                    { name }
                </Link>
            </div> 
            <div style={{gridArea: "b", 
                         minHeight: "220px", 
                         display: "grid",
                         placeContent: "center"}}>
                <Link to={`/product/${name}`}>
                    <img src={ photo } alt="Фото" />
                </Link>
            </div>
            <div style={{display: "table", gridArea: "c"}}>
                <div style={{display: "table-cell", verticalAlign: "middle", textAlign: "left", padding: "0"}}>
                    Цена
                </div>
                <div style={{display: "table-cell", verticalAlign: "middle", textAlign: "right", padding: "0", fontWeight: "bold"}}>
                    { price } ₽
                </div>
            </div>
            <div style={{gridArea: "e"}}>
                { Object.keys(other)[0] } 
            </div>
            <div style={{gridArea: "f", justifySelf: "end"}}>
                { other[Object.keys(other)[0]] }
            </div>
            <div style={{gridArea: "g", fontSize: "12px"}}>
                {/* { desc } */}
            </div>
            <div style={{gridArea: "h", justifySelf: "start", margin: "4px 0 0 10px"}}>
                <Button classes={{
                    root: classes.root,
                    label: classes.label,
                }} onClick={() => context.removeProductFromCart(id)}>
                    -
                </Button>
            </div>
            <div style={{gridArea: "i", justifySelf: "end", margin: "4px 10px 0 0"}}>
                <Button classes={{
                        root: classes.root,
                        label: classes.label,
                    }} onClick={() => context.addProductsToCart(data)}>
                        +
                </Button>
            </div>
            <div style={{gridArea: "j", placeSelf: "center", display: "table"}}>
                <div style={{display: "table-cell", verticalAlign: "middle"}}>
                    <Link to={'/cart'}>
                        <img src="/img/cart.png" 
                            style={{height: "28px", width: "30px", maxWidth: "30px", maxHeight: "28px"}} 
                            alt="Корзина" />
                    </Link>
                </div>
                <div style={{display: "table-cell", verticalAlign: "middle"}}>
                    { context.cart.filter((item) => item.name === name).length }
                </div>
            </div>            
        </div>
    );
}
 export default Product;