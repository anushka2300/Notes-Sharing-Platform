const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const authRoute=require('./routes/auth')
const uploadFile=require('./routes/fileUpload')
app.use("/files",express.static("files"));
require('dotenv').config();
const PORT =process.env.PORT || 8000;
require('./db')

app.use(bodyParser.json());
app.use(cors());

app.use('/auth',authRoute)
app.use('/uploadfiles',uploadFile);
app.listen(PORT, ()=>{
    console.log("server is running")
})

