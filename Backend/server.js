import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectMongoose } from "./util/connectionMongoose.js";
import router from "./router/router.js";
import { validateSchema } from "./middlewares/loginValidetor.js";

const PORT = process.env.PORT;
// __________________________________________________________________________
// App erstellen
const app = express();
app.use(express.json());
//  app.use(cors());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, 
})); 
// __________________________________________________________________________
// Test Route
app.get("/", (req, res) => {
    res.send("Hi")
  })
// __________________________________________________________________________
// Verbindung zur Datenbank herstellen und Routen hinzufügen
const connect = await connectMongoose()
// __________________________________________________________________________
// Routes
app.use("/", validateSchema, router);
// __________________________________________________________________________
// Server Starten
console.log(connect);

if (connect) {
    app.listen(PORT, () => {
        console.log(`Server is running on port: http://localhost:${PORT}`);
    });
}
