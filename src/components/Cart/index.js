import React, { useContext } from 'react';
import uniqid from 'uniqid';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { GeneralContext } from '../GeneralContext';
import CartItem from "../CartItem";
import './style.scss';

const useStyles = makeStyles({
	root: {
		fontFamily: "Montserrat, sans-serif",
		fontSize: "22px",
		// background: 'radial-gradient(farthest-corner at 40px 190px, #f2c12a, #df641a)',
		background: "#df641a",
		borderRadius: 3,
		border: 0,
		color: "white",
		height: 50,
		width: 280,
		lineHeight: "normal",
		padding: "0 5px",
		transition: "0.3s all",
		"&:hover": {
			transform: "scale(1.2)",
			backgroundColor: "#df641a",
			transition: "0.3s all",
        },
        '&$disabled': {
            background: 'rgba(0, 0, 0, 0.12)',
            color: 'white',
            boxShadow: 'none',
        }
	},
	label: {
		textTransform: "capitalize",
    },
    disabled: {
        background: "grey"
    }
});

const Cart = () => {
    const context = useContext(GeneralContext);
    const cart = context.cart;
    const classes = useStyles();

    return (
        <div className="cart">
            { cart.map((item) => <CartItem data={item} key={uniqid()} />) }
            <div className="cart-total">
                <div>
                    {cart.length > 0 ? 
                        <Link to="/checkout" style={{textDecoration: "none"}}>
                            <Button
                                classes={{
                                    root: classes.root,
                                    label: classes.label,
                                }}>
                                Оформить заказ
                            </Button>
                        </Link>                        
                         : 
                        <Button
                            disabled
                            classes={{
                                root: classes.root,
                                label: classes.label,
                                disabled: classes.disabled
                            }}>
                            Оформить заказ
                        </Button>
                    }
                </div>
                <div style={{lineHeight: "1.4em"}}>
                    { cart.reduce((total, item) => total += item.price, 0) } ₽
                </div>
            </div>
        </div>
    );
}

export default Cart;