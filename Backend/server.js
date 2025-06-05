
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/dbconnection');
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./Routes/userRoutes');





app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Database connection
connectDB();



// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});





app.use('/api/users', require('./Routes/userRoutes'));


app.use('/api/auth', require('./Routes/authRoutes'));
app.use('/api', require('./Routes/leadRoutes')); 









app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})