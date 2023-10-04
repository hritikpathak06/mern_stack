require("dotenv").config();
require('./db/conn');
const app = require('./app');

const port = process.env.PORT || 4000;

app.listen(port,() => {
    console.log(`Server started successfull at the port:${port}`)
})

