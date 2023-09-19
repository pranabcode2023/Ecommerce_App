import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    //intial product details
    useEffect(()=>{
        if (params?.slug) getProduct()
    }, [params?.slug])
    //get product 
    const getProduct = async()=> {
        try {
            const {data}= await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
              );
              setProduct(data?.product)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
       
       {/* for checking function working or not  */}
        {/* {JSON.stringify(product, null,4)} */}

        <div className='row container mt-2'>
            <div className='col-md-6'>
            <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                      className="card-img-top"
                      alt={product.name}
                      height= {'400'}
                      width={'350px'}
                    />
            </div>
            <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("de-EU", {
              style: "currency",
              currency: "EUR",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
        <div className='row'>
            Similar Products
        </div>
    </Layout>
  )
}

export default ProductDetails