const express = require("express");
require('dotenv').config();
const app = express();

const userRouter = require('./Routes/userApi');
const adminRouter = require('./Routes/adminApi');
const appRouter = require('./Routes/api');
const bodyParser = require("body-parser");

const cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/assets/images'));
app.use("/api", appRouter);
app.use("/api/user" , userRouter);
app.use("/api/admin", adminRouter);

app.listen(process.env.DEV_PORT, () => {
  console.log(`http://localhost:${process.env.DEV_PORT}`);
});
