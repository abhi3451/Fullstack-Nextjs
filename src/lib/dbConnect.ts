import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number; //? it can be present or cannot
};
const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  //void means i dont care about the type of data i am getting
  if (connection.isConnected) {
    console.log("Already connected to db");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "", {});

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("DB connection failed");
    process.exit(1);
  }
}

export default dbConnect;
