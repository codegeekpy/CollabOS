require("dotenv").config()
const App = require('./src/App');

App.listen(3000,()=>{
    console.log("Server Started!!");
});

const ConnectDB = require('./src/db/db');

ConnectDB();


