import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";

//data imports
import User from "./models/User.js";
import { dataUser } from "./data/index.js";

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    /*Only add data One time */
    //User.insertMany(dataUser);
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 9000;
app.listen(process.env.PORT, () =>
  console.log(`Listening to PORT ${process.env.PORT}`)
);
