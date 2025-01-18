import express from "express";
import cors from "cors";
import "dotenv/config";
import session from "express-session";
import authRoutes from "./routes/authRoutes.js";
import answerRoutes from "./routes/answerRoutes.js";

const app = express();

const PORT = 4000;

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set `secure: true` if using HTTPS
  })
);

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/answers", answerRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});
