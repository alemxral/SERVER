const stripe = require('stripe')('YOUR_SECRET_KEY_HERE'); // Replace with your actual key from environment variables

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Define a fixed price for testing purposes
        const price = 2000; // Example: 20.00 EUR

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'eur',
                            product_data: {
                                name: 'Test Product', // Name of the product
                            },
                            unit_amount: price, // Amount in cents
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${req.headers.origin}/success.html`,
                cancel_url: `${req.headers.origin}/cancel.html`,
            });

            res.status(200).json({ id: session.id });
        } catch (err) {
            console.error('Error creating checkout session:', err);
            res.status(500).json({ error: err.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
