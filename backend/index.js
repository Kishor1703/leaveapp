require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const leaveRoutes = require('./routes/leaveRoutes');

const app = express();
const port = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(cors());

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Missing MONGODB_URI in environment variables');
  process.exit(1);
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
});

app.use('/leaves', leaveRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});