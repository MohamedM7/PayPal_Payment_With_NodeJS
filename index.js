const express = require('express');
const paypal = require('paypal-rest-sdk');

const app = express();
const PORT = process.env.PORT || 3000;



paypal.configure({ //-------------- Configure PayPal SDK
    mode: 'sandbox', /*--- Change to 'live' for real production  ---------*/
    client_id: 'PAST_YOUR_CLIENT_ID_HERE',
    client_secret: 'PAST_YOUR_CLIENT_SECRET_HERE',
});

app.use(express.static('public'));
//app.use(bodyParser.json());


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
const itemPrice= itemDetails.price;

const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    transactions: [
      {
        amount: {
          total: itemPrice.toString(),
          currency: 'USD',
        },
        description: itemDetails.itemName, /*--- ItemName & its Description -------*/
      },
    ],
    redirect_urls: {
      return_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    },
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error(error.response);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.json({ approval_url: payment.links[i].href });
        }
      }
    }//else
  });
});

/*--------------------------------------------------------------------------------------------*/
app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      payer_id: payerId,
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
      if (error) {
        console.error(error.response);
        res.status(500).send('Payment failed');
      } else {
        console.log(JSON.stringify(payment));
        res.send('Payment successful!');
      }
    });
  });

  /*--------------------------------------------------------------------------------------------*/

  app.get('/cancel', (req, res) => res.send('Payment canceled'));


  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });