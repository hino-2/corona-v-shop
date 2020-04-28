import React, { useState, 
                useContext, 
                useEffect } from 'react';
import { Link }             from 'react-router-dom';
import Button               from '@material-ui/core/Button';
import { makeStyles }       from '@material-ui/core/styles';
import { Image, 
    Transformation }        from 'cloudinary-react';
import NavBarCart           from '../NavBarCart';
import { GeneralContext }   from '../GeneralContext';
import './style.scss';

const useStyles = makeStyles({
    root: {
        background: '#df641a',  
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        lineHeight: 'normal',
        padding: '0 20px',
        minWidth: '100px',
        "&:hover": {
          backgroundColor: "#cc9a00",
        }
    },
    label: {
      textTransform: 'capitalize',
    },
});

const NavBar = () => {
    const title    = <font color="#EA7E00" style={{"fontSize": "26px"}}>KORONA VI RUS SHOP</font>;
    const subtitle = <font color="#FFFFFF" style={{"fontSize": "20px"}}>Шестой русский магазин КОРОНА</font>;
    const context                 = useContext(GeneralContext);
    const [username, setUsername] = useState('друг');
    const [saldo, setSaldo]       = useState('');

    const classes = useStyles();

    const thereIsALoggedInUser = () => {
        if(!context.user || Object.keys(context.user).length === 0)
            return false;

        return true;
    }

    useEffect(() => {
        if(thereIsALoggedInUser()) {
            setUsername(context.user.username);
            setSaldo(
                <font style={{color: "white", fontSize:"12px", paddingTop: "2px"}}> 
                    {`Счёт: ${context.user.saldo} ₽`} 
                </font>
            );
            return;
        }
        
        setUsername('друг');
        setSaldo('');
    }, [context.user]);

    return(
        <div className="navbar">
            <div className="title">
                <div>
                    <Link to="/" style={{"textDecoration": "none"}}>
                        {title}
                    </Link>
                </div>
                {window.innerWidth > 760 ? 
                    <div>
                        <Link to="/" style={{"textDecoration": "none"}}>
                            {subtitle}
                        </Link>
                    </div> 
                : '' }
            </div>
            <div className="logo">
                <Link to="/">
                    <Image cloudName="hino-2" publicId={`v1/corona-v-shop/logo.png`}>
                        <Transformation height="60" quality="auto:low" crop="scale" />
                    </Image>
                </Link>
            </div>
            <div className="navbarcart">
                <Link to='/cart' style={{"textDecoration": "none"}}>
                    <NavBarCart />
                </Link>
            </div>
            <div className="greetings">
                {`Привет, `}
                { thereIsALoggedInUser() ?
                    <Link to='/LK' style={{color: "#fedd56"}}>
                        {username}
                    </Link>
                    :
                    `${username}`
                }
            </div>
            <div className="account">
                <Link to={ thereIsALoggedInUser() ? '/logout' : '/login' } 
                      style={{"textDecoration": "none"}}>
                    <Button classes={{
                        root: classes.root,
                        label: classes.label,
                    }}>
                        { thereIsALoggedInUser() ? 'Выйти' : 'Войти' }
                    </Button>
                </Link>
                { saldo }
            </div>
        </div>
    )
}

export default NavBar;