import React, { useState, useEffect } from "react";
import axios from "axios";

import AdminMenu from "./../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import { serverURL } from "../../utilis/serverURL";
const { Option } = Select;
const AdminOrders = () => {
  // eslint-disable-next-line
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Not Process",
    "Shipped",
    "Deliverd",
    "Cancel",
  ]);
  // const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        // `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
        `${serverURL}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // handle change
  const handleChange = async (orderId, value) => {
    try {
      // eslint-disable-next-line
      const { data } = await axios.put(
        // `${process.env.REACT_APP_API}/api/v1/auth/orders-status/${orderId}`,
        `${serverURL}/api/v1/auth/orders-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>

                      <th>{o?.payment.success ? "Success" : "Failed"}</th>
                      <th>{o?.products?.length}</th>
                    </tr>
                  </tbody>
                </table>

                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row m-2 p-2 card flex-row ">
                      <div className="col-md-4">
                        <img
                          // src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          src={`${serverURL}/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                        />
                      </div>

                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price} €</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
