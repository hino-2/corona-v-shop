import React, { useContext, useState } from "react";
import uniqid from "uniqid";
import { GeneralContext } from "../GeneralContext";
import { fetchProductsByParams } from "../../utils";
import "./style.scss";

const Pages = ({ category }) => {
	const DOCS_PER_PAGE = 4;
	const context = useContext(GeneralContext);
	const pagesTotal = Math.ceil(context.productsTotalAmount / DOCS_PER_PAGE) - 1;
	console.log(context.productsTotalAmount);
	const [sorting, setSorting] = useState("asc");
	const [page, setPage] = useState(0);

	let pagesArray = populatePagesArray(page, pagesTotal);

	const handlePageClick = async (page) => {
		if (isNaN(page)) return;
		const products = await fetchProductsByParams(category, sorting, page);

		setPage(page);
		context.setProducts(products);
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
					style={{ boxShadow: pageN == page ? "0px 0px 0px 2px #f2c12a" : "none" }}
					key={uniqid()}>
					{pageN}
				</div>
			))}
		</div>
	);
};

export default Pages;

const populatePagesArray = (currentPage, pagesTotal) => {
	let _arr = [];

	_arr.push(0);

	for (let i = currentPage - 2; i <= currentPage - 1; i++) {
		if (i > 0) _arr.push(i);
	}

	if (currentPage !== 0 && currentPage !== pagesTotal && !_arr.includes(currentPage)) _arr.push(currentPage);

	for (let i = currentPage + 1; i <= currentPage + 2; i++) {
		if (i < pagesTotal) _arr.push(i);
	}

	if (!_arr.includes(pagesTotal)) _arr.push(pagesTotal);

	if (_arr[1] - _arr[0] > 1) _arr.splice(1, 0, "...");
	if (_arr[_arr.length - 1] - _arr[_arr.length - 2] > 1) _arr.splice(_arr.length - 1, 0, "...");

	return _arr;
};
