const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require("path");
const dotenv = require("dotenv");

connectToMongo();

const app = express()
dotenv.config();
const port = 5000

app.use(cors())
app.use(express.json())

// app.use(express.static('public'))
app.use(fileUpload());
// Available Routes
// app.use('/api/auth', require('./routes/auth'))
app.use('/api/clips', require('./routes/clips'))

// ------------------------------Deployment -----------------------------
__dirname = path.resolve();
// console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}else{
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}
// ------------------------------Deployment -----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`iClip listening at http://localhost:${PORT}`)
})