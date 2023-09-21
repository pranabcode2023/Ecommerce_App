import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
// import cors from "cors";
import { corsOptions } from "cors";

//configure dotenv
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middelwares
// app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api

app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app MERN STACK</h1>");
});

//port
const PORT = process.env.PORT || 8080;

//REVIEW[epic=deploy, seq=2] once the client is deployed we can add the URL to the list of allowed Origins

//REVIEW[epic=deploy, seq=3] the first origin should be the localhost port our client runs on. The second one, vercel's URL for our client
// console.log('LOCALHOST_CLIENT', process.env.LOCALHOST_CLIENT)

const allowedOrigins = [
  "http://localhost:3000",
  "https://ecommerce-mern-stack-app-vercel-client.vercel.app",

  //NOTE - url put into env file
  // process.env.LOCALHOST_CLIENT,
  // process.env.VERCEL_CLIENT,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on  ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
