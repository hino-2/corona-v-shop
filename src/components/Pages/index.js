import React, { useContext, useState, useEffect } from "react";
import uniqid from "uniqid";
import Cookies from "universal-cookie";
import { GeneralContext } from "../GeneralContext";
import { fetchProductsByParams } from "../../utils";
import "./style.scss";

const Pages = ({ category }) => {
	const DOCS_PER_PAGE = 4;
	const cookie = new Cookies();
	const context = useContext(GeneralContext);
	const pagesTotal = Math.ceil(context.productsTotalAmount / DOCS_PER_PAGE);

	const [sorting, setSorting] = useState("asc");
	const [page, setPage] = useState(1);
	const [categoryFromCookie, setCategoryFromCookie] = useState(cookie.get("corona-category"));

	let pagesArray = populatePagesArray(page, pagesTotal);

	useEffect(() => {
		const pageFromCookie = parseInt(cookie.get("corona-page")) || 1;
		setPage(pageFromCookie);
	}, []);

	useEffect(() => {
		setPage(1);
	}, [categoryFromCookie]);

	const handlePageClick = async (newPage) => {
		if (isNaN(newPage) || newPage === page) return;

		const products = await fetchProductsByParams(category, sorting, newPage);
		context.setProducts(products);

		cookie.set("corona-page", newPage, { path: "/", maxAge: 3600 });
		setPage(newPage);
	};

	const handleSortingClick = async () => {
		const newSorting = sorting === "asc" ? "desc" : "asc";
		const products = await fetchProductsByParams(category, newSorting, page);

		setSorting(newSorting);
		context.setProducts(products);
	};

	return (
		<div className="pages">
			<div className="page" onClick={handleSortingClick}>
				цена{" "}
				<img
					src={sorting === "asc" ? "/img/icons/arrow-up-solid.svg" : "/img/icons/arrow-down-solid.svg"}
					className="icon"
					alt="icon"
				/>
			</div>
			{pagesArray.map((pageN) => (
				<div
					className="page"
					onClick={() => handlePageClick(pageN)}
					style={{ boxShadow: pageN === page ? "0px 0px 0px 2px #f2c12a" : "none" }}
					key={uniqid()}>
					{pageN}
				</div>
			))}
		</div>
	);
};

export default Pages;

const populatePagesArray = (currentPage, pagesTotal) => {
	let arr = [];

	arr.push(1);

	for (let i = currentPage - 2; i <= currentPage - 1; i++) {
		if (i > 1) arr.push(i);
	}

	if (currentPage !== 1 && currentPage !== pagesTotal && !arr.includes(currentPage)) arr.push(currentPage);

	for (let i = currentPage + 1; i <= currentPage + 2; i++) {
		if (i < pagesTotal) arr.push(i);
	}

	if (!arr.includes(pagesTotal)) arr.push(pagesTotal);

	if (arr[1] - arr[0] > 1) arr.splice(1, 0, "...");
	if (arr[arr.length - 1] - arr[arr.length - 2] > 1) arr.splice(arr.length - 1, 0, "...");

	return arr;
};
