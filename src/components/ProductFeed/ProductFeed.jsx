import { useContext, useState } from "react";
import ProductList from "./components/ProductList";
import SearchBar from "../SearchBar/SearchBar";
import { CategoryContext } from "../../App";
import SideBar from "../SideBar/SideBar";
import "./../../App.css";
import CategoryList from "../Categories/CategoryList";

function ProductFeed() {
  const { setFilterCategory, filterCategory } = useContext(CategoryContext);
  const [filterText, setFilterText] = useState("");

  return (
    <section className="container-fluid pt-5" style={{ marginTop: "50px" }}>
      <div className="row align-items-center justify-content-center px-4">
        <div className="col-md-9 col-12">
        <SearchBar filterText={filterText} setFilterText={setFilterText} />
        </div>
        <div className="col-md-3 col-12">
        <CategoryList setFilterCategory={setFilterCategory}> </CategoryList>
        </div>
      </div>
      <div className="col-md-12 p-4">
        <ProductList filterText={filterText} filterCategory={filterCategory} />
      </div>
    </section>
  );
}

export default ProductFeed;
