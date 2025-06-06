
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/dbconnection');
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./Routes/userRoutes');
const countryRoutes = require('./Routes/represnetingRoutes');
const Country = require('./Model/country'); // If you want to seed
const countries = require('./data/countries'); // Optional
const statusRoutes = require('./Routes/statusRoutes');
const institutionsRouter = require('./Routes/institutionRoutes');






app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const seedCountriesIfNeeded = async () => {
  const count = await Country.countDocuments();
  if (count === 0) {
    await Country.insertMany(countries);
    console.log('✅ Countries auto-seeded');
  }
};

// Database connection
connectDB();
seedCountriesIfNeeded();



// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});




app.get('/api/countries', async (req, res) => {
  const countries = await Country.find(); // or your model name
  res.json(countries);
});
app.use('/api/users', require('./Routes/userRoutes'));

app.use('/api/representing-countries', countryRoutes);

app.use('/api/status', statusRoutes);
app.use('/api/institutions', institutionsRouter);



app.use('/api/auth', require('./Routes/authRoutes'));
app.use('/api', require('./Routes/leadRoutes')); 










app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})