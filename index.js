
    // Loop over each payment method
    paypal.getFundingSources().forEach(function (fundingSource) {
        // Initialize the buttons
        var button = paypal.Buttons({
          fundingSource: fundingSource,
        })
        // Check if the button is eligible
        if (button.isEligible()) {
        // Render the standalone button for that payment method
          button.render('#PaypalSection')
        }
      })
    