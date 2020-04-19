import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { GeneralContext } from '../GeneralContext';
import './style.scss';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(270deg, #BE2E00 0%, #BA6400 100%);',
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

const Login = () => {
    const context = useContext(GeneralContext);
    const history = useHistory();
    const classes = useStyles();

    const logIn = async () => {
        const email = document.querySelector('#email').value;
        const pass  = document.querySelector('#password').value;

        if(!email || !pass) return
        
        const responce = await fetch('/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email, "password": pass})
        });
        const user = await responce.json();
        console.log(user);

        if(user.userID) {
            const cookie = new Cookies();
            cookie.set('user', user, {path: "/", maxAge: 3600});
            context.setUser(user);
            history.push("/");
        }
    }

    return (
        <div className="login">
            <div>
                &nbsp;
            </div>
            <div className="form__group field">
                <input type="input" className="form__field" placeholder="E-mail" id="email" autoComplete="false" required />
                <label htmlFor="email" className="form__label">E-mail</label>
            </div>
            <div className="form__group field">
                <input type="password" className="form__field" placeholder="Пароль" id="password" required />
                <label htmlFor="password" className="form__label">Пароль</label>
            </div>
            <div>
                &nbsp;
            </div>
            <div>
                <Button classes={{
                    root: classes.root,
                    label: classes.label,
                }} onClick={() => logIn()}>
                    Войти
                </Button>
            </div>
            <div>
                &nbsp;
            </div>
            <div>
                <Link to='/register' style={{textDecoration: "none"}}>
                    <Button classes={{
                        root: classes.root,
                        label: classes.label,
                    }} onClick={() => logIn()}>
                        Регистрация
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Login;