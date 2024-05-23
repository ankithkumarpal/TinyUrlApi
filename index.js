const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const IdGeneratorController = require('./controllers/IdGenerator');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const redirectionController = require('./controllers/redirection');

dotenv.config(); 
app.use(cors());
app.use(bodyParser.json());

// CONNECT TO MONGO
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// middlewares
app.use('/generate' ,IdGeneratorController);
app.use('/',redirectionController);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
