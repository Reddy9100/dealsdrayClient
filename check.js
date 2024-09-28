const axios = require('axios');

const testUrl = 'https://dealsdrayclient.onrender.com';

axios.get(testUrl)
  .then(() => {
    console.log('Server is reachable');
  })
  .catch(err => {
    console.error('Failed to reach server:', err.message);
  });