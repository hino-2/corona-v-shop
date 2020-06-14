import React, { useState, useContext, useEffect } from "react";
import { GeneralContext } from "../GeneralContext";
import { useHistory } from "react-router-dom";
import "./style.scss";

const Search = () => {
	const context = useContext(GeneralContext);
	const history = useHistory();
	const [value, setValue] = useState("");

	const handleValueChange = (e) => {
		setValue(e.target.value);
	};

	const handleButtonClick = async () => {
		context.changeCategory("search", value);
		setValue("");
		history.push(`/category/search/${value}`);
	};

	const handleEnterPress = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			document.querySelector("#search-btn").click();
		}
	};

	useEffect(() => {
		document.querySelector("#search-input").addEventListener("keyup", handleEnterPress);

		return () => document.querySelector("#search-input").removeEventListener("keyup", handleEnterPress);
	});

	return (
		<div className="search">
			<input id="search-input" type="text" value={value} onChange={handleValueChange} />
			<button id="search-btn" onClick={handleButtonClick}>
				<img src="/img/icons/search-solid.svg" alt="search" />
			</button>
		</div>
	);
};

export default Search;
