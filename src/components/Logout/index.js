import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { GeneralContext } from "../GeneralContext";

const Logout = () => {
	const context = useContext(GeneralContext);
	const history = useHistory();

	useEffect(() => {
		const doLogout = async () => {
			// const response = await fetch('/logoutUser?_method=DELETE', {
			//     method: 'POST',
			//     headers: {
			//         'Accept': 'application/json',
			//         'Content-Type': 'application/json'
			//     },
			//     body: JSON.stringify({"userID": context.user.userID})
			// });
			// if(response.status !== 200) {
			//     history.push("/");
			//     return;
			// }

			// const result = await response.json();

			// if(result.result === 'success') {
			context.setUser({});
			const cookie = new Cookies();
			cookie.remove("corona-user");
			history.push("/");
			// }
		};
		doLogout();
	}, []);

	return null;
};

export default Logout;
