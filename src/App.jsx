import { useState, useEffect, useRef } from 'react';

// ===========================================
// CONFIGURATION - EDIT THESE
// ===========================================
const ADMIN_PASSWORD = "30920654IC@&";

// Supported languages
const LANGUAGES = {
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  pt: { name: 'Português', flag: '🇧🇷' },
  zh: { name: '中文', flag: '🇨🇳' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  ja: { name: '日本語', flag: '🇯🇵' }
};

// Translations
const TRANSLATIONS = {
  en: {
    nav: { shop: 'Shop', about: 'About', contact: 'Contact', cart: 'Cart' },
    hero: {
      badge: '✦ PREMIUM BUNDLES DELIVERED',
      title1: 'Everything', title2: 'You Need.', title3: 'One Box.',
      subtitle: 'Curated bundles for every moment. From back-to-school essentials to holiday magic — we pack it all so you don\'t have to think twice.',
      shopNow: 'Shop Now', learnMore: 'Learn More'
    },
    products: {
      title: 'Our Bundles', subtitle: 'Curated with care. Delivered with speed.',
      addToCart: 'Add to Cart', all: 'All'
    },
    about: {
      badge: 'ABOUT US', title: 'We Bundle.\nYou Unbox Joy.',
      text: 'Ark Global Supply was born from a simple idea: shopping for multiple items shouldn\'t feel like a chore. We curate premium bundles for life\'s biggest moments.',
      features: [
        { icon: '📦', title: 'Fast Shipping', desc: '2-5 day delivery' },
        { icon: '✨', title: 'Premium Quality', desc: 'Hand-picked items' },
        { icon: '🔄', title: 'Easy Returns', desc: '30-day guarantee' },
        { icon: '💬', title: '24/7 Support', desc: 'Always here to help' }
      ]
    },
    contact: {
      title: 'Get in Touch', subtitle: 'Questions? Ideas? We\'d love to hear from you.',
      email: 'Your email', message: 'Your message', send: 'Send Message'
    },
    newsletter: {
      title: 'Join Our Newsletter', subtitle: 'Get exclusive deals and updates delivered to your inbox.',
      placeholder: 'Enter your email', button: 'Subscribe', success: 'Thanks for subscribing!'
    },
    cart: {
      title: 'Your Cart', empty: 'Your cart is empty', remove: 'Remove',
      subtotal: 'Subtotal', shipping: 'Shipping', shippingValue: 'FREE', total: 'Total',
      checkout: 'Checkout', secure: 'Secure checkout powered by Stripe',
      eta: 'Estimated delivery'
    },
    shipping: {
      calculating: 'Calculating...', days: 'business days', free: 'FREE'
    },
    footer: { rights: 'All rights reserved.' },
    stats: [
      { value: '10K+', label: 'Happy Customers' },
      { value: '500+', label: 'Products Bundled' },
      { value: '4.9', label: 'Average Rating' }
    ]
  },
  es: {
    nav: { shop: 'Tienda', about: 'Nosotros', contact: 'Contacto', cart: 'Carrito' },
    hero: {
      badge: '✦ PAQUETES PREMIUM ENTREGADOS',
      title1: 'Todo lo', title2: 'Que Necesitas.', title3: 'Una Caja.',
      subtitle: 'Paquetes curados para cada momento. Desde esenciales de regreso a clases hasta magia navideña.',
      shopNow: 'Comprar', learnMore: 'Más Info'
    },
    products: {
      title: 'Nuestros Paquetes', subtitle: 'Curados con cariño. Entregados con rapidez.',
      addToCart: 'Añadir', all: 'Todos'
    },
    about: {
      badge: 'NOSOTROS', title: 'Empacamos.\nTú Disfrutas.',
      text: 'Ark Global Supply nació de una idea simple: comprar múltiples artículos no debería ser una tarea difícil.',
      features: [
        { icon: '📦', title: 'Envío Rápido', desc: 'Entrega en 2-5 días' },
        { icon: '✨', title: 'Calidad Premium', desc: 'Artículos seleccionados' },
        { icon: '🔄', title: 'Devoluciones Fáciles', desc: 'Garantía de 30 días' },
        { icon: '💬', title: 'Soporte 24/7', desc: 'Siempre aquí para ayudar' }
      ]
    },
    contact: {
      title: 'Contáctanos', subtitle: '¿Preguntas? ¿Ideas? Nos encantaría saber de ti.',
      email: 'Tu correo', message: 'Tu mensaje', send: 'Enviar'
    },
    newsletter: {
      title: 'Únete a Nuestro Boletín', subtitle: 'Recibe ofertas exclusivas.',
      placeholder: 'Tu correo electrónico', button: 'Suscribirse', success: '¡Gracias por suscribirte!'
    },
    cart: {
      title: 'Tu Carrito', empty: 'Tu carrito está vacío', remove: 'Eliminar',
      subtotal: 'Subtotal', shipping: 'Envío', shippingValue: 'GRATIS', total: 'Total',
      checkout: 'Pagar', secure: 'Pago seguro con Stripe',
      eta: 'Entrega estimada'
    },
    shipping: { calculating: 'Calculando...', days: 'días hábiles', free: 'GRATIS' },
    footer: { rights: 'Todos los derechos reservados.' },
    stats: [
      { value: '10K+', label: 'Clientes Felices' },
      { value: '500+', label: 'Productos Empacados' },
      { value: '4.9', label: 'Calificación Promedio' }
    ]
  },
  fr: {
    nav: { shop: 'Boutique', about: 'À Propos', contact: 'Contact', cart: 'Panier' },
    hero: {
      badge: '✦ LOTS PREMIUM LIVRÉS',
      title1: 'Tout Ce', title2: 'Dont Vous Avez', title3: 'Besoin.',
      subtitle: 'Des lots soigneusement sélectionnés pour chaque moment. Des essentiels de rentrée à la magie des fêtes.',
      shopNow: 'Acheter', learnMore: 'En Savoir Plus'
    },
    products: {
      title: 'Nos Lots', subtitle: 'Sélectionnés avec soin. Livrés rapidement.',
      addToCart: 'Ajouter', all: 'Tous'
    },
    about: {
      badge: 'À PROPOS', title: 'Nous Emballons.\nVous Profitez.',
      text: 'Ark Global Supply est né d\'une idée simple: acheter plusieurs articles ne devrait pas être une corvée.',
      features: [
        { icon: '📦', title: 'Livraison Rapide', desc: 'Livraison en 2-5 jours' },
        { icon: '✨', title: 'Qualité Premium', desc: 'Articles sélectionnés' },
        { icon: '🔄', title: 'Retours Faciles', desc: 'Garantie 30 jours' },
        { icon: '💬', title: 'Support 24/7', desc: 'Toujours là pour aider' }
      ]
    },
    contact: {
      title: 'Contactez-Nous', subtitle: 'Questions? Idées? Nous aimerions vous entendre.',
      email: 'Votre email', message: 'Votre message', send: 'Envoyer'
    },
    newsletter: {
      title: 'Rejoignez Notre Newsletter', subtitle: 'Recevez des offres exclusives.',
      placeholder: 'Votre email', button: 'S\'abonner', success: 'Merci de votre inscription!'
    },
    cart: {
      title: 'Votre Panier', empty: 'Votre panier est vide', remove: 'Supprimer',
      subtotal: 'Sous-total', shipping: 'Livraison', shippingValue: 'GRATUIT', total: 'Total',
      checkout: 'Payer', secure: 'Paiement sécurisé par Stripe',
      eta: 'Livraison estimée'
    },
    shipping: { calculating: 'Calcul...', days: 'jours ouvrés', free: 'GRATUIT' },
    footer: { rights: 'Tous droits réservés.' },
    stats: [
      { value: '10K+', label: 'Clients Satisfaits' },
      { value: '500+', label: 'Produits Emballés' },
      { value: '4.9', label: 'Note Moyenne' }
    ]
  },
  de: {
    nav: { shop: 'Shop', about: 'Über Uns', contact: 'Kontakt', cart: 'Warenkorb' },
    hero: {
      badge: '✦ PREMIUM-PAKETE GELIEFERT',
      title1: 'Alles Was', title2: 'Du Brauchst.', title3: 'Eine Box.',
      subtitle: 'Kuratierte Pakete für jeden Moment. Von Schulanfang bis Weihnachtszauber.',
      shopNow: 'Jetzt Kaufen', learnMore: 'Mehr Erfahren'
    },
    products: {
      title: 'Unsere Pakete', subtitle: 'Mit Sorgfalt kuratiert. Schnell geliefert.',
      addToCart: 'In den Warenkorb', all: 'Alle'
    },
    about: {
      badge: 'ÜBER UNS', title: 'Wir Packen.\nDu Freust Dich.',
      text: 'Ark Global Supply wurde aus einer einfachen Idee geboren: Mehrere Artikel zu kaufen sollte keine lästige Aufgabe sein.',
      features: [
        { icon: '📦', title: 'Schneller Versand', desc: '2-5 Tage Lieferung' },
        { icon: '✨', title: 'Premium Qualität', desc: 'Handverlesene Artikel' },
        { icon: '🔄', title: 'Einfache Rückgabe', desc: '30 Tage Garantie' },
        { icon: '💬', title: '24/7 Support', desc: 'Immer für Sie da' }
      ]
    },
    contact: {
      title: 'Kontaktieren Sie Uns', subtitle: 'Fragen? Ideen? Wir würden gerne von Ihnen hören.',
      email: 'Ihre E-Mail', message: 'Ihre Nachricht', send: 'Senden'
    },
    newsletter: {
      title: 'Newsletter Abonnieren', subtitle: 'Erhalten Sie exklusive Angebote.',
      placeholder: 'Ihre E-Mail', button: 'Abonnieren', success: 'Danke fürs Abonnieren!'
    },
    cart: {
      title: 'Ihr Warenkorb', empty: 'Ihr Warenkorb ist leer', remove: 'Entfernen',
      subtotal: 'Zwischensumme', shipping: 'Versand', shippingValue: 'KOSTENLOS', total: 'Gesamt',
      checkout: 'Zur Kasse', secure: 'Sichere Zahlung mit Stripe',
      eta: 'Geschätzte Lieferung'
    },
    shipping: { calculating: 'Berechnung...', days: 'Werktage', free: 'KOSTENLOS' },
    footer: { rights: 'Alle Rechte vorbehalten.' },
    stats: [
      { value: '10K+', label: 'Zufriedene Kunden' },
      { value: '500+', label: 'Verpackte Produkte' },
      { value: '4.9', label: 'Durchschnittsbewertung' }
    ]
  },
  pt: {
    nav: { shop: 'Loja', about: 'Sobre', contact: 'Contato', cart: 'Carrinho' },
    hero: {
      badge: '✦ PACOTES PREMIUM ENTREGUES',
      title1: 'Tudo Que', title2: 'Você Precisa.', title3: 'Uma Caixa.',
      subtitle: 'Pacotes selecionados para cada momento. Do material escolar à magia do Natal.',
      shopNow: 'Comprar', learnMore: 'Saiba Mais'
    },
    products: {
      title: 'Nossos Pacotes', subtitle: 'Selecionados com carinho. Entregues com rapidez.',
      addToCart: 'Adicionar', all: 'Todos'
    },
    about: {
      badge: 'SOBRE NÓS', title: 'Nós Embalamos.\nVocê Desembala Alegria.',
      text: 'Ark Global Supply nasceu de uma ideia simples: comprar vários itens não deveria ser uma tarefa difícil.',
      features: [
        { icon: '📦', title: 'Envio Rápido', desc: 'Entrega em 2-5 dias' },
        { icon: '✨', title: 'Qualidade Premium', desc: 'Itens selecionados' },
        { icon: '🔄', title: 'Devoluções Fáceis', desc: 'Garantia de 30 dias' },
        { icon: '💬', title: 'Suporte 24/7', desc: 'Sempre aqui para ajudar' }
      ]
    },
    contact: {
      title: 'Entre em Contato', subtitle: 'Dúvidas? Ideias? Adoraríamos ouvir você.',
      email: 'Seu email', message: 'Sua mensagem', send: 'Enviar'
    },
    newsletter: {
      title: 'Assine Nossa Newsletter', subtitle: 'Receba ofertas exclusivas.',
      placeholder: 'Seu email', button: 'Assinar', success: 'Obrigado por assinar!'
    },
    cart: {
      title: 'Seu Carrinho', empty: 'Seu carrinho está vazio', remove: 'Remover',
      subtotal: 'Subtotal', shipping: 'Frete', shippingValue: 'GRÁTIS', total: 'Total',
      checkout: 'Finalizar', secure: 'Pagamento seguro via Stripe',
      eta: 'Entrega estimada'
    },
    shipping: { calculating: 'Calculando...', days: 'dias úteis', free: 'GRÁTIS' },
    footer: { rights: 'Todos os direitos reservados.' },
    stats: [
      { value: '10K+', label: 'Clientes Felizes' },
      { value: '500+', label: 'Produtos Embalados' },
      { value: '4.9', label: 'Avaliação Média' }
    ]
  },
  zh: {
    nav: { shop: '商店', about: '关于', contact: '联系', cart: '购物车' },
    hero: {
      badge: '✦ 优质套装配送',
      title1: '您需要的', title2: '一切。', title3: '一个盒子。',
      subtitle: '为每一刻精心策划的套装。从开学必需品到节日魔法。',
      shopNow: '立即购买', learnMore: '了解更多'
    },
    products: {
      title: '我们的套装', subtitle: '精心策划。快速配送。',
      addToCart: '加入购物车', all: '全部'
    },
    about: {
      badge: '关于我们', title: '我们打包。\n您开箱快乐。',
      text: 'Ark Global Supply 诞生于一个简单的想法：购买多件商品不应该是一件麻烦事。',
      features: [
        { icon: '📦', title: '快速配送', desc: '2-5天送达' },
        { icon: '✨', title: '优质品质', desc: '精选商品' },
        { icon: '🔄', title: '轻松退货', desc: '30天保证' },
        { icon: '💬', title: '24/7支持', desc: '随时为您服务' }
      ]
    },
    contact: {
      title: '联系我们', subtitle: '有问题？有想法？我们很乐意听取您的意见。',
      email: '您的邮箱', message: '您的消息', send: '发送'
    },
    newsletter: {
      title: '订阅我们的通讯', subtitle: '获取独家优惠。',
      placeholder: '您的邮箱', button: '订阅', success: '感谢订阅！'
    },
    cart: {
      title: '您的购物车', empty: '您的购物车是空的', remove: '移除',
      subtotal: '小计', shipping: '运费', shippingValue: '免费', total: '总计',
      checkout: '结账', secure: 'Stripe安全支付',
      eta: '预计送达'
    },
    shipping: { calculating: '计算中...', days: '工作日', free: '免费' },
    footer: { rights: '版权所有。' },
    stats: [
      { value: '10K+', label: '满意客户' },
      { value: '500+', label: '打包产品' },
      { value: '4.9', label: '平均评分' }
    ]
  },
  ar: {
    nav: { shop: 'المتجر', about: 'عنا', contact: 'اتصل', cart: 'السلة' },
    hero: {
      badge: '✦ حزم متميزة يتم توصيلها',
      title1: 'كل ما', title2: 'تحتاجه.', title3: 'صندوق واحد.',
      subtitle: 'حزم منسقة لكل لحظة. من أساسيات المدرسة إلى سحر الأعياد.',
      shopNow: 'تسوق الآن', learnMore: 'اعرف المزيد'
    },
    products: {
      title: 'حزمنا', subtitle: 'منسقة بعناية. يتم توصيلها بسرعة.',
      addToCart: 'أضف للسلة', all: 'الكل'
    },
    about: {
      badge: 'عنا', title: 'نحن نحزم.\nأنت تفتح الفرح.',
      text: 'ولدت Ark Global Supply من فكرة بسيطة: شراء عناصر متعددة لا ينبغي أن يكون مهمة شاقة.',
      features: [
        { icon: '📦', title: 'شحن سريع', desc: 'توصيل 2-5 أيام' },
        { icon: '✨', title: 'جودة متميزة', desc: 'عناصر مختارة' },
        { icon: '🔄', title: 'إرجاع سهل', desc: 'ضمان 30 يوم' },
        { icon: '💬', title: 'دعم 24/7', desc: 'دائماً هنا للمساعدة' }
      ]
    },
    contact: {
      title: 'تواصل معنا', subtitle: 'أسئلة؟ أفكار؟ نحب أن نسمع منك.',
      email: 'بريدك الإلكتروني', message: 'رسالتك', send: 'إرسال'
    },
    newsletter: {
      title: 'اشترك في نشرتنا', subtitle: 'احصل على عروض حصرية.',
      placeholder: 'بريدك الإلكتروني', button: 'اشترك', success: 'شكراً للاشتراك!'
    },
    cart: {
      title: 'سلتك', empty: 'سلتك فارغة', remove: 'إزالة',
      subtotal: 'المجموع الفرعي', shipping: 'الشحن', shippingValue: 'مجاني', total: 'المجموع',
      checkout: 'الدفع', secure: 'دفع آمن عبر Stripe',
      eta: 'التوصيل المتوقع'
    },
    shipping: { calculating: 'جاري الحساب...', days: 'أيام عمل', free: 'مجاني' },
    footer: { rights: 'جميع الحقوق محفوظة.' },
    stats: [
      { value: '10K+', label: 'عملاء سعداء' },
      { value: '500+', label: 'منتجات محزومة' },
      { value: '4.9', label: 'متوسط التقييم' }
    ]
  },
  ja: {
    nav: { shop: 'ショップ', about: '私たちについて', contact: 'お問い合わせ', cart: 'カート' },
    hero: {
      badge: '✦ プレミアムバンドルをお届け',
      title1: '必要なもの', title2: 'すべてが。', title3: 'ひとつの箱に。',
      subtitle: 'あらゆる瞬間のために厳選されたバンドル。新学期の必需品からホリデーの魔法まで。',
      shopNow: '今すぐ購入', learnMore: '詳細を見る'
    },
    products: {
      title: 'バンドル', subtitle: '心を込めて厳選。迅速にお届け。',
      addToCart: 'カートに追加', all: 'すべて'
    },
    about: {
      badge: '私たちについて', title: '私たちが梱包。\nあなたは喜びを開封。',
      text: 'Ark Global Supplyはシンプルなアイデアから生まれました。複数のアイテムを購入することは面倒であるべきではありません。',
      features: [
        { icon: '📦', title: '迅速配送', desc: '2-5日でお届け' },
        { icon: '✨', title: 'プレミアム品質', desc: '厳選されたアイテム' },
        { icon: '🔄', title: '簡単返品', desc: '30日保証' },
        { icon: '💬', title: '24/7サポート', desc: 'いつでもお手伝い' }
      ]
    },
    contact: {
      title: 'お問い合わせ', subtitle: 'ご質問は？アイデアは？お気軽にどうぞ。',
      email: 'メールアドレス', message: 'メッセージ', send: '送信'
    },
    newsletter: {
      title: 'ニュースレター登録', subtitle: '限定オファーを受け取る。',
      placeholder: 'メールアドレス', button: '登録', success: 'ご登録ありがとうございます！'
    },
    cart: {
      title: 'カート', empty: 'カートは空です', remove: '削除',
      subtotal: '小計', shipping: '送料', shippingValue: '無料', total: '合計',
      checkout: '購入手続き', secure: 'Stripeによる安全な決済',
      eta: 'お届け予定'
    },
    shipping: { calculating: '計算中...', days: '営業日', free: '無料' },
    footer: { rights: '全著作権所有。' },
    stats: [
      { value: '10K+', label: '満足したお客様' },
      { value: '500+', label: '梱包製品' },
      { value: '4.9', label: '平均評価' }
    ]
  }
};

// Countries with shipping info and currency
const COUNTRIES = {
  US: { name: 'United States', currency: 'USD', symbol: '$', rate: 1, etaDays: [2, 5], flag: '🇺🇸' },
  GB: { name: 'United Kingdom', currency: 'GBP', symbol: '£', rate: 0.79, etaDays: [5, 8], flag: '🇬🇧' },
  EU: { name: 'Europe', currency: 'EUR', symbol: '€', rate: 0.92, etaDays: [5, 10], flag: '🇪🇺' },
  CA: { name: 'Canada', currency: 'CAD', symbol: 'C$', rate: 1.36, etaDays: [4, 7], flag: '🇨🇦' },
  AU: { name: 'Australia', currency: 'AUD', symbol: 'A$', rate: 1.53, etaDays: [7, 12], flag: '🇦🇺' },
  JP: { name: 'Japan', currency: 'JPY', symbol: '¥', rate: 149, etaDays: [6, 10], flag: '🇯🇵' },
  CN: { name: 'China', currency: 'CNY', symbol: '¥', rate: 7.24, etaDays: [7, 14], flag: '🇨🇳' },
  BR: { name: 'Brazil', currency: 'BRL', symbol: 'R$', rate: 4.97, etaDays: [10, 15], flag: '🇧🇷' },
  MX: { name: 'Mexico', currency: 'MXN', symbol: '$', rate: 17.15, etaDays: [5, 10], flag: '🇲🇽' },
  DE: { name: 'Germany', currency: 'EUR', symbol: '€', rate: 0.92, etaDays: [5, 8], flag: '🇩🇪' },
  FR: { name: 'France', currency: 'EUR', symbol: '€', rate: 0.92, etaDays: [5, 8], flag: '🇫🇷' },
  AE: { name: 'UAE', currency: 'AED', symbol: 'د.إ', rate: 3.67, etaDays: [6, 10], flag: '🇦🇪' },
  SA: { name: 'Saudi Arabia', currency: 'SAR', symbol: '﷼', rate: 3.75, etaDays: [6, 10], flag: '🇸🇦' },
  IN: { name: 'India', currency: 'INR', symbol: '₹', rate: 83.12, etaDays: [8, 14], flag: '🇮🇳' },
  SG: { name: 'Singapore', currency: 'SGD', symbol: 'S$', rate: 1.34, etaDays: [5, 8], flag: '🇸🇬' }
};

const DEFAULT_PRODUCTS = [
  { id: 1, name: "Back to School Essentials", description: "Everything they need to crush the new year. Notebooks, pens, folders, calculator & more.", price: 49.99, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80", tag: "BESTSELLER", category: "kids" },
  { id: 2, name: "Ultimate Christmas Bundle", description: "Festive magic delivered. Decorations, lights, stockings, and holiday surprises.", price: 89.99, image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&auto=format&fit=crop&q=80", tag: "SEASONAL", category: "holiday" },
  { id: 3, name: "Kids Creative Pack", description: "Unleash imagination. Art supplies, craft materials, coloring books & creative tools.", price: 39.99, image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&auto=format&fit=crop&q=80", tag: "POPULAR", category: "kids" },
  { id: 4, name: "Home Office Starter", description: "Work from anywhere. Desk organizers, tech accessories, and productivity essentials.", price: 79.99, image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&auto=format&fit=crop&q=80", tag: "NEW", category: "office" },
  { id: 5, name: "Birthday Party Pack", description: "Instant celebration. Decorations, tableware, balloons, and party favors for 12.", price: 34.99, image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80", tag: "FUN", category: "party" },
  { id: 6, name: "Premium Gift Box", description: "Luxury curated. Hand-picked premium items beautifully packaged for gifting.", price: 129.99, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80", tag: "LUXURY", category: "gift" }
];

const THEMES = {
  midnight: { name: "Midnight", bg: "#000000", bgSecondary: "rgba(255,255,255,0.03)", text: "#ffffff", textMuted: "rgba(255,255,255,0.5)", accent1: "#7c3aed", accent2: "#db2777", gradient: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)", glow: "rgba(124, 58, 237, 0.3)", border: "rgba(255,255,255,0.1)" },
  ocean: { name: "Ocean", bg: "#0a1628", bgSecondary: "rgba(255,255,255,0.03)", text: "#ffffff", textMuted: "rgba(255,255,255,0.5)", accent1: "#0ea5e9", accent2: "#06b6d4", gradient: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)", glow: "rgba(14, 165, 233, 0.3)", border: "rgba(255,255,255,0.1)" },
  sunset: { name: "Sunset", bg: "#1a0a0a", bgSecondary: "rgba(255,255,255,0.03)", text: "#ffffff", textMuted: "rgba(255,255,255,0.5)", accent1: "#f97316", accent2: "#ef4444", gradient: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)", glow: "rgba(249, 115, 22, 0.3)", border: "rgba(255,255,255,0.1)" },
  forest: { name: "Forest", bg: "#0a1410", bgSecondary: "rgba(255,255,255,0.03)", text: "#ffffff", textMuted: "rgba(255,255,255,0.5)", accent1: "#10b981", accent2: "#14b8a6", gradient: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)", glow: "rgba(16, 185, 129, 0.3)", border: "rgba(255,255,255,0.1)" },
  royal: { name: "Royal", bg: "#0f0a1a", bgSecondary: "rgba(255,255,255,0.03)", text: "#ffffff", textMuted: "rgba(255,255,255,0.5)", accent1: "#8b5cf6", accent2: "#a855f7", gradient: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)", glow: "rgba(139, 92, 246, 0.3)", border: "rgba(255,255,255,0.1)" },
  cream: { name: "Cream", bg: "#faf7f2", bgSecondary: "rgba(0,0,0,0.03)", text: "#1a1a1a", textMuted: "rgba(26,26,26,0.6)", accent1: "#7c3aed", accent2: "#db2777", gradient: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)", glow: "rgba(124, 58, 237, 0.2)", border: "rgba(0,0,0,0.08)" }
};

// Image Upload Component
const ImageUpload = ({ currentImage, onImageChange, theme }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) uploadImage(files[0]);
  };

  const uploadImage = async (file) => {
    if (!file.type.startsWith('image/')) { alert('Please select an image file'); return; }
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=c08b37c3a5e1478cb0e50d3afb33db3e', { method: 'POST', body: formData });
      const data = await response.json();
      if (data.success) { onImageChange(data.data.url); }
      else { const reader = new FileReader(); reader.onload = (e) => onImageChange(e.target.result); reader.readAsDataURL(file); }
    } catch (error) {
      const reader = new FileReader(); reader.onload = (e) => onImageChange(e.target.result); reader.readAsDataURL(file);
    }
    setIsUploading(false);
  };

  return (
    <div onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
      style={{ border: `2px dashed ${isDragging ? theme.accent1 : theme.border}`, borderRadius: 12, padding: 20, textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', background: isDragging ? `${theme.accent1}11` : 'transparent' }}>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => e.target.files[0] && uploadImage(e.target.files[0])} style={{ display: 'none' }} />
      {isUploading ? (
        <div style={{ padding: 20 }}><div style={{ width: 40, height: 40, border: `3px solid ${theme.border}`, borderTopColor: theme.accent1, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} /><div style={{ color: theme.textMuted, fontSize: 14 }}>Uploading...</div></div>
      ) : currentImage ? (
        <div><img src={currentImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: 120, borderRadius: 8, marginBottom: 8 }} /><div style={{ color: theme.textMuted, fontSize: 11 }}>Click or drag to replace</div></div>
      ) : (
        <div style={{ padding: 15 }}><div style={{ fontSize: 28, marginBottom: 6 }}>📷</div><div style={{ color: theme.text, fontWeight: 600, fontSize: 13 }}>Drop image here</div><div style={{ color: theme.textMuted, fontSize: 11 }}>or click to browse</div></div>
      )}
    </div>
  );
};

export default function ArkGlobalSupply() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [notification, setNotification] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('midnight');
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminTab, setAdminTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '', tag: '', category: '' });
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  
  // Internationalization
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('US');
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  
  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  
  // Settings
  const [settings, setSettings] = useState({
    storeName: 'ARK GLOBAL SUPPLY',
    heroImage: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop&q=80',
    aboutImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80'
  });

  const theme = THEMES[currentTheme];
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const countryData = COUNTRIES[country];
  const isRTL = language === 'ar';

  // Format price with currency
  const formatPrice = (usdPrice) => {
    const converted = usdPrice * countryData.rate;
    if (countryData.currency === 'JPY') return `${countryData.symbol}${Math.round(converted)}`;
    return `${countryData.symbol}${converted.toFixed(2)}`;
  };

  // Get ETA string
  const getETA = () => {
    const [min, max] = countryData.etaDays;
    return `${min}-${max} ${t.shipping.days}`;
  };

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['hero', 'products', 'about', 'newsletter', 'contact'];
      const newVisible = {};
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) { const rect = el.getBoundingClientRect(); newVisible[id] = rect.top < window.innerHeight * 0.75; }
      });
      setVisibleSections(newVisible);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load saved data
  useEffect(() => {
    setIsLoaded(true);
    const saved = {
      theme: localStorage.getItem('ark-theme'),
      products: localStorage.getItem('ark-products'),
      settings: localStorage.getItem('ark-settings'),
      language: localStorage.getItem('ark-language'),
      country: localStorage.getItem('ark-country'),
      subscribers: localStorage.getItem('ark-subscribers')
    };
    if (saved.theme && THEMES[saved.theme]) setCurrentTheme(saved.theme);
    if (saved.products) try { setProducts(JSON.parse(saved.products)); } catch (e) {}
    if (saved.settings) try { setSettings(s => ({ ...s, ...JSON.parse(saved.settings) })); } catch (e) {}
    if (saved.language && LANGUAGES[saved.language]) setLanguage(saved.language);
    if (saved.country && COUNTRIES[saved.country]) setCountry(saved.country);
    if (saved.subscribers) try { setSubscribers(JSON.parse(saved.subscribers)); } catch (e) {}
  }, []);

  // Save data
  useEffect(() => { localStorage.setItem('ark-theme', currentTheme); }, [currentTheme]);
  useEffect(() => { localStorage.setItem('ark-products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('ark-settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('ark-language', language); }, [language]);
  useEffect(() => { localStorage.setItem('ark-country', country); }, [country]);
  useEffect(() => { localStorage.setItem('ark-subscribers', JSON.stringify(subscribers)); }, [subscribers]);

  const showNotif = (msg) => { setNotification(msg); setTimeout(() => setNotification(null), 2500); };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    showNotif(`${product.name} added!`);
  };

  const removeFromCart = (productId) => setCart(prev => prev.filter(item => item.id !== productId));
  const updateQuantity = (productId, delta) => setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter(item => item.quantity > 0));

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) { setAdminAuth(true); setAdminPassword(''); }
    else alert('Incorrect password');
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) { alert('Please fill in name and price'); return; }
    setProducts(prev => [...prev, { ...newProduct, id: Date.now(), price: parseFloat(newProduct.price) }]);
    setNewProduct({ name: '', description: '', price: '', image: '', tag: '', category: '' });
    showNotif('Product added!');
  };

  const deleteProduct = (id) => { if (confirm('Delete this product?')) setProducts(prev => prev.filter(p => p.id !== id)); };
  const updateProduct = () => {
    if (!editingProduct) return;
    setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...editingProduct, price: parseFloat(editingProduct.price) } : p));
    setEditingProduct(null);
    showNotif('Product updated!');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) { alert('Please enter a valid email'); return; }
    if (subscribers.includes(newsletterEmail)) { alert('Already subscribed!'); return; }
    setSubscribers(prev => [...prev, newsletterEmail]);
    setNewsletterEmail('');
    setNewsletterSuccess(true);
    setTimeout(() => setNewsletterSuccess(false), 3000);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: "'Inter', -apple-system, sans-serif", position: 'relative', overflow: 'hidden', transition: 'all 0.5s' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Animated BG */}
      <div style={{ position: 'fixed', inset: 0, background: `radial-gradient(ellipse at 20% 20%, ${theme.accent1}22 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, ${theme.accent2}18 0%, transparent 50%)`, pointerEvents: 'none', zIndex: 0 }} />
      
      {/* Particles */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {[...Array(25)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', width: Math.random() * 5 + 2, height: Math.random() * 5 + 2, background: i % 2 === 0 ? theme.accent1 : theme.accent2, borderRadius: '50%', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: 0.2, animation: `float ${15 + Math.random() * 20}s ease-in-out infinite`, animationDelay: `${Math.random() * 10}s` }} />
        ))}
      </div>

      {/* Notification */}
      {notification && (
        <div style={{ position: 'fixed', top: 90, right: 24, background: theme.gradient, color: '#fff', padding: '14px 22px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, animation: 'slideIn 0.3s ease', boxShadow: `0 20px 40px ${theme.glow}` }}>✓ {notification}</div>
      )}

      {/* Header */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '14px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: scrollY > 50 ? `${theme.bg}ee` : 'transparent', backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none', borderBottom: scrollY > 50 ? `1px solid ${theme.border}` : '1px solid transparent', transition: 'all 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, background: theme.gradient, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff' }}>{settings.storeName.charAt(0)}</div>
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>{settings.storeName}</span>
        </div>

        <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="#products" style={{ color: theme.textMuted, textDecoration: 'none', fontSize: 13, fontWeight: 500, padding: '6px 10px' }}>{t.nav.shop}</a>
          <a href="#about" style={{ color: theme.textMuted, textDecoration: 'none', fontSize: 13, fontWeight: 500, padding: '6px 10px' }}>{t.nav.about}</a>
          <a href="#contact" style={{ color: theme.textMuted, textDecoration: 'none', fontSize: 13, fontWeight: 500, padding: '6px 10px' }}>{t.nav.contact}</a>
          
          {/* Language Picker */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setShowLangPicker(!showLangPicker); setShowCountryPicker(false); setShowThemePicker(false); }} style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 8, padding: '8px 12px', color: theme.text, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              {LANGUAGES[language].flag} <span style={{ fontSize: 11 }}>▼</span>
            </button>
            {showLangPicker && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 8, zIndex: 150, minWidth: 140, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                {Object.entries(LANGUAGES).map(([code, lang]) => (
                  <button key={code} onClick={() => { setLanguage(code); setShowLangPicker(false); }} style={{ width: '100%', padding: '10px 12px', background: language === code ? theme.gradient : 'transparent', color: language === code ? '#fff' : theme.text, border: 'none', borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Country Picker */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setShowCountryPicker(!showCountryPicker); setShowLangPicker(false); setShowThemePicker(false); }} style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 8, padding: '8px 12px', color: theme.text, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              {countryData.flag} {countryData.symbol} <span style={{ fontSize: 11 }}>▼</span>
            </button>
            {showCountryPicker && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 8, zIndex: 150, minWidth: 180, maxHeight: 300, overflow: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                {Object.entries(COUNTRIES).map(([code, c]) => (
                  <button key={code} onClick={() => { setCountry(code); setShowCountryPicker(false); }} style={{ width: '100%', padding: '10px 12px', background: country === code ? theme.gradient : 'transparent', color: country === code ? '#fff' : theme.text, border: 'none', borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    {c.flag} {c.name} ({c.symbol})
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => { setShowThemePicker(!showThemePicker); setShowLangPicker(false); setShowCountryPicker(false); }} style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 8, padding: '8px 12px', color: theme.text, cursor: 'pointer', fontSize: 14 }}>🎨</button>
          <button onClick={() => setShowAdmin(true)} style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 8, padding: '8px 12px', color: theme.text, cursor: 'pointer', fontSize: 14 }}>⚙️</button>
          
          <button onClick={() => setIsCartOpen(true)} style={{ position: 'relative', background: theme.gradient, border: 'none', borderRadius: 10, padding: '10px 18px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}>
            🛒 {t.nav.cart}
            {cartCount > 0 && <span style={{ position: 'absolute', top: -6, right: -6, background: '#fff', color: theme.accent1, fontSize: 11, fontWeight: 700, width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
          </button>
        </nav>
      </header>

      {/* Theme Picker */}
      {showThemePicker && (
        <>
          <div onClick={() => setShowThemePicker(false)} style={{ position: 'fixed', inset: 0, zIndex: 140 }} />
          <div style={{ position: 'fixed', top: 70, right: 180, background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16, zIndex: 150, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ fontSize: 11, color: theme.textMuted, marginBottom: 10, fontWeight: 600 }}>THEME</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {Object.entries(THEMES).map(([key, t]) => (
                <button key={key} onClick={() => { setCurrentTheme(key); setShowThemePicker(false); }} style={{ width: 50, height: 50, borderRadius: 10, border: currentTheme === key ? `2px solid ${t.accent1}` : `1px solid ${theme.border}`, background: t.bg, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: t.gradient }} />
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Admin Panel */}
      {showAdmin && (
        <>
          <div onClick={() => { setShowAdmin(false); setAdminAuth(false); }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 200 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 0, zIndex: 201, width: '95%', maxWidth: 900, maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme.bgSecondary }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>⚙️ Admin Panel</h2>
              <button onClick={() => { setShowAdmin(false); setAdminAuth(false); }} style={{ background: 'transparent', border: 'none', color: theme.text, fontSize: 22, cursor: 'pointer' }}>×</button>
            </div>

            {!adminAuth ? (
              <div style={{ textAlign: 'center', padding: 50 }}>
                <div style={{ fontSize: 50, marginBottom: 16 }}>🔐</div>
                <p style={{ color: theme.textMuted, marginBottom: 20 }}>Enter admin password</p>
                <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()} placeholder="Password" style={{ width: '100%', maxWidth: 280, padding: 14, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, fontSize: 16, marginBottom: 16, outline: 'none', textAlign: 'center' }} />
                <br />
                <button onClick={handleAdminLogin} style={{ background: theme.gradient, border: 'none', borderRadius: 10, padding: '12px 36px', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Login</button>
              </div>
            ) : (
              <div style={{ display: 'flex', height: 'calc(90vh - 60px)' }}>
                <div style={{ width: 180, borderRight: `1px solid ${theme.border}`, padding: 12, background: theme.bgSecondary }}>
                  {[
                    { id: 'products', icon: '📦', label: 'Products' },
                    { id: 'settings', icon: '⚙️', label: 'Settings' },
                    { id: 'subscribers', icon: '📧', label: `Subscribers (${subscribers.length})` }
                  ].map(tab => (
                    <button key={tab.id} onClick={() => setAdminTab(tab.id)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: 'none', background: adminTab === tab.id ? theme.gradient : 'transparent', color: adminTab === tab.id ? '#fff' : theme.text, fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'left', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                </div>
                <div style={{ flex: 1, padding: 20, overflow: 'auto' }}>
                  {adminTab === 'products' && (
                    <div>
                      <div style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 18, marginBottom: 20 }}>
                        <h3 style={{ margin: '0 0 14px', fontSize: 15 }}>➕ Add Product</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                          <input placeholder="Name *" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} style={{ padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none', fontSize: 13 }} />
                          <input placeholder="Price (USD) *" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} style={{ padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none', fontSize: 13 }} />
                          <input placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} style={{ padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none', fontSize: 13 }} />
                          <input placeholder="Tag" value={newProduct.tag} onChange={(e) => setNewProduct({ ...newProduct, tag: e.target.value })} style={{ padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none', fontSize: 13 }} />
                        </div>
                        <textarea placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none', resize: 'none', height: 50, fontFamily: 'inherit', fontSize: 13, boxSizing: 'border-box' }} />
                        <div style={{ marginTop: 10 }}><ImageUpload currentImage={newProduct.image} onImageChange={(url) => setNewProduct({ ...newProduct, image: url })} theme={theme} /></div>
                        <button onClick={addProduct} style={{ marginTop: 14, background: theme.gradient, border: 'none', borderRadius: 8, padding: '10px 20px', color: '#fff', fontWeight: 600, cursor: 'pointer', width: '100%', fontSize: 13 }}>Add Product</button>
                      </div>
                      <h3 style={{ margin: '0 0 14px', fontSize: 15 }}>📦 Products ({products.length})</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {products.map(product => (
                          <div key={product.id} style={{ display: 'flex', gap: 14, background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 14, alignItems: 'center' }}>
                            <img src={product.image || 'https://via.placeholder.com/50'} alt="" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 6 }} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 600, fontSize: 14 }}>{product.name}</div>
                              <div style={{ fontSize: 12, color: theme.textMuted }}>${product.price} • {product.category || 'Uncategorized'}</div>
                            </div>
                            <button onClick={() => setEditingProduct({ ...product })} style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 6, padding: '6px 12px', color: theme.text, cursor: 'pointer', fontSize: 12 }}>Edit</button>
                            <button onClick={() => deleteProduct(product.id)} style={{ background: '#ef4444', border: 'none', borderRadius: 6, padding: '6px 12px', color: '#fff', cursor: 'pointer', fontSize: 12 }}>Delete</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {adminTab === 'settings' && (
                    <div>
                      <h3 style={{ margin: '0 0 16px', fontSize: 15 }}>⚙️ Store Settings</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div>
                          <label style={{ fontSize: 11, color: theme.textMuted, marginBottom: 5, display: 'block' }}>Store Name</label>
                          <input value={settings.storeName} onChange={(e) => setSettings({ ...settings, storeName: e.target.value })} style={{ width: '100%', padding: 12, borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: 11, color: theme.textMuted, marginBottom: 5, display: 'block' }}>Hero Image</label>
                          <ImageUpload currentImage={settings.heroImage} onImageChange={(url) => setSettings({ ...settings, heroImage: url })} theme={theme} />
                        </div>
                        <div>
                          <label style={{ fontSize: 11, color: theme.textMuted, marginBottom: 5, display: 'block' }}>About Image</label>
                          <ImageUpload currentImage={settings.aboutImage} onImageChange={(url) => setSettings({ ...settings, aboutImage: url })} theme={theme} />
                        </div>
                      </div>
                    </div>
                  )}
                  {adminTab === 'subscribers' && (
                    <div>
                      <h3 style={{ margin: '0 0 16px', fontSize: 15 }}>📧 Newsletter Subscribers ({subscribers.length})</h3>
                      {subscribers.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: 40, color: theme.textMuted }}>
                          <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
                          <p>No subscribers yet</p>
                        </div>
                      ) : (
                        <div style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 10, overflow: 'hidden' }}>
                          {subscribers.map((email, i) => (
                            <div key={i} style={{ padding: '12px 16px', borderBottom: i < subscribers.length - 1 ? `1px solid ${theme.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: 14 }}>{email}</span>
                              <button onClick={() => setSubscribers(prev => prev.filter((_, idx) => idx !== i))} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 12 }}>Remove</button>
                            </div>
                          ))}
                        </div>
                      )}
                      <button onClick={() => { const csv = subscribers.join('\n'); const blob = new Blob([csv], { type: 'text/csv' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'subscribers.csv'; a.click(); }} style={{ marginTop: 16, background: theme.gradient, border: 'none', borderRadius: 8, padding: '10px 20px', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 13 }} disabled={subscribers.length === 0}>
                        Export CSV
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <>
          <div onClick={() => setEditingProduct(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 250 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 24, zIndex: 251, width: '90%', maxWidth: 450 }}>
            <h3 style={{ margin: '0 0 18px', fontSize: 16 }}>✏️ Edit Product</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input placeholder="Name" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} style={{ padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, outline: 'none', fontSize: 13 }} />
              <input placeholder="Price" type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} style={{ padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, outline: 'none', fontSize: 13 }} />
              <input placeholder="Category" value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} style={{ padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, outline: 'none', fontSize: 13 }} />
              <input placeholder="Tag" value={editingProduct.tag} onChange={(e) => setEditingProduct({ ...editingProduct, tag: e.target.value })} style={{ padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, outline: 'none', fontSize: 13 }} />
              <textarea placeholder="Description" value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} style={{ padding: 10, borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, outline: 'none', resize: 'none', height: 60, fontFamily: 'inherit', fontSize: 13 }} />
              <ImageUpload currentImage={editingProduct.image} onImageChange={(url) => setEditingProduct({ ...editingProduct, image: url })} theme={theme} />
              <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                <button onClick={() => setEditingProduct(null)} style={{ flex: 1, background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 8, padding: 12, color: theme.text, cursor: 'pointer', fontSize: 13 }}>Cancel</button>
                <button onClick={updateProduct} style={{ flex: 1, background: theme.gradient, border: 'none', borderRadius: 8, padding: 12, color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>Save</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Hero */}
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 30px 60px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1300, width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div style={{ display: 'inline-block', background: `${theme.accent1}33`, border: `1px solid ${theme.accent1}55`, borderRadius: 100, padding: '8px 14px', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 22, color: theme.accent1 }}>{t.hero.badge}</div>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
              <span style={{ display: 'block' }}>{t.hero.title1}</span>
              <span style={{ display: 'block' }}>{t.hero.title2}</span>
              <span style={{ display: 'block', background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t.hero.title3}</span>
            </h1>
            <p style={{ fontSize: 16, color: theme.textMuted, lineHeight: 1.7, margin: '26px 0', maxWidth: 450 }}>{t.hero.subtitle}</p>
            <div style={{ display: 'flex', gap: 14 }}>
              <a href="#products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: theme.gradient, color: '#fff', padding: '16px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: `0 16px 32px ${theme.glow}` }}>{t.hero.shopNow} →</a>
              <a href="#about" style={{ display: 'inline-flex', alignItems: 'center', background: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.text, padding: '16px 28px', borderRadius: 12, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>{t.hero.learnMore}</a>
            </div>
            <div style={{ display: 'flex', gap: 40, marginTop: 50, paddingTop: 26, borderTop: `1px solid ${theme.border}` }}>
              {t.stats.map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
                  <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 3 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(50px)', transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s' }}>
            <div style={{ position: 'absolute', inset: -30, background: theme.gradient, opacity: 0.35, borderRadius: 30, filter: 'blur(50px)', zIndex: -1, animation: 'pulse 4s ease-in-out infinite' }} />
            <div style={{ background: `linear-gradient(135deg, ${theme.border} 0%, transparent 100%)`, border: `1px solid ${theme.border}`, borderRadius: 28, padding: 20, backdropFilter: 'blur(20px)' }}>
              <img src={settings.heroImage} alt="Bundle" style={{ width: '100%', height: 360, objectFit: 'cover', borderRadius: 18 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }}>
                <div>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginBottom: 3 }}>FEATURED</div>
                  <div style={{ fontSize: 17, fontWeight: 700 }}>Holiday Collection</div>
                </div>
                <div style={{ background: theme.gradient, padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, color: '#fff' }}>{t.hero.shopNow}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" style={{ padding: '100px 30px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50, opacity: visibleSections.products ? 1 : 0, transform: visibleSections.products ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s' }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>{t.products.title}</h2>
            <p style={{ fontSize: 16, color: theme.textMuted, marginTop: 14 }}>{t.products.subtitle}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '10px 20px', borderRadius: 100, border: 'none', background: activeCategory === cat ? theme.gradient : theme.bgSecondary, color: activeCategory === cat ? '#fff' : theme.text, fontSize: 13, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
                {cat === 'all' ? t.products.all : cat}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 26 }}>
            {filteredProducts.map((product, index) => (
              <div key={product.id} style={{ background: `linear-gradient(135deg, ${theme.bgSecondary} 0%, transparent 100%)`, border: `1px solid ${theme.border}`, borderRadius: 20, overflow: 'hidden', transition: 'all 0.4s', cursor: 'pointer', opacity: visibleSections.products ? 1 : 0, transform: visibleSections.products ? 'translateY(0)' : 'translateY(40px)', transitionDelay: `${index * 0.08}s` }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.3)'; e.currentTarget.style.borderColor = theme.accent1; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = theme.border; }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name} style={{ width: '100%', height: 240, objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={e => e.target.style.transform = 'scale(1.08)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  {product.tag && <div style={{ position: 'absolute', top: 14, left: 14, background: theme.gradient, padding: '6px 12px', borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', color: '#fff' }}>{product.tag}</div>}
                </div>
                <div style={{ padding: 22 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{product.name}</h3>
                  <p style={{ fontSize: 13, color: theme.textMuted, margin: '10px 0 16px', lineHeight: 1.5 }}>{product.description}</p>
                  <div style={{ fontSize: 11, color: theme.accent1, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                    🚚 {t.cart.eta}: {getETA()}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif" }}>{formatPrice(product.price)}</div>
                    <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} style={{ display: 'flex', alignItems: 'center', gap: 6, background: theme.gradient, border: 'none', borderRadius: 10, padding: '12px 20px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: `0 8px 24px ${theme.glow}` }}>
                      + {t.products.addToCart}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '100px 30px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div style={{ opacity: visibleSections.about ? 1 : 0, transform: visibleSections.about ? 'translateX(0)' : 'translateX(-40px)', transition: 'all 0.8s' }}>
            <div style={{ display: 'inline-block', background: `${theme.accent1}33`, border: `1px solid ${theme.accent1}55`, borderRadius: 100, padding: '6px 14px', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 20, color: theme.accent1 }}>{t.about.badge}</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 20px', fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'pre-line' }}>{t.about.title}</h2>
            <p style={{ fontSize: 16, color: theme.textMuted, lineHeight: 1.8 }}>{t.about.text}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 36 }}>
              {t.about.features.map((item, i) => (
                <div key={i} style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 20, transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = theme.accent1; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.border; }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: theme.textMuted }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', opacity: visibleSections.about ? 1 : 0, transform: visibleSections.about ? 'translateX(0)' : 'translateX(40px)', transition: 'all 0.8s 0.2s' }}>
            <div style={{ position: 'absolute', inset: -20, background: theme.gradient, opacity: 0.25, borderRadius: 28, filter: 'blur(35px)', zIndex: -1 }} />
            <img src={settings.aboutImage} alt="About" style={{ width: '100%', height: 420, objectFit: 'cover', borderRadius: 20, border: `1px solid ${theme.border}` }} />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" style={{ padding: '80px 30px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', opacity: visibleSections.newsletter ? 1 : 0, transform: visibleSections.newsletter ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s' }}>
          <div style={{ background: theme.gradient, opacity: 0.15, position: 'absolute', inset: 0, filter: 'blur(100px)', zIndex: -1 }} />
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px', fontFamily: "'Space Grotesk', sans-serif" }}>{t.newsletter.title}</h2>
          <p style={{ fontSize: 15, color: theme.textMuted, marginBottom: 30 }}>{t.newsletter.subtitle}</p>
          <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: 12, maxWidth: 450, margin: '0 auto' }}>
            <input type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder={t.newsletter.placeholder} style={{ flex: 1, background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '16px 20px', color: theme.text, fontSize: 15, outline: 'none' }} />
            <button type="submit" style={{ background: theme.gradient, border: 'none', borderRadius: 12, padding: '16px 28px', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: `0 12px 28px ${theme.glow}` }}>{t.newsletter.button}</button>
          </form>
          {newsletterSuccess && <div style={{ marginTop: 16, color: theme.accent1, fontWeight: 600 }}>✓ {t.newsletter.success}</div>}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '80px 30px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 550, margin: '0 auto', textAlign: 'center', opacity: visibleSections.contact ? 1 : 0, transform: visibleSections.contact ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s' }}>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 12px', fontFamily: "'Space Grotesk', sans-serif" }}>{t.contact.title}</h2>
          <p style={{ fontSize: 15, color: theme.textMuted, marginBottom: 36 }}>{t.contact.subtitle}</p>
          <div style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 32 }}>
            <input type="email" placeholder={t.contact.email} style={{ width: '100%', background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 16, color: theme.text, fontSize: 15, marginBottom: 14, outline: 'none', boxSizing: 'border-box' }} />
            <textarea placeholder={t.contact.message} rows={4} style={{ width: '100%', background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 16, color: theme.text, fontSize: 15, marginBottom: 14, outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            <button style={{ width: '100%', background: theme.gradient, border: 'none', borderRadius: 10, padding: 16, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: `0 16px 32px ${theme.glow}` }}>{t.contact.send}</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '50px 30px', borderTop: `1px solid ${theme.border}`, position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, background: theme.gradient, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff' }}>{settings.storeName.charAt(0)}</div>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{settings.storeName}</span>
          </div>
          <div style={{ color: theme.textMuted, fontSize: 13 }}>© 2024 {settings.storeName}. {t.footer.rights}</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Twitter', 'Instagram', 'Facebook'].map(s => <a key={s} href="#" style={{ color: theme.textMuted, fontSize: 13, textDecoration: 'none' }}>{s}</a>)}
          </div>
        </div>
      </footer>

      {/* Cart */}
      {isCartOpen && (
        <>
          <div onClick={() => setIsCartOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 200 }} />
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 420, background: theme.bg, borderLeft: `1px solid ${theme.border}`, zIndex: 201, display: 'flex', flexDirection: 'column', animation: 'slideInRight 0.3s ease' }}>
            <div style={{ padding: 20, borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{t.cart.title} ({cartCount})</h3>
              <button onClick={() => setIsCartOpen(false)} style={{ background: theme.bgSecondary, border: 'none', borderRadius: 8, width: 36, height: 36, color: theme.text, cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 50, color: theme.textMuted }}>
                  <div style={{ fontSize: 44, marginBottom: 14 }}>🛒</div>
                  <p>{t.cart.empty}</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: 14, background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 14 }}>
                      <img src={item.image || 'https://via.placeholder.com/70'} alt={item.name} style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 10 }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 3px', fontSize: 14, fontWeight: 600 }}>{item.name}</h4>
                        <div style={{ color: theme.textMuted, fontSize: 13 }}>{formatPrice(item.price)}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${theme.border}`, background: 'transparent', color: theme.text, cursor: 'pointer', fontSize: 14 }}>−</button>
                          <span style={{ fontWeight: 600, fontSize: 13 }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${theme.border}`, background: 'transparent', color: theme.text, cursor: 'pointer', fontSize: 14 }}>+</button>
                          <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: theme.textMuted, cursor: 'pointer', fontSize: 11 }}>{t.cart.remove}</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div style={{ padding: 20, borderTop: `1px solid ${theme.border}`, background: `${theme.bg}cc` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13, color: theme.textMuted }}><span>{t.cart.subtotal}</span><span>{formatPrice(cartTotal)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13, color: theme.textMuted }}><span>{t.cart.shipping}</span><span>{t.cart.shippingValue}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, color: theme.accent1 }}><span>{t.cart.eta}</span><span>{getETA()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, fontSize: 18, fontWeight: 700, paddingTop: 14, borderTop: `1px solid ${theme.border}` }}><span>{t.cart.total}</span><span>{formatPrice(cartTotal)}</span></div>
                <button onClick={() => alert(`Ready for Stripe!\n\nTotal: ${formatPrice(cartTotal)}\nItems: ${cartCount}\nCountry: ${countryData.name}\nETA: ${getETA()}`)} style={{ width: '100%', background: theme.gradient, border: 'none', borderRadius: 12, padding: 16, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: `0 16px 32px ${theme.glow}` }}>{t.cart.checkout} — {formatPrice(cartTotal)}</button>
                <p style={{ textAlign: 'center', fontSize: 11, color: theme.textMuted, marginTop: 14 }}>{t.cart.secure}</p>
              </div>
            )}
          </div>
        </>
      )}

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(100px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes pulse { 0%, 100% { opacity: 0.35; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.02); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::placeholder { color: ${theme.textMuted}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 3px; }
      `}</style>
    </div>
  );
}
