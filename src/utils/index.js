export const isMobile = () => {
	return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 760;
};

export const fetchProductsByParams = async (category = "all", sorting = "asc", page = 0) => {
	const response = await fetch(`/products/${category}/${sorting}/${page}`, {
		headers: {
			Accept: "application/json",
		},
	});
	const products = await response.json();

	return products;
};
