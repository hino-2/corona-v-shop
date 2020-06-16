import Cookies from "universal-cookie";

const success = 0;
const fail = 1;
const fail_existing_email = 2;
const form_not_filled = 3;
const user_not_exist = 4;
const wrong_credentials = 5;

export const registerNewUser = async (name, email, pass) => {
	if (!email || !pass || !name) return form_not_filled;

	const response = await fetch("/register", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: name, email: email, password: pass }),
	});
	if (response.status === 500) return fail;

	const result = await response.json();

	switch (result.result) {
		case "success":
			return success;
		case "existing email":
			return fail_existing_email;
		default:
			return fail;
	}
};

export const logIn = async (email, pass, context) => {
	if (!email || !pass) return form_not_filled;

	const response = await fetch("/login", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email: email, password: pass }),
	});

	const data = await response.json();

	if (data.error === "User doesnt exists") return user_not_exist;
	if (data.error === "Wrong password") return wrong_credentials;
	if (response.status === 500) return fail;

	const cookie = new Cookies();
	cookie.set("corona-user", data, { path: "/", maxAge: 3600 });
	context.setUser(data);

	return success;
};

export const logOut = (context) => {
	context.setUser({});
	const cookie = new Cookies();
	cookie.remove("corona-user");
};
