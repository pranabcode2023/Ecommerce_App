import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";

const Products = () => {
  return (
    <Layout>
      <div>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
