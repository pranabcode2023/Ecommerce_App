import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="catagoryPage">
        <div className="container catagories-page">
          <div className="row container">
            <h2
              className="card"
              style={{ marginTop: "20px", textAlign: "center" }}
            >
              All Categories
            </h2>
            {categories.map((c) => (
              <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                <div className="card">
                  <Link to={`/category/${c.slug}`} className="btn cat-btn">
                    {c.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
