import mongoose from "mongoose";
import "dotenv/config";


export const connectMongoose = async () => {
    const { DB_USER, DB_PASSWORD, CLUSTER, DB_NAME } = process.env;
    const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;
    // mongodb+srv://omar:Oy76811148@cluster0.taehtxj.mongodb.net/
    try {
        await mongoose.connect(URI);
        const collections = (await mongoose.connection.db.listCollections().toArray()).map(
            (collection) => collection.name
        );
        console.log(`Collections of ${DB_NAME} were successfully:`, collections);
        return true;
    } catch (error) {
        console.error(`could not connect to mongoose/db`, error);
        return false;
    }
};

