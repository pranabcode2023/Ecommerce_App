import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  // remove cart item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user.name}`}
            </h1>

            <h4 className="text-center ">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please login to Checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row m-2 p-2 card flex-row ">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price} €</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4"> checkout | Payment </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
