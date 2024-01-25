import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { connectMongoose } from "./util/connectionMongoose.js";
import router from "./router/router.js";
import { validateSchema } from "./middlewares/loginValidetor.js";

const PORT = 3005;

// App erstellen
const app = express();

app.use(express.json());
app.use(cors());

// Venwendung zum Mongoose
await connectMongoose();

// Routes
app.use("/", validateSchema, router);

// Server Starten
app.listen(PORT, () => {
  console.log(`server runnnig auf PORT: localhost:${PORT}`);
});
