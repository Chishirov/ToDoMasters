import mongoose from "mongoose";
import "dotenv/config";

async function connectMongoose() {
  const { DB_USER, DB_PASSWORD, CLUSTER, DB_NAME } = process.env;
  const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URI);
    const collections = (
      await mongoose.connection.db.listCollections().toArray()
    ).map((el) => el.name);
    console.log("connected to db: ", collections);
    return true;
  } catch (err) {
    console.error("could not connect to mongoose", err);
    return false;
  }
}

export { connectMongoose };
