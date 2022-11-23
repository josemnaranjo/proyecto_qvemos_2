const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

require('./server/config/mongoose.config')
 
app.use(cors({credentials:true, origin:"http://localhost:3000"}));

app.use(express.json(),express.urlencoded({ extended: true }))

require('./server/routes/routes')(app); 

 
app.listen(8000, () => {
    console.log("Conexión con el servidor establecida")
})