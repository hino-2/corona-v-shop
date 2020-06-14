export const isMobile = () => {
	return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 760;
};

export const fetchProductsByParams = async (category = "Все", sorting = "asc", page = 1, namemask = "") => {
	const response = await fetch(`/products/${category}/${sorting}/${page}/${namemask}`, {
		headers: {
			Accept: "application/json",
		},
	});
	const products = await response.json();

	return products;
};

export const fetchProductsAmountByParams = async (category = "Все", namemask = "") => {
	const response = await fetch(`/productsAmount/${category}/${namemask}`, {
		headers: {
			Accept: "application/json",
		},
	});
	const productsTotalAmount = await response.json();

	return productsTotalAmount;
};
