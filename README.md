# ARK GLOBAL SUPPLY - V8 Modular Edition

**Australia's #1 Bundle Store** - Premium curated bundles shipped fast from Sydney.

## 🚀 Quick Start

```bash
npm install
npm start
```

Build for production:
```bash
npm run build
```

---

## 📁 File Structure

```
src/
├── config/                    # ← EDIT THESE TO UPDATE SITE
│   ├── products.js           # All products (add/edit here)
│   ├── colors.js             # Theme colors
│   ├── site.js               # Site settings, hero text, shipping
│   ├── countries.js          # Currency & shipping rates
│   ├── discounts.js          # Promo codes
│   ├── socialProof.js        # "Just purchased" popup names
│   ├── faq.js                # FAQ questions & answers
│   └── index.js              # Exports all config
│
├── components/               # UI Components
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── MensSection.jsx
│   ├── CartDrawer.jsx
│   ├── ProductModal.jsx
│   ├── TrustBar.jsx
│   ├── Newsletter.jsx
│   ├── FAQSection.jsx
│   ├── Footer.jsx
│   ├── CountrySelector.jsx
│   ├── UI/
│   │   ├── Button.jsx
│   │   ├── Stars.jsx
│   │   └── Timer.jsx
│   └── Popups/
│       ├── ExitIntent.jsx
│       ├── SocialProof.jsx
│       └── Notification.jsx
│
├── hooks/
│   └── useLocalStorage.js    # Persist cart & country
│
├── utils/
│   └── helpers.js            # formatPrice, etc.
│
├── App.jsx                   # Main app (ties everything together)
└── index.js                  # Entry point
```

---

## 📦 Adding New Products

Edit `src/config/products.js` and add a new object:

```javascript
{
  id: 500,                    // Unique ID
  name: "Product Name",
  desc: "Short description of what's included",
  price: 59.99,              // Sale price
  was: 89.99,                // Original price
  img: "https://...",        // Image URL (see below)
  tag: "NEW",                // Badge text
  tagBg: "#00FF88",          // Badge color
  cat: "mens",               // Category: mens, kids, gift, holiday, party
  stock: 20,                 // Current stock
  sold: 0,                   // Number sold (social proof)
  reviews: [
    { u: "Name", r: 5, t: "Review text", v: true }
  ]
}
```

### Image Options

1. **Unsplash** (free stock photos):
   ```
   https://images.unsplash.com/photo-XXXXX?w=800
   ```

2. **Your own images** (upload to GitHub):
   - Put images in `public/images/`
   - Reference as `/images/product-name.jpg`

3. **ImgBB** (free image hosting):
   - Go to https://imgbb.com
   - Upload image
   - Copy "Direct link"

4. **Cloudinary** (free tier):
   - Sign up at https://cloudinary.com
   - Upload and use the URL

---

## 🎨 Changing Colors

Edit `src/config/colors.js`:

```javascript
const COLORS = {
  bg: '#0A0A0A',           // Main background
  bgCard: '#141414',       // Card backgrounds
  accent: '#FF4D00',       // Brand color (orange)
  success: '#00FF88',      // Green
  gold: '#FFD700',         // Ratings
  text: '#FFFFFF',         // Primary text
  textMuted: '#888888',    // Secondary text
};
```

---

## 🏷️ Adding Discount Codes

Edit `src/config/discounts.js`:

```javascript
{
  code: 'NEWCODE',
  type: 'percent',     // 'percent', 'fixed', or 'shipping'
  value: 25,           // 25% off
  desc: '25% off your order',
  active: true,
}
```

---

## 💳 Stripe Integration

1. Sign up at https://stripe.com
2. Get your **Publishable Key** from Dashboard → Developers → API Keys
3. Create products in Stripe Dashboard
4. Install Stripe:
   ```bash
   npm install @stripe/stripe-js
   ```

5. Update checkout in `App.jsx`:
   ```javascript
   import { loadStripe } from '@stripe/stripe-js';
   
   const stripePromise = loadStripe('pk_live_YOUR_KEY');
   
   const handleCheckout = async () => {
     const stripe = await stripePromise;
     // Create checkout session via your backend
     // Redirect to Stripe
   };
   ```

**Full Stripe guide**: https://stripe.com/docs/checkout/quickstart

---

## 💬 Tidio Chat Integration

1. Sign up at https://tidio.com (FREE)
2. Get your key from Settings → Developer → Installation
3. Add to `public/index.html`:
   ```html
   <script src="//code.tidio.co/YOUR_KEY.js" async></script>
   ```

---

## 📊 Analytics Setup

### Google Analytics 4

1. Create property at https://analytics.google.com
2. Get Measurement ID (G-XXXXXXXXXX)
3. Uncomment and update in `public/index.html`

### Facebook Pixel

1. Create pixel at https://business.facebook.com/events_manager
2. Get Pixel ID
3. Uncomment and update in `public/index.html`

---

## 🚀 Deployment (Vercel)

### Option 1: GitHub Integration (Recommended)

1. Push to GitHub
2. Go to https://vercel.com
3. Import repository
4. Deploy automatically

### Option 2: CLI

```bash
npm install -g vercel
vercel
```

### Connect Domain

1. Vercel Dashboard → Project → Settings → Domains
2. Add `arkglobalsupply.com`
3. Update DNS:
   - A Record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`

---

## 📝 Quick Edits Cheatsheet

| What to change | File to edit |
|----------------|--------------|
| Add product | `config/products.js` |
| Change colors | `config/colors.js` |
| Hero text | `config/site.js` |
| Shipping price | `config/site.js` |
| Free ship threshold | `config/site.js` |
| Add promo code | `config/discounts.js` |
| FAQ questions | `config/faq.js` |
| Social proof names | `config/socialProof.js` |
| Add currency | `config/countries.js` |

---

## 🔧 Common Tasks

### Change free shipping threshold
`config/site.js` → `shipping.freeThreshold`

### Change shipping cost
`config/site.js` → `shipping.standardRate`

### Add a category
`config/site.js` → `categories` array

### Update business info
`config/site.js` → `business` object

---

## 📱 Responsive

- Desktop: Full layout
- Tablet: 2-column grid
- Mobile: Single column, hidden nav

---

## ✅ Launch Checklist

- [ ] Replace placeholder images with real photos
- [ ] Set up Stripe for payments
- [ ] Add Tidio chat key
- [ ] Configure Google Analytics
- [ ] Set up Facebook Pixel
- [ ] Test checkout flow
- [ ] Connect domain
- [ ] Test on mobile

---

## 🆘 Support

Questions? Contact: support@arkglobalsupply.com

Built with ❤️ in Australia 🇦🇺
