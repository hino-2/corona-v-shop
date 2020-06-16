import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { GeneralContext } from "../GeneralContext";
import { logIn } from "../../logic/userManagement";
import "./style.scss";

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

const Login = () => {
	const context = useContext(GeneralContext);
	const history = useHistory();
	const classes = useStyles();

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [message, setMessage] = useState("");

	const handleLogIn = async () => {
		const result = await logIn(email, pass, context);

		setMessage(messages[`${result}`]);

		if (result === 0) history.push("/");
	};

	const handleFormChange = (e) => {
		if (e.target.id === "email") setEmail(e.target.value);
		if (e.target.id === "password") setPass(e.target.value);
	};

	return (
		<div className="login">
			<div>&nbsp;</div>
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
					onClick={handleLogIn}>
					Войти
				</Button>
			</div>
			<div>&nbsp;</div>
			<div>
				<Link to="/register" style={{ textDecoration: "none" }}>
					<Button
						classes={{
							root: classes.root,
							label: classes.label,
						}}>
						Регистрация
					</Button>
				</Link>
			</div>
			<div style={{ marginTop: "30px" }}>{message}</div>
		</div>
	);
};

export default Login;

const messages = {
	"1": (
		<div className="message">
			Не удалось авторизоваться
			<br />
			Жаловаться сюда:&nbsp;
			<a href="mailto:info-corona@mail.ru">почта для жалований</a>
		</div>
	),
	"3": <div className="message">Заполните все поля</div>,
	"4": <div className="message">Такой e-mail не зарегистрирован</div>,
	"5": <div className="message">Неправильный e-mail или пароль</div>,
};
