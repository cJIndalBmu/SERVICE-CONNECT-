require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");

app.use(express.json()); 

// Tackling Cors

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};

app.use(cors(corsOptions));

 
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

// ADMIN ROUTE
app.use("/api/admin", adminRoute);

// app.get("/", (req,res) => {
//     res.status(200).send("Welcome Agnit...");
// });

app.use(errorMiddleware);

const PORT = 5001;

connectDb().then(()=> {
    app.listen(PORT, ()=>{
        console.log(`Server is running at port : ${PORT}`);
    });
});