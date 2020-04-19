import React, { useContext } from 'react';
import { GeneralContext } from '../GeneralContext';
import uniqid from "uniqid";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './style.scss';

const useStyles = makeStyles({
    root: {
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '22px',
        // background: 'radial-gradient(farthest-corner at 40px 190px, #f2c12a, #df641a)',
        background: '#df641a',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 30,
        width: 80,
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

const ProductDetail = ({ match }) => {
    const context = useContext(GeneralContext);
    const product = context.products.find((item) => item.name === match.params.name);
    const {id, category, name, photo, price, desc, ...other} = product;

    const classes = useStyles();

    // useEffect(() => {
    //     document.querySelector('.product-details img').style.maxWidth = '100%';
    // },[]);

    return (
        <div className="product-details" key={uniqid()}>
            <div style={{"gridArea": "a", "textAlign": "center"}}>
                <font style={{"fontSize": "32px", "color": "white"}}>
                    { name }
                </font>
            </div> 
            <div style={{"gridArea": "b", 
                         "minHeight": "180px", 
                         "display": "grid",
                         "placeContent": "center",
                         "padding": "0",
                         "minWidth": "200px"}}>
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
            <div style={{"gridArea": "h", "justifySelf": "start", "marginLeft": "20px"}}>
                <Button classes={{
                    root: classes.root,
                    label: classes.label,
                }} onClick={() => context.removeProductFromCart(id)}>
                    -
                </Button>
            </div>
            <div style={{"gridArea": "i", "justifySelf": "end", "marginRight": "20px"}}>
                <Button classes={{
                    root: classes.root,
                    label: classes.label,
                }} onClick={() => context.addProductsToCart(product)}>
                    +
                </Button>
            </div>
            <div style={{"gridArea": "j", "placeSelf": "center", "display": "table"}}>
                <div style={{"display": "table-cell", "verticalAlign": "middle"}}>
                    <Link to={'/cart'}>
                        <img src="/img/cart.png" 
                            style={{"height": "28px", "width": "30px", "maxWidth": "30px", "maxHeight": "28px"}} 
                            alt="Корзина" />
                    </Link>
                </div>
                <div style={{"display": "table-cell", "verticalAlign": "middle"}}>
                    { context.cart.filter((item) => item.name === match.params.name).length }
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;