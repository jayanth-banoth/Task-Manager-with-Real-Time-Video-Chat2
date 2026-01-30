const mongoose = require("mongoose");

exports.connectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then((data) => { console.log(`Mongo connected with Server: ${data.connection.host}`) });
}