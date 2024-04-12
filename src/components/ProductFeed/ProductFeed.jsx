import { useContext, useState } from "react";
import ProductList from "./components/ProductList";
import SearchBar from "../SearchBar/SearchBar";
import { CategoryContext, ProductContext } from "../../App";
import "./../../App.css";
import CategoryList from "../Categories/CategoryList";
import SortByPrice from "../Sort/SortByPrice";

function ProductFeed() {
  const { setFilterCategory, filterCategory} = useContext(CategoryContext);
  const { filterPrice, setFilterPrice } = useContext(ProductContext);
  const [filterText, setFilterText] = useState("");

  return (
    <section className="container-fluid pt-5 push-down">
      <div className="row align-items-center justify-content-center px-4">
        <div className="col-md-6 col-12 ">
        <SearchBar filterText={filterText} setFilterText={setFilterText} />
        </div>
        <div className="col-md-6 col-12 d-flex justify-content-around mt-3">
        <CategoryList setFilterCategory={setFilterCategory}> </CategoryList>
        <SortByPrice setFilterPrice={setFilterPrice} ></SortByPrice>
        </div>
      </div>
      <div className="col-md-12 p-4">
        <ProductList filterText={filterText} filterCategory={filterCategory} filterPrice={filterPrice} />
      </div>
    </section>
  );
}

export default ProductFeed;
