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
            <div className="message">
                Вы зарегистрированы<br />
                Когда дочитаете эту фразу, появится страница входа
            </div>
        );
        setTimeout(() => {
            if(history.location.pathname !== '/login')
                history.push('/login');
        }, 3000);
    }

    const registerNewUser = async () => {
        const name  = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const pass  = document.querySelector('#password').value;

        if(!email || !pass || !name) return;
        
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name": name, "email": email, "password": pass})
        });
        if(response.status !== 200) {
            setMessage(
                <div className="message">
                    Регистрация не удалась<br />
                    Жаловаться сюда:&nbsp;
                        <a href='mailto:info-corona@mail.ru'>почта для жалований</a>
                </div>
            );
            return;
        }

        const result = await response.json();

        switch (result.result) {
            case 'success':
                handleSuccessfulRegistration();
                break;
            case 'existing email':
                setMessage(
                    <div className="message">
                        Пользователь с такой электронной почтой уже зарегистрирован
                    </div>
                );
                break;
            default:
                setMessage(
                    <div className="message">
                        Случилось нечто очень странное<br />
                        Жаловаться сюда:&nbsp;
                            <a href='mailto:info-corona@mail.ru'>почта для жалований</a>
                    </div>
                );                
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
                }} onClick={() => registerNewUser()}>
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