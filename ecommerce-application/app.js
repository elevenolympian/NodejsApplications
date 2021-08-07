const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const expressValidator = require('express-validator');

//import Routes
const authRoutes = require("./routes/auth"); //authentication route
const userRoutes = require("./routes/user"); //user route
const app = express();

//It should be placed after express route
const dotenv = require('dotenv')
dotenv.config()



const CONNECTION = process.env.MONGO_DB_URI;
console.log(`CONNECTION FOR MONGODB:${CONNECTION}`)

// application
app.get('/', (req, res) => {  //for main page
    res.send("hello from node");
});


//database connection for mongodb
mongoose.connect(CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
    }).then(() => {
        console.log('DB connected');
    }).catch((err) => {
        console.log(`Error connecting to the database:\n ${err}`)
    });

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
// app.use(cors);
app.use(morgan('dev'));


//controllers to be imported
app.use("/api", authRoutes);
app.use("/api", userRoutes);


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
