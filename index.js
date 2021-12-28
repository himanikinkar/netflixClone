const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists")

dotenv.config();
// const url = "mongodb+srv://netflix:netflixclone@cluster0.deg0x.mongodb.net/netflixClone?retryWrites=true&w=majority";

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})
.then(() => console.log("MongoDb Connected"))
.catch((err) => console.log("No connection established"));

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(6900, ()=> {
    console.log("Listing on server 6900");
})