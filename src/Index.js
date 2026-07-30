import dotenv from "dotenv";
import connectDB from "./DB/Index.js";
import app from "./App.js";

dotenv.config({
  path: "./Public/temp/.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection error", error);
  });