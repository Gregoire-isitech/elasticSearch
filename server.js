const express = require("express");
const router = require('./routes/index');

const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
        extended: true
    }));
app.use(router); // Requests processing will be defined in the file router
app.listen(port, () => console.log('Server app listening on port ' + port));