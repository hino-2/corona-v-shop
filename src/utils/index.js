import Cookies from "universal-cookie";

export const isMobile = () => {
	return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 760;
};

export const fetchProductsByParams = async (category = "Все", sorting = "asc", page = 0) => {
	const response = await fetch(`/products/${category}/${sorting}/${page}`, {
		headers: {
			Accept: "application/json",
		},
	});
	const products = await response.json();

	return products;
};

export const fetchProductsAmountInCategory = async (category) => {
	const response = await fetch(`/productsAmount/${category}`, {
		headers: {
			Accept: "application/json",
		},
	});
	const productsTotalAmount = await response.json();

	return productsTotalAmount;
};

export const handleCategoryChange = async (context, newCategory) => {
	const cookie = new Cookies();
	const products = await fetchProductsByParams(newCategory);
	const productsAmount = await fetchProductsAmountInCategory(newCategory);
	cookie.set("corona-category", newCategory, { path: "/", maxAge: 3600 });
	cookie.set("corona-page", 1, { path: "/", maxAge: 3600 });
	context.setProducts(products);
	context.setProductsAmount(productsAmount);
};
