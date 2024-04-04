import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import adminRoute from "./routes/admin.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
