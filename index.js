const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')


connectDb()
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(errorHandler);
app.use("/api/contacts", require('./routes/contactRoutes.js'));
app.use("/api/users", require('./routes/userRoutes'));









app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
