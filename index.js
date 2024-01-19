const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(bodyParser.json());

app.post('/token', async (req, res) => {
  try {
    const tokenEndpoint = process.env.tokenEndpoint
    const response = await axios.post(tokenEndpoint);

    const token = response.data.access_token;

    console.log('Access Token Generated');

    getDonations(token);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching token:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

function getDonations(token) {
app.get('/donations', async (req, res) => {
  try {
    const donationsEndpoint = process.env.donationsEndpoint;
    const response = await axios.get(donationsEndpoint, { headers: {"Authorization" : `Bearer ${token}`} });

  
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Donations:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});
}

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
