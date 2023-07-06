const mongoose = require("mongoose");

let connection = null;
var poolsize = 10;

export const connectMongo = async () => {
  if (
    connection === null ||
    (connection.connection.readyState !== 1 &&
      connection.connection.readyState !== 2)
    // readystate 1 === connected, 2 === connecting, I don't want to start new connection if it's already connecting.
  ) {
    console.log("[MONGOOSE] Creating New Connection");

    mongoose.connection.on("open", () => {
      console.log("[ MONGOOSE] Connected with poolSize " + poolsize);
    });

    try {
      await mongoose.connect(process.env.MONGO_URI, { maxPoolSize: poolsize });
    } catch (err) {
      console.log("Mongoose connection error", err);
    }
    connection = mongoose; //save it to the cache variable
    return;
  } else {
    console.log("Using cache Connection");
    return;
  }
};
