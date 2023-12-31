/*--  Mammeri Moahmed --------------------------------------------------
 *    ==================================================================
 *    Website : www.mohamedmammeri.com
 *    Email   : mammeri244@gmail.com
 * --------------------------------------------------------------------*/

const donationAmount = document.getElementById('donationAmount').value;
const donateButton = document.getElementById('donateButton');
donateButton.addEventListener('click',()=>{
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: donationAmount // Set the amount you want to charge or pass it within a var
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
});


/* paypal.Buttons({   // Customize your buttons by passing in the style option.
    style: {
      layout: 'vertical',//
      color:  'blue',
      shape:  'rect',
      label:  'paypal'
    }
  }).render('#paypal-button-container');
*/


/*-----------------------------------------------------------------------------*/    
/*=========================== Second Section API =============================*/

function makePayment() {
    const itemID = 'item1';   //------- Replace with the actual ID so you can reach it from the DataBase

    
    fetch('/pay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemID }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.href = data.approval_url;        //------ Redirect to the PayPal URL
    })
    .catch(error => {
        console.error('Error:', error);
    });
}