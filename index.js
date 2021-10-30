const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan')
const PORT = process.env.PORT || 4000;
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config(); // config environment

// connecting to mongodb
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, () => {
    console.log(`base de datos conectada correctamente`);
});

// middlewares helpers
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// using routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, () => console.log(`servidor corriendo en el puerto ${PORT}`));