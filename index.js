const express = require('express');
const paypal = require('paypal-rest-sdk');

const app = express();
const PORT = process.env.PORT || 3000;






app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });