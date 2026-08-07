import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
console.log("✅ App.js Loaded");  
const app = express();

app.get("/", (req, res) => {
  res.send("Home Route Working");
});

app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./Routes/User.Route.js";

app.use("/api/v1/users", userRouter);

// http://localhost:8000/apo/v1/users/register

export default app;