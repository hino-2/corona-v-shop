import React, { useContext, useState, useEffect } from "react";
import uniqid from "uniqid";
import Cookies from "universal-cookie";
import { debounce } from "lodash";
import { GeneralContext } from "../GeneralContext";
import { isMobile } from "../../utils";
import "./style.scss";

const Pages = ({ category, namemask }) => {
	const DOCS_PER_PAGE = isMobile() ? 2 : 4;
	const cookie = new Cookies();
	const context = useContext(GeneralContext);
	const pagesTotal = Math.ceil(context.productsTotalAmount / DOCS_PER_PAGE) || 1;

	const [sorting, setSorting] = useState("asc");
	const [page, setPage] = useState(isMobile() ? 2 : parseInt(cookie.get("corona-page")) || 1);

	const pagesArray = populatePagesArray(page, pagesTotal);

	useEffect(() => {
		// handle page refresh & category change from desktop
		// also, load 4 (page * docs per page) docs if mobile
		setPage(isMobile() ? 2 : parseInt(cookie.get("corona-page")) || 1);
	}, [context.category]);

	useEffect(() => {
		if (!isMobile()) return;
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, [page]);

	const handleScroll = debounce(
		async ({
			target: {
				scrollingElement: { scrollHeight, scrollTop, clientHeight },
			},
		}) => {
			const isEnd = scrollHeight - scrollTop - 200 <= clientHeight;

			if (isEnd) {
				context.appendProducts(category, "asc", page + 1);
				setPage((prev) => prev + 1);
				// window.scrollBy(0, -200);
			}
		},
		1000
	);

	const handlePageClick = async (newPage) => {
		if (isNaN(newPage) || newPage === page) return;

		context.changePage(category, sorting, newPage, namemask);
		setPage(newPage);
	};

	const handleSortingClick = async () => {
		const newSorting = sorting === "asc" ? "desc" : "asc";

		context.changePage(category, newSorting, page, namemask);
		setSorting(newSorting);
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
