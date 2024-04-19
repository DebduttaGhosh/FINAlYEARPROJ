const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND = 'http://localhost:3000';
const MONGO_URL = "mongodb://localhost/studentsDB"

app.use(cors({ origin: FRONTEND, credentials: true }));





app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Importing routes


const studentRoutes = require('./routes/student');
app.use('/api/students', studentRoutes);
// Body parser middleware




// Connect to MongoDB
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
app.get('/net', (req, res) => {res.json({msg : "hello"})})

// Routes


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
