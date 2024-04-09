/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ProductContext } from "../../../App";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";


function ProductList({ filterText, filterCategory }) {
  const { products } = useContext(ProductContext);

  // Filter products based on search text or category
  const filteredProducts = products.filter((item) => {
    const isMatchedTitle = item.title
      .toLowerCase()
      .includes(filterText.toLowerCase());
    const isMatchedCategory =
      filterCategory === "" ||
      item.category.name.toLowerCase() === filterCategory.toLowerCase();
    return isMatchedTitle && isMatchedCategory;
  });

  return (
    <div className="row">
      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        filteredProducts.map((item) => (
          <div key={item.id} className="col-md-4 mb-3">
            <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
              <ProductItem product={item} />
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;
