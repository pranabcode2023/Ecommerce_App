import slugify from "slugify";
import productModel from "./../models/productModel.js";

// fs = file system .its integrated with node , don't need to install extra package
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    // to get other information except photo from product schema
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    // to get photo from product schema
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });

      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be 1MB" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "Product created Succesfully ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};
