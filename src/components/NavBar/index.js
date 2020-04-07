import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { ProductsContext } from "../ProductsContext";
import './style.scss';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(270deg, #BA6400 0%, #BE2E00 100%);',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      lineHeight: 'normal',
      padding: '0 20px',
      minWidth: '100px'
    //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
});

const NavBar = () => {
    const title = <font color="#EA7E00" style={{"fontSize": "26px"}}>CORONA V SHOP</font>;
    const subtitle = <font color="white" style={{"fontSize": "20px"}}>V значит Vыживание</font>;
    const [username, setUsername] = useState('Vыживший');

    const context = useContext(ProductsContext);
    console.log(context);
    

    const classes = useStyles();

    return(
        <div className="navbar">
            <div className="title">
                <div>{title}</div>
                <div>{subtitle}</div>
            </div>
            <div>
                <img src="/logo.png" style={{"height": "60px"}} alt="CORONA V SHOP" />
            </div>
            <div className="greetings">
                Привет, {username}.
            </div>
            <div className="account">
                <Button classes={{
                    root: classes.root,
                    label: classes.label,
                }}>
                    Вход
                </Button>
            </div>
        </div>
    )
}

export default NavBar;