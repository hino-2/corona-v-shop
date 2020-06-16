import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GeneralContext } from "../GeneralContext";
import { logOut } from "../../logic/userManagement";

const Logout = () => {
	const context = useContext(GeneralContext);
	const history = useHistory();

	useEffect(() => {
		logOut(context);
		history.push("/");
	}, []);

	return null;
};

export default Logout;
