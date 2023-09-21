import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { AiOutlineReload } from "react-icons/ai";
import toast from "react-hot-toast";
import "../styles/CategoryProductStyles.css";
import { serverURL } from "../utilis/serverURL";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  //eslint-disable-next-line
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  //eslint-disable-next-line
  const [loading, setLoading] = useState(1);

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
    //eslint-disable-next-line
  }, [params?.slug]);
  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        // `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
        `${serverURL}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center"> Category- {category?.name}</h4>
        <h6 className="text-center"> {products?.length} result found</h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            {/* stringify method used for test purpose */}
            {/* {JSON.stringify(radio, null, 4)} */}

            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    // src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    src={`${serverURL}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    {/* <h5 className="card-title">{p.name}</h5> */}
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("de-EU", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </h5>
                    </div>
                    <p className="card-text">
                      {/* substring function used to show maximum 50 character  */}
                      {p.description.substring(0, 50)}...{" "}
                    </p>
                    {/* <p className="card-text">€ {p.price} </p> */}
                    <div className="card-name-price">
                      <button
                        className="btn btn-primary ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-secondary ms-1"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Iteam added to Cart");
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                // <button
                //   className="btn loadmore"
                //   onClick={(e) => {
                //     e.preventDefault();
                //     setPage(page + 1);
                //   }}
                // >
                //   {loading ? "loading ..." : "Loadmore"}
                // </button>
                <button
                  className="btn loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    "Loading ..."
                  ) : (
                    <>
                      {" "}
                      Loadmore <AiOutlineReload />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
