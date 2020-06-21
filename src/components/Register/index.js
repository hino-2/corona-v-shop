import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { registerNewUser } from "../../logic/userManagement";
import "./style.scss";

const Register = () => {
	const classes = useStyles();
	const history = useHistory();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [message, setMessage] = useState("");

	const nameInput = useRef();

	useEffect(() => {
		nameInput.current.focus();
	}, []);

	const handleUserRegistration = async () => {
		const result = await registerNewUser(name, email, pass);
		setMessage(messages[result]);

		if (result === 0)
			setTimeout(() => {
				if (history.location.pathname !== "/login") history.push("/login");
			}, 3000);
	};

	const handleFormChange = (e) => {
		if (e.target.id === "name") setName(e.target.value);
		if (e.target.id === "email") setEmail(e.target.value);
		if (e.target.id === "password") setPass(e.target.value);
	};

	return (
		<div className="register">
			<div>&nbsp;</div>
			<div className="form__group field">
				<input
					type="input"
					className="form__field"
					value={name}
					onChange={handleFormChange}
					ref={nameInput}
					placeholder="Имя"
					id="name"
					autoComplete="false"
					required
				/>
				<label htmlFor="name" className="form__label">
					Имя
				</label>
			</div>
			<div className="form__group field">
				<input
					type="input"
					className="form__field"
					value={email}
					onChange={handleFormChange}
					placeholder="E-mail"
					id="email"
					autoComplete="false"
					required
				/>
				<label htmlFor="email" className="form__label">
					E-mail
				</label>
			</div>
			<div className="form__group field">
				<input
					type="password"
					className="form__field"
					value={pass}
					onChange={handleFormChange}
					placeholder="Пароль"
					id="password"
					required
				/>
				<label htmlFor="password" className="form__label">
					Пароль
				</label>
			</div>
			<div>&nbsp;</div>
			<div>
				<Button
					classes={{
						root: classes.root,
						label: classes.label,
					}}
					onClick={() => handleUserRegistration()}>
					Зарегистрироваться
				</Button>
			</div>
			<div>&nbsp;</div>
			<div style={{ marginTop: "30px" }}>{message}</div>
		</div>
	);
};

export default Register;

const useStyles = makeStyles({
	root: {
		background: "#df641a",
		borderRadius: 3,
		border: 0,
		color: "white",
		height: 62,
		width: 300,
		lineHeight: "normal",
		padding: "0 20px",
		minWidth: "100px",
		"&:hover": {
			backgroundColor: "#cc9a00",
		},
	},
	label: {
		textTransform: "capitalize",
	},
});

const messages = [
	<div className="message">
		Вы зарегистрированы
		<br />
		Когда дочитаете эту фразу, появится страница входа
	</div>,
	<div className="message">
		Не удалось зарегистрироваться
		<br />
		Жаловаться сюда:&nbsp;
		<a href="mailto:info-corona@mail.ru">почта для жалований</a>
	</div>,
	<div className="message">Пользователь с такой электронной почтой уже зарегистрирован</div>,
	<div className="message">Заполните все поля</div>,
];
