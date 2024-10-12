import { getTotalCartCost } from './newtest.js'; // Import the function from newtest.js

const stripe = Stripe('pk_live_51Q4OeLJTZouawikopf9FHiiRcaDqmfuFdW2zNnlYfQuLVMX1wLzKwv2OxXWenyIYwpR3WuhWqEnF9XNpcoPHSvMo00D7HNU3sa'); // Directly set public key

document.getElementById('checkout-button').addEventListener('click', async () => {
    const totalAmount = getTotalCartCost(); // This should return the correct total amount
    const priceId = 'prod_R15qHDmtIv6eHo'; // Use your actual Price ID

    // Call your API endpoint to create a checkout session
    const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: priceId }), // Pass total amount here if not using Price ID
    });

    const session = await response.json();

    // Redirect to Stripe Checkout
    if (session.id) {
        window.location.href = session.url; // Use session.url for redirection
    } else {
        console.error('Error creating checkout session:', session.error);
        alert('Error occurred while processing your payment. Please try again.');
    }
});
