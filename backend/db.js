const mongoose = require('mongoose');

// const mongoURI = "mongodb://localhost:27017/clip?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
// const mongoURI = "mongodb+srv://ronakClip51284:gJ5WJCJPNN6wqIwX@ronakclip51284.kpla1.mongodb.net/roks_clips?retryWrites=true&w=majority";

const mongoURI = "mongodb+srv://ronakClip51284:gJ5WJCJPNN6wqIwX@ronakclip51284.kpla1.mongodb.net/roks_clips";
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;