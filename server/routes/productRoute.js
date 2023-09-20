import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  braintreeTokenController,
  createProductController,
  deleteroductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();
// routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// routes for update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
// get products
router.get("/get-product", getProductController);

// get single products
router.get("/get-product/:slug", getSingleProductController);

// get photo
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteroductController);

// filter product
router.post("/product-filters", productFilterController);

// total  product count for load more option or pagination
router.get("/product-count", productCountController);

//  product per page
router.get("/product-list/:page", productListController);

// Search product
router.get("/search/:keyword", searchProductController);

// similer Product
router.get("/related-product/:pid/:cid", relatedProductController);

// category wise Product
router.get("/product-category/:slug", productCategoryController);

// Payment gateway routes
//token
router.get("/braintree/token", braintreeTokenController);

export default router;
