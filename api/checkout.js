const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, country } = req.body;

    const line_items = items.map(item => ({
      price_data: {
        currency: country?.currency?.toLowerCase() || 'aud',
        product_data: {
          name: item.name,
          images: [item.img],
          description: item.desc?.substring(0, 500),
        },
        unit_amount: Math.round(item.price * (country?.rate || 1) * 100),
      },
      quantity: item.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['AU', 'NZ', 'US', 'GB', 'SG', 'CA'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: country?.currency?.toLowerCase() || 'aud' },
            display_name: 'Free Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
      success_url: `${req.headers.origin}?success=true`,
      cancel_url: `${req.headers.origin}?canceled=true`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}
