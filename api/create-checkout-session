import Stripe from 'stripe';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for Stripe key
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Stripe is not configured' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { items, currency = 'aud', shippingCost = 0, discount = 0 } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in cart' });
    }

    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    // Calculate discount percentage to apply to each item
    const discountPercent = discount > 0 ? discount / subtotal : 0;

    // Build line items for Stripe (with discount applied to each item)
    const lineItems = items.map(item => {
      const discountedPrice = item.price * (1 - discountPercent);
      return {
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: discount > 0 ? `${item.name} (10% off)` : item.name,
            images: item.img ? [item.img] : [],
          },
          unit_amount: Math.round(discountedPrice * 100), // Stripe uses cents
        },
        quantity: item.qty,
      };
    });

    // Add shipping as a line item if not free
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: 'Shipping',
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Get origin URL
    const origin = req.headers.origin || req.headers.referer || 'https://ark-global-supply.vercel.app';

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}?success=true`,
      cancel_url: `${origin}?canceled=true`,
      shipping_address_collection: {
        allowed_countries: ['AU', 'NZ', 'US', 'GB', 'CA', 'SG'],
      },
      billing_address_collection: 'required',
    });

    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error.message);
    res.status(500).json({ error: error.message });
  }
}
