// require("dotenv").config({path:'./Public/temp/.env'});
import dotenv from "dotenv";
import connectDB from "./DB/Index.js";

dotenv.config({
  path: "./Public/temp/.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("server is running at port :${process.env.PORT}");
    });
  })
  .catch((error) => {
    console.log("MONGODB connection error", error);
  });

/*
import express from "express";
const app = express();
async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error", (error) => {
        console.log("ERROR", error);
        throw error;
    });

    app.listen(process.env.PORT,()=>{
        console.log(`App Is Listening on port ${process.env.PORT}`)
    })

  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
}

*/
