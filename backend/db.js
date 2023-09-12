const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = async () => {
  await mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((err) => console.log(err));
  //   console.log("Connected to MongoDB successfully");
};

module.exports = connectToMongo;