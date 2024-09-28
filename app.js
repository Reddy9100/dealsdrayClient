require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/routes');
const cors = require('cors');
const multer = require('multer');
const path = require("path")
const app = express();
const DBurl = process.env.MongoURL;
const port = process.env.PORT || 5000;




// Middleware
app.use(cors({
  origin : "https://dealsdray-t9wt.onrender.com"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "utils", "uploads")));

mongoose.connect(DBurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use(employeeRoutes); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
