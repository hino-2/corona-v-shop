import React from 'react';
import uniqid from "uniqid";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './style.scss';

const useStyles = makeStyles({
    root: {
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '22px',
        background: 'linear-gradient(40deg, #df641a 70%, #ffdc56 150%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 30,
        width: 80,
        lineHeight: 'normal',
        padding: '0 5px',
    },
    label: {
        textTransform: 'capitalize',
    },
});

const Product = ({ data }) => {
    const {id, category, name, photo, price, desc, ...other} = data;
    const classes = useStyles();

    return (
        <div className="product" key={uniqid()}>
            <div style={{"gridArea": "a", "textAlign": "center"}}>
                { name }
            </div> 
            <div style={{"gridArea": "b", 
                         "minHeight": "180px", 
                         "display": "grid",
                         "placeContent": "center"}}>
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
                }}>
                    -
                </Button>
            </div>
            <div style={{"gridArea": "i", "justifySelf": "end", "marginRight": "20px"}}>
                <Button classes={{
                        root: classes.root,
                        label: classes.label,
                    }}>
                        +
                </Button>
            </div>
        </div>
    );
}
 export default Product;