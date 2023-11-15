const express = require('express');
const paypal = require('paypal-rest-sdk');

const app = express();
const PORT = process.env.PORT || 3000;



const productDetails = {   /*--------- just an example of a simple DataBase -------------*/
    'item1': {
        itemName: 'Product 1',
        price: 9.99
    },
    'item2': {
        itemName: 'Product 2',
        price: 10.99
    },
    'item3': {
        itemName: 'Product 3',
        price: 11.99
    },
    
};


app.post('/pay', (req, res) => {
    const { itemID } = req.body;

    const itemDetails = productDetails[itemID];
console.log(item2Details.price);

});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });