import express from "express";
import cors from "cors";
import { connectMongoose } from "./util/connectionMongoose.js";
import router from "./router/router.js";
import { validateSchema } from "./middlewares/validateSchema.js";
import "dotenv/config.js";
const PORT = process.env.PORT;

// App erstellen
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Backend running");
});
// Venwendung zum Mongoose
await connectMongoose();

// Routes
app.use("/",  router);

// Server Starten
app.listen(PORT, () => {
  console.log(`server runnnig auf PORT: http://localhost:${PORT}`);
});
