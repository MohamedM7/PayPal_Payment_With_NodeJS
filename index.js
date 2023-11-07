/*--  Mammeri Moahmed --------------------------------------------------
 *    ==================================================================
 *    Website : www.mohamedmammeri.com
 *    Email   : mammeri244@gmail.com
 * --------------------------------------------------------------------*/


paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '10.00' // Set the amount you want to charge or pass it within a var
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Handle the successful payment here
            console.log('Payment completed successfully: ' + details.payer.name.given_name);
        });
    }
}).render('#paypal-button-container');


/* paypal.Buttons({   // Customize your buttons by passing in the style option.
    style: {
      layout: 'vertical',//
      color:  'blue',
      shape:  'rect',
      label:  'paypal'
    }
  }).render('#paypal-button-container');
      */
    