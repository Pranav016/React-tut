import React from 'react';
import { useParams } from 'react-router';

const ProductsDetails = () => {
	const params = useParams();

	return (
		<div>
			<h2>product details</h2>
			<p>{params.productId}</p>
		</div>
	);
};

export default ProductsDetails;
