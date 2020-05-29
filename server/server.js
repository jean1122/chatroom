const path = require('path');
const express = require('express');


const public_path = path.join(__dirname, '/../public');
const port = process.env.PORT || 8080;
var app = express();

app.use(express.static(public_path));

app.listen(port, () => {
    console.log(`Server is out on port ${port}`);
})