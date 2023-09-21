import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="categories-page">
        <div className="container" style={{ marginTop: "20px" }}>
          <h3 className="text-center">All Categories</h3>
          <div className="row container">
            {categories?.map((c) => (
              <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                <button to={`/category/${c.slug}`} className="btn cat-btn">
                  {c.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
