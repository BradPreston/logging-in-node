import express from "express";
import { router } from "./router";
const app = express();
app.use(express.json());

router(app);

console.log("Running on port 3000");
app.listen(3000);
