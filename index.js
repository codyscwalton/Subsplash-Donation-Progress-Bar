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
    // Assuming the token endpoint URL is 'https://your-token-endpoint.com'
    const tokenEndpoint = process.env.tokenEndpoint
    // Make a POST request to the token endpoint with client_id and client_secret as query parameters
    const response = await axios.post(tokenEndpoint);

    const token = response.data.access_token;

    console.log('Access Token Generated');

    getDonations(token);

    // Send the token response to the client side
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching token:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

function getDonations(token) {
app.get('/donations', async (req, res) => {
  try {
    // Assuming the token endpoint URL is 'https://your-token-endpoint.com'
    const donationsEndpoint = process.env.donationsEndpoint;

    // Make a POST request to the token endpoint with client_id and client_secret as query parameters
    const response = await axios.get(donationsEndpoint, { headers: {"Authorization" : `Bearer ${token}`} });

  


    // Send the token response to the client side
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Donations:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});
}
/* 
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); */
