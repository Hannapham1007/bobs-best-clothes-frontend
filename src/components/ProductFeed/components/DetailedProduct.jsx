import { useContext, useEffect, useState } from "react";
import { CartContext, ProductContext } from "../../../App";
import { useParams } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";

function DetailedProduct() {
  const { products } = useContext(ProductContext);
  const { cart, setCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const selectedProduct = products.find(
      (product) => Number(product.id) === Number(id)
    );
    setProduct(selectedProduct);
  }, [id, products]);

  if (!product) {
    return <div className="text-center push-down">Loading...</div>;
  }


  const handleAddToCart = () => {
    //Get existing index
    const existingIndex = cart.findIndex((cartItem) => cartItem.product.id === product.id);

    if(existingIndex === -1){
      setCart([...cart, {product: product, quantity: 1}
      ]);
    }else {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity +=1;  
      setCart(updatedCart);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mx-5  ">
      <div className="row" style={{ marginTop:'150px'}}>
        <div className="col-12 col-md-4 d-flex justify-content-center ">
        <img
          src={product.imageURL}
          className="img-fluid mb-3" 
          alt={product.title}
          style={{maxWidth:'300px', maxHeight:'300px'}} 
        />
        </div>
        <div className="col-12 col-md-8">
        <h5 className="card-title pt-4">{product.title}</h5>
        <p className="pt-4" style={{fontWeight:'bold'}} >{"$" + product.price}</p>
        <p className="card-text">{product.description}</p>
        <button onClick={handleAddToCart} className="btn btn-dark mt-4">Add to Cart <MdShoppingCart/></button>

        </div>

      </div>
    </div>
  );
}

export default DetailedProduct;