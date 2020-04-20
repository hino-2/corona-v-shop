import React, { useState } from 'react';
import { useHistory }      from 'react-router-dom';
import Button              from '@material-ui/core/Button';
import { makeStyles }      from '@material-ui/core/styles';
import './style.scss';

const useStyles = makeStyles({
    root: {
        background: '#df641a', 
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 62,
        width: 300,
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

const Register = () => {
    const history = useHistory();
    const classes = useStyles();

    const [message, setMessage] = useState('');

    const handleSuccessfulRegistration = () => {
        document.querySelector('#name').value     = '';
        document.querySelector('#email').value    = '';
        document.querySelector('#password').value = '';
        setMessage(
            <div style={{display: "block", textAlign: "center"}}>
                Вы зарегистрированы<br />
                Через 3 секунды появится страница входа
            </div>
        );
        setTimeout(() => {
            history.push('/login');
        }, 3000);
    }

    const logIn = async () => {
        const email = document.querySelector('#email').value;
        const pass  = document.querySelector('#password').value;
        const name  = document.querySelector('#name').value;

        if(!email || !pass || !name) return
        
        const responce = await fetch('/register', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name": name, "email": email, "password": pass})
        });
        const result = await responce.json();

        switch (result.result) {
            case 'success':
                handleSuccessfulRegistration();
                break;
            case 'existing email':
                setMessage('Пользователь с такой электронной почтой уже зарегистрирован');
                break;
            default:
                setMessage('Регистрация не удалась');
                break;
        }
    }

    return (
        <div className="register">
            <div>
                &nbsp;
            </div>
            <div className="form__group field">
                <input type="input" className="form__field" placeholder="Имя" id="name" autoComplete="false" required />
                <label htmlFor="name" className="form__label">Имя</label>
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
                    Зарегистрироваться
                </Button>
            </div>
            <div>
                &nbsp;
            </div>
            <div style={{marginTop: "30px"}}>
                {message}
            </div>
        </div>
    );
}

export default Register;