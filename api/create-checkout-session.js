const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

  try {
    const { items, currency = 'aud', shippingCost = 0, promoCode = null } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in cart' });
    }

    // Build line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: item.name,
          images: item.img ? [item.img] : [],
          description: item.desc ? item.desc.substring(0, 500) : undefined,
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.qty,
    }));

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

    // Create checkout session config
    const sessionConfig = {
      payment_method_types: ['card', 'afterpay_clearpay'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin || 'https://ark-global-supply.vercel.app'}?success=true`,
      cancel_url: `${req.headers.origin || 'https://ark-global-supply.vercel.app'}?canceled=true`,
      shipping_address_collection: {
        allowed_countries: ['AU', 'NZ', 'US', 'GB', 'CA', 'SG'],
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
    };

    // Add discount if promo code provided
    if (promoCode) {
      // You can create coupons in Stripe Dashboard and reference them here
      // For now, we'll apply discounts client-side before sending to Stripe
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}
