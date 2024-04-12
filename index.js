const { initializeApp, cert } = require('firebase-admin/app');
const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

initializeApp({
  credential: cert(serviceAccount),
});

// Routes
const routes = require('./routes');
routes.forEach((route) => app.use(route.path, route.router));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
