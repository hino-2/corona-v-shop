import React, { useState, createContext, useEffect } from "react";
import Cookies from "universal-cookie";

export const GeneralContext = createContext();

export const ContextProvider = (props) => {
	useEffect(() => {
		(async function () {
			const response = await fetch("/products/all", {
				headers: {
					Accept: "application/json",
				},
			});
			const products = await response.json();
			setContext((prevContext) => {
				return {
					...prevContext,
					products: products,
				};
			});
		})();
	}, []);

	useEffect(() => {
		(async function () {
			const response = await fetch("/categories", {
				headers: {
					Accept: "application/json",
				},
			});
			const categories = await response.json();
			setContext((prevContext) => {
				return {
					...prevContext,
					categories: categories,
				};
			});
		})();
	}, []);

	useEffect(() => {
		(async function () {
			const response = await fetch("/productsAmount/all", {
				headers: {
					Accept: "application/json",
				},
			});
			const productsTotalAmount = await response.json();
			setContext((prevContext) => {
				return {
					...prevContext,
					productsTotalAmount: productsTotalAmount,
				};
			});
		})();
	}, []);

	const cookies = new Cookies();
	const [user, _setUser] = useState(cookies.get("user"));

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
			// const newCart = prevContext.cart;
			// const deleteFrom = newCart.indexOf(newCart.find((item) => item.id === id));
			// if (deleteFrom > -1) newCart.splice(deleteFrom, 1);

			return {
				...prevContext,
				cart: prevContext.cart.filter((item) => item.id !== id),
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

	const setProductsAmount = (productsTotalAmount) => {
		setContext((prevContext) => {
			return {
				...prevContext,
				productsTotalAmount: productsTotalAmount,
			};
		});
	};

	const [context, setContext] = useState({
		products: [],
		productsTotalAmount: 0,
		categories: [],
		cart: [],
		user: user,
		addProductToCart: addProductToCart,
		removeProductFromCart: removeProductFromCart,
		emptyCart: emptyCart,
		setUser: setUser,
		setProducts: setProducts,
		setProductsAmount: setProductsAmount,
	});

	return <GeneralContext.Provider value={context}>{props.children}</GeneralContext.Provider>;
};
