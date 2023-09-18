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
       <h1>Product Details</h1>
       {/* for checking function working or not  */}
        {/* {JSON.stringify(product, null,4)} */}
    </Layout>
  )
}

export default ProductDetails