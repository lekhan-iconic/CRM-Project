import express from "express";
// import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ContactRouter } from "./routes/contact.js";

// dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3001"], credentials: true }));

// Add the contact router
app.use("/", ContactRouter);

// ... your other routes ...

app.listen(3000, () => {
  console.log("Server is Running");
});
