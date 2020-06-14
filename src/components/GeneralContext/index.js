import React, { useState, createContext, useEffect } from "react";
import Cookies from "universal-cookie";
import { fetchProductsByParams, fetchProductsAmountByParams } from "../../utils";

export const GeneralContext = createContext();

export const ContextProvider = (props) => {
	const cookie = new Cookies();
	const [user, _setUser] = useState(cookie.get("corona-user"));

	useEffect(() => {
		(async function () {
			const categories = await fetchCategories();
			setCategories([{ id: 1, name: "Все" }, ...categories]);
		})();
	}, []);

	useEffect(() => {
		(async function () {
			const categoryFromCookie = cookie.get("corona-category");
			const pageFromCookie = cookie.get("corona-page");
			const products = await fetchAllProductsByCategory(categoryFromCookie, pageFromCookie);
			setProducts(products);
		})();
	}, []);

	useEffect(() => {
		(async function () {
			const categoryFromCookie = cookie.get("corona-category");
			const productsTotalAmount = await fetchProductsTotalAmountByCategory(categoryFromCookie);
			setProductsAmount(productsTotalAmount);
		})();
	}, []);

	const addProductToCart = (product) => {
		setContext((prevContext) => {
			return {
				...prevContext,
				cart: [...prevContext.cart, product],
			};
		});
	};

	const removeProductFromCart = (id) => {
		setContext((prevContext) => {
			const newCart = prevContext.cart;
			const deleteFrom = newCart.indexOf(newCart.find((item) => item.id === id));
			if (deleteFrom > -1) newCart.splice(deleteFrom, 1);

			return {
				...prevContext,
				cart: newCart,
			};
		});
	};

	const emptyCart = () => {
		setContext((prevContext) => {
			return {
				...prevContext,
				cart: [],
			};
		});
	};

	const setUser = (user) => {
		setContext((prevContext) => {
			return {
				...prevContext,
				user: user,
			};
		});
	};

	const setProducts = (products) => {
		setContext((prevContext) => {
			return {
				...prevContext,
				products: products,
			};
		});
	};

	const setCategory = (category) => {
		setContext((prevContext) => {
			return {
				...prevContext,
				category: category,
			};
		});
	};

	const appendProducts = async (category, sorting = "asc", page) => {
		const products = await fetchProductsByParams(category, sorting, page);
		if (!products.length) return;

		setContext((prevContext) => {
			return {
				...prevContext,
				products: [...prevContext.products, ...products],
			};
		});
	};

	const setProductsAmount = (productsTotalAmount) => {
		setContext((prevContext) => {
			return {
				...prevContext,
				productsTotalAmount: productsTotalAmount,
			};
		});
	};

	const setCategories = (categories) => {
		setContext((prevContext) => {
			return {
				...prevContext,
				categories: categories,
			};
		});
	};

	const fetchCategories = async () => {
		const response = await fetch("/categories", {
			headers: {
				Accept: "application/json",
			},
		});
		const categories = await response.json();
		return categories;
	};

	const fetchAllProductsByCategory = async (category = "Все", page = 1) => {
		const response = await fetch(`/products/${category}/asc/${page}`, {
			headers: {
				Accept: "application/json",
			},
		});
		const products = await response.json();
		return products;
	};

	const fetchProductsTotalAmountByCategory = async (category = "Все") => {
		const response = await fetch(`/productsAmount/${category}`, {
			headers: {
				Accept: "application/json",
			},
		});
		const productsTotalAmount = await response.json();
		return productsTotalAmount;
	};

	const changeCategory = async (newCategory) => {
		const products = await fetchProductsByParams(newCategory);
		const productsAmount = await fetchProductsAmountByParams(newCategory);
		cookie.set("corona-category", newCategory, { path: "/", maxAge: 3600 });
		cookie.set("corona-page", 1, { path: "/", maxAge: 3600 });
		setCategory(newCategory);
		setProducts(products);
		setProductsAmount(productsAmount);
	};

	const changePage = async (category, sorting, newPage) => {
		const products = await fetchProductsByParams(category, sorting, newPage);
		setProducts(products);

		cookie.set("corona-page", newPage, { path: "/", maxAge: 3600 });
	};

	const [context, setContext] = useState({
		products: [],
		productsTotalAmount: 0,
		category: "",
		categories: [],
		cart: [],
		user: user,
		addProductToCart: addProductToCart,
		removeProductFromCart: removeProductFromCart,
		emptyCart: emptyCart,
		setUser: setUser,
		setCategories: setCategories,
		setProducts: setProducts,
		setCategory: setCategory,
		appendProducts: appendProducts,
		setProductsAmount: setProductsAmount,
		changeCategory: changeCategory,
		changePage: changePage,
	});

	return <GeneralContext.Provider value={context}>{props.children}</GeneralContext.Provider>;
};
