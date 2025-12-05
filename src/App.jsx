import { useState, useEffect, useRef } from 'react';

// ===========================================
// CONFIGURATION
// ===========================================
const ADMIN_PASSWORD = "30920654IC@&";

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

const TRANSLATIONS = {
  en: {
    nav: { shop: 'Shop', about: 'About', faq: 'FAQ', contact: 'Contact', cart: 'Cart' },
    hero: { badge: '✦ PREMIUM BUNDLES DELIVERED WORLDWIDE', title1: 'Everything', title2: 'You Need.', title3: 'One Box.', subtitle: 'Curated bundles for every moment. From back-to-school essentials to holiday magic — we pack it all so you don\'t have to think twice.', shopNow: 'Shop Now', learnMore: 'Learn More', watchVideo: 'Watch Video' },
    products: { title: 'Our Bundles', subtitle: 'Curated with care. Delivered with speed.', addToCart: 'Add to Cart', all: 'All', search: 'Search products...', noResults: 'No products found', inStock: 'In Stock', lowStock: 'Only {{count}} left', outOfStock: 'Out of Stock' },
    about: { badge: 'ABOUT US', title: 'We Bundle.\nYou Unbox Joy.', text: 'Ark Global Supply was born from a simple idea: shopping for multiple items shouldn\'t feel like a chore. We curate premium bundles for life\'s biggest moments.', features: [ { icon: '📦', title: 'Fast Shipping', desc: '2-5 day delivery' }, { icon: '✨', title: 'Premium Quality', desc: 'Hand-picked items' }, { icon: '🔄', title: 'Easy Returns', desc: '30-day guarantee' }, { icon: '💬', title: '24/7 Support', desc: 'Always here to help' } ] },
    faq: { title: 'Frequently Asked Questions', subtitle: 'Got questions? We\'ve got answers.' },
    contact: { title: 'Get in Touch', subtitle: 'Questions? Ideas? We\'d love to hear from you.', email: 'Your email', message: 'Your message', send: 'Send Message', success: 'Message sent!' },
    newsletter: { title: 'Join Our Newsletter', subtitle: 'Get exclusive deals and updates delivered to your inbox.', placeholder: 'Enter your email', button: 'Subscribe', success: 'Thanks for subscribing!' },
    cart: { title: 'Your Cart', empty: 'Your cart is empty', remove: 'Remove', subtotal: 'Subtotal', shipping: 'Shipping', shippingValue: 'FREE', discount: 'Discount', total: 'Total', checkout: 'Checkout', secure: 'Secure checkout powered by Stripe', eta: 'Estimated delivery', discountCode: 'Discount code', apply: 'Apply', invalidCode: 'Invalid code', codeApplied: 'Code applied!' },
    shipping: { calculating: 'Calculating...', days: 'business days', free: 'FREE' },
    footer: { rights: 'All rights reserved.', privacy: 'Privacy Policy', terms: 'Terms of Service', refund: 'Refund Policy' },
    stats: [ { value: '10K+', label: 'Happy Customers' }, { value: '500+', label: 'Products Bundled' }, { value: '4.9', label: 'Average Rating' } ],
    legal: { privacy: 'Privacy Policy', terms: 'Terms of Service', refund: 'Refund Policy' }
  },
  es: {
    nav: { shop: 'Tienda', about: 'Nosotros', faq: 'FAQ', contact: 'Contacto', cart: 'Carrito' },
    hero: { badge: '✦ PAQUETES PREMIUM ENTREGADOS', title1: 'Todo lo', title2: 'Que Necesitas.', title3: 'Una Caja.', subtitle: 'Paquetes curados para cada momento.', shopNow: 'Comprar', learnMore: 'Más Info', watchVideo: 'Ver Video' },
    products: { title: 'Nuestros Paquetes', subtitle: 'Curados con cariño.', addToCart: 'Añadir', all: 'Todos', search: 'Buscar productos...', noResults: 'No se encontraron productos', inStock: 'En Stock', lowStock: 'Solo quedan {{count}}', outOfStock: 'Agotado' },
    about: { badge: 'NOSOTROS', title: 'Empacamos.\nTú Disfrutas.', text: 'Ark Global Supply nació de una idea simple.', features: [ { icon: '📦', title: 'Envío Rápido', desc: '2-5 días' }, { icon: '✨', title: 'Calidad Premium', desc: 'Seleccionados' }, { icon: '🔄', title: 'Devoluciones', desc: '30 días' }, { icon: '💬', title: 'Soporte 24/7', desc: 'Siempre aquí' } ] },
    faq: { title: 'Preguntas Frecuentes', subtitle: '¿Tienes preguntas? Tenemos respuestas.' },
    contact: { title: 'Contáctanos', subtitle: '¿Preguntas? ¿Ideas?', email: 'Tu correo', message: 'Tu mensaje', send: 'Enviar', success: '¡Mensaje enviado!' },
    newsletter: { title: 'Únete', subtitle: 'Recibe ofertas exclusivas.', placeholder: 'Tu correo', button: 'Suscribirse', success: '¡Gracias!' },
    cart: { title: 'Tu Carrito', empty: 'Vacío', remove: 'Eliminar', subtotal: 'Subtotal', shipping: 'Envío', shippingValue: 'GRATIS', discount: 'Descuento', total: 'Total', checkout: 'Pagar', secure: 'Pago seguro', eta: 'Entrega estimada', discountCode: 'Código de descuento', apply: 'Aplicar', invalidCode: 'Código inválido', codeApplied: '¡Código aplicado!' },
    shipping: { days: 'días hábiles', free: 'GRATIS' },
    footer: { rights: 'Todos los derechos reservados.', privacy: 'Privacidad', terms: 'Términos', refund: 'Reembolsos' },
    stats: [ { value: '10K+', label: 'Clientes Felices' }, { value: '500+', label: 'Productos' }, { value: '4.9', label: 'Calificación' } ],
    legal: { privacy: 'Política de Privacidad', terms: 'Términos de Servicio', refund: 'Política de Reembolso' }
  },
  fr: {
    nav: { shop: 'Boutique', about: 'À Propos', faq: 'FAQ', contact: 'Contact', cart: 'Panier' },
    hero: { badge: '✦ LOTS PREMIUM LIVRÉS', title1: 'Tout Ce Dont', title2: 'Vous Avez', title3: 'Besoin.', subtitle: 'Des lots soigneusement sélectionnés.', shopNow: 'Acheter', learnMore: 'En Savoir Plus', watchVideo: 'Voir Vidéo' },
    products: { title: 'Nos Lots', subtitle: 'Sélectionnés avec soin.', addToCart: 'Ajouter', all: 'Tous', search: 'Rechercher...', noResults: 'Aucun produit trouvé', inStock: 'En Stock', lowStock: 'Plus que {{count}}', outOfStock: 'Rupture' },
    about: { badge: 'À PROPOS', title: 'Nous Emballons.\nVous Profitez.', text: 'Ark Global Supply est né d\'une idée simple.', features: [ { icon: '📦', title: 'Livraison Rapide', desc: '2-5 jours' }, { icon: '✨', title: 'Qualité Premium', desc: 'Sélectionnés' }, { icon: '🔄', title: 'Retours Faciles', desc: '30 jours' }, { icon: '💬', title: 'Support 24/7', desc: 'Toujours là' } ] },
    faq: { title: 'Questions Fréquentes', subtitle: 'Des questions? Nous avons des réponses.' },
    contact: { title: 'Contactez-Nous', subtitle: 'Questions? Idées?', email: 'Votre email', message: 'Votre message', send: 'Envoyer', success: 'Message envoyé!' },
    newsletter: { title: 'Newsletter', subtitle: 'Recevez des offres exclusives.', placeholder: 'Votre email', button: 'S\'abonner', success: 'Merci!' },
    cart: { title: 'Votre Panier', empty: 'Vide', remove: 'Supprimer', subtotal: 'Sous-total', shipping: 'Livraison', shippingValue: 'GRATUIT', discount: 'Réduction', total: 'Total', checkout: 'Payer', secure: 'Paiement sécurisé', eta: 'Livraison estimée', discountCode: 'Code promo', apply: 'Appliquer', invalidCode: 'Code invalide', codeApplied: 'Code appliqué!' },
    shipping: { days: 'jours ouvrés', free: 'GRATUIT' },
    footer: { rights: 'Tous droits réservés.', privacy: 'Confidentialité', terms: 'Conditions', refund: 'Remboursement' },
    stats: [ { value: '10K+', label: 'Clients Satisfaits' }, { value: '500+', label: 'Produits' }, { value: '4.9', label: 'Note' } ],
    legal: { privacy: 'Politique de Confidentialité', terms: 'Conditions d\'Utilisation', refund: 'Politique de Remboursement' }
  },
  de: {
    nav: { shop: 'Shop', about: 'Über Uns', faq: 'FAQ', contact: 'Kontakt', cart: 'Warenkorb' },
    hero: { badge: '✦ PREMIUM-PAKETE GELIEFERT', title1: 'Alles Was', title2: 'Du Brauchst.', title3: 'Eine Box.', subtitle: 'Kuratierte Pakete für jeden Moment.', shopNow: 'Jetzt Kaufen', learnMore: 'Mehr Erfahren', watchVideo: 'Video Ansehen' },
    products: { title: 'Unsere Pakete', subtitle: 'Mit Sorgfalt kuratiert.', addToCart: 'Hinzufügen', all: 'Alle', search: 'Suchen...', noResults: 'Keine Produkte gefunden', inStock: 'Auf Lager', lowStock: 'Nur noch {{count}}', outOfStock: 'Ausverkauft' },
    about: { badge: 'ÜBER UNS', title: 'Wir Packen.\nDu Freust Dich.', text: 'Ark Global Supply wurde aus einer einfachen Idee geboren.', features: [ { icon: '📦', title: 'Schneller Versand', desc: '2-5 Tage' }, { icon: '✨', title: 'Premium Qualität', desc: 'Handverlesen' }, { icon: '🔄', title: 'Einfache Rückgabe', desc: '30 Tage' }, { icon: '💬', title: '24/7 Support', desc: 'Immer da' } ] },
    faq: { title: 'Häufige Fragen', subtitle: 'Fragen? Wir haben Antworten.' },
    contact: { title: 'Kontakt', subtitle: 'Fragen? Ideen?', email: 'Ihre E-Mail', message: 'Ihre Nachricht', send: 'Senden', success: 'Gesendet!' },
    newsletter: { title: 'Newsletter', subtitle: 'Erhalten Sie exklusive Angebote.', placeholder: 'Ihre E-Mail', button: 'Abonnieren', success: 'Danke!' },
    cart: { title: 'Warenkorb', empty: 'Leer', remove: 'Entfernen', subtotal: 'Zwischensumme', shipping: 'Versand', shippingValue: 'KOSTENLOS', discount: 'Rabatt', total: 'Gesamt', checkout: 'Zur Kasse', secure: 'Sichere Zahlung', eta: 'Lieferung', discountCode: 'Rabattcode', apply: 'Anwenden', invalidCode: 'Ungültiger Code', codeApplied: 'Code angewendet!' },
    shipping: { days: 'Werktage', free: 'KOSTENLOS' },
    footer: { rights: 'Alle Rechte vorbehalten.', privacy: 'Datenschutz', terms: 'AGB', refund: 'Rückgabe' },
    stats: [ { value: '10K+', label: 'Kunden' }, { value: '500+', label: 'Produkte' }, { value: '4.9', label: 'Bewertung' } ],
    legal: { privacy: 'Datenschutzrichtlinie', terms: 'Nutzungsbedingungen', refund: 'Rückgaberecht' }
  },
  pt: {
    nav: { shop: 'Loja', about: 'Sobre', faq: 'FAQ', contact: 'Contato', cart: 'Carrinho' },
    hero: { badge: '✦ PACOTES PREMIUM ENTREGUES', title1: 'Tudo Que', title2: 'Você Precisa.', title3: 'Uma Caixa.', subtitle: 'Pacotes selecionados para cada momento.', shopNow: 'Comprar', learnMore: 'Saiba Mais', watchVideo: 'Ver Vídeo' },
    products: { title: 'Nossos Pacotes', subtitle: 'Selecionados com carinho.', addToCart: 'Adicionar', all: 'Todos', search: 'Buscar...', noResults: 'Nenhum produto encontrado', inStock: 'Em Estoque', lowStock: 'Apenas {{count}}', outOfStock: 'Esgotado' },
    about: { badge: 'SOBRE NÓS', title: 'Nós Embalamos.\nVocê Desembala Alegria.', text: 'Ark Global Supply nasceu de uma ideia simples.', features: [ { icon: '📦', title: 'Envio Rápido', desc: '2-5 dias' }, { icon: '✨', title: 'Qualidade Premium', desc: 'Selecionados' }, { icon: '🔄', title: 'Devoluções Fáceis', desc: '30 dias' }, { icon: '💬', title: 'Suporte 24/7', desc: 'Sempre aqui' } ] },
    faq: { title: 'Perguntas Frequentes', subtitle: 'Dúvidas? Temos respostas.' },
    contact: { title: 'Contato', subtitle: 'Dúvidas? Ideias?', email: 'Seu email', message: 'Sua mensagem', send: 'Enviar', success: 'Enviado!' },
    newsletter: { title: 'Newsletter', subtitle: 'Receba ofertas exclusivas.', placeholder: 'Seu email', button: 'Assinar', success: 'Obrigado!' },
    cart: { title: 'Carrinho', empty: 'Vazio', remove: 'Remover', subtotal: 'Subtotal', shipping: 'Frete', shippingValue: 'GRÁTIS', discount: 'Desconto', total: 'Total', checkout: 'Finalizar', secure: 'Pagamento seguro', eta: 'Entrega', discountCode: 'Código de desconto', apply: 'Aplicar', invalidCode: 'Código inválido', codeApplied: 'Código aplicado!' },
    shipping: { days: 'dias úteis', free: 'GRÁTIS' },
    footer: { rights: 'Todos os direitos reservados.', privacy: 'Privacidade', terms: 'Termos', refund: 'Reembolso' },
    stats: [ { value: '10K+', label: 'Clientes' }, { value: '500+', label: 'Produtos' }, { value: '4.9', label: 'Avaliação' } ],
    legal: { privacy: 'Política de Privacidade', terms: 'Termos de Serviço', refund: 'Política de Reembolso' }
  },
  zh: {
    nav: { shop: '商店', about: '关于', faq: '常见问题', contact: '联系', cart: '购物车' },
    hero: { badge: '✦ 优质套装配送全球', title1: '您需要的', title2: '一切。', title3: '一个盒子。', subtitle: '为每一刻精心策划的套装。', shopNow: '立即购买', learnMore: '了解更多', watchVideo: '观看视频' },
    products: { title: '我们的套装', subtitle: '精心策划。快速配送。', addToCart: '加入购物车', all: '全部', search: '搜索...', noResults: '未找到产品', inStock: '有货', lowStock: '仅剩{{count}}件', outOfStock: '缺货' },
    about: { badge: '关于我们', title: '我们打包。\n您开箱快乐。', text: 'Ark Global Supply 诞生于一个简单的想法。', features: [ { icon: '📦', title: '快速配送', desc: '2-5天' }, { icon: '✨', title: '优质品质', desc: '精选' }, { icon: '🔄', title: '轻松退货', desc: '30天' }, { icon: '💬', title: '24/7支持', desc: '随时服务' } ] },
    faq: { title: '常见问题', subtitle: '有问题？我们有答案。' },
    contact: { title: '联系我们', subtitle: '问题？想法？', email: '您的邮箱', message: '您的消息', send: '发送', success: '已发送！' },
    newsletter: { title: '订阅通讯', subtitle: '获取独家优惠。', placeholder: '您的邮箱', button: '订阅', success: '谢谢！' },
    cart: { title: '购物车', empty: '空的', remove: '移除', subtotal: '小计', shipping: '运费', shippingValue: '免费', discount: '折扣', total: '总计', checkout: '结账', secure: '安全支付', eta: '预计送达', discountCode: '折扣码', apply: '应用', invalidCode: '无效代码', codeApplied: '代码已应用！' },
    shipping: { days: '工作日', free: '免费' },
    footer: { rights: '版权所有。', privacy: '隐私', terms: '条款', refund: '退款' },
    stats: [ { value: '10K+', label: '客户' }, { value: '500+', label: '产品' }, { value: '4.9', label: '评分' } ],
    legal: { privacy: '隐私政策', terms: '服务条款', refund: '退款政策' }
  },
  ar: {
    nav: { shop: 'المتجر', about: 'عنا', faq: 'الأسئلة', contact: 'اتصل', cart: 'السلة' },
    hero: { badge: '✦ حزم متميزة يتم توصيلها', title1: 'كل ما', title2: 'تحتاجه.', title3: 'صندوق واحد.', subtitle: 'حزم منسقة لكل لحظة.', shopNow: 'تسوق الآن', learnMore: 'اعرف المزيد', watchVideo: 'شاهد الفيديو' },
    products: { title: 'حزمنا', subtitle: 'منسقة بعناية.', addToCart: 'أضف للسلة', all: 'الكل', search: 'بحث...', noResults: 'لا توجد منتجات', inStock: 'متوفر', lowStock: 'متبقي {{count}} فقط', outOfStock: 'نفذ' },
    about: { badge: 'عنا', title: 'نحن نحزم.\nأنت تفتح الفرح.', text: 'ولدت Ark Global Supply من فكرة بسيطة.', features: [ { icon: '📦', title: 'شحن سريع', desc: '2-5 أيام' }, { icon: '✨', title: 'جودة متميزة', desc: 'مختارة' }, { icon: '🔄', title: 'إرجاع سهل', desc: '30 يوم' }, { icon: '💬', title: 'دعم 24/7', desc: 'دائماً هنا' } ] },
    faq: { title: 'الأسئلة الشائعة', subtitle: 'أسئلة؟ لدينا إجابات.' },
    contact: { title: 'تواصل معنا', subtitle: 'أسئلة؟ أفكار؟', email: 'بريدك', message: 'رسالتك', send: 'إرسال', success: 'تم الإرسال!' },
    newsletter: { title: 'النشرة الإخبارية', subtitle: 'احصل على عروض حصرية.', placeholder: 'بريدك', button: 'اشترك', success: 'شكراً!' },
    cart: { title: 'سلتك', empty: 'فارغة', remove: 'إزالة', subtotal: 'المجموع الفرعي', shipping: 'الشحن', shippingValue: 'مجاني', discount: 'خصم', total: 'المجموع', checkout: 'الدفع', secure: 'دفع آمن', eta: 'التوصيل المتوقع', discountCode: 'كود الخصم', apply: 'تطبيق', invalidCode: 'كود غير صالح', codeApplied: 'تم تطبيق الكود!' },
    shipping: { days: 'أيام عمل', free: 'مجاني' },
    footer: { rights: 'جميع الحقوق محفوظة.', privacy: 'الخصوصية', terms: 'الشروط', refund: 'الاسترداد' },
    stats: [ { value: '10K+', label: 'عملاء' }, { value: '500+', label: 'منتجات' }, { value: '4.9', label: 'تقييم' } ],
    legal: { privacy: 'سياسة الخصوصية', terms: 'شروط الخدمة', refund: 'سياسة الاسترداد' }
  },
  ja: {
    nav: { shop: 'ショップ', about: '私たちについて', faq: 'よくある質問', contact: 'お問い合わせ', cart: 'カート' },
    hero: { badge: '✦ プレミアムバンドルを世界中にお届け', title1: '必要なもの', title2: 'すべてが。', title3: 'ひとつの箱に。', subtitle: 'あらゆる瞬間のために厳選されたバンドル。', shopNow: '今すぐ購入', learnMore: '詳細を見る', watchVideo: '動画を見る' },
    products: { title: 'バンドル', subtitle: '心を込めて厳選。', addToCart: 'カートに追加', all: 'すべて', search: '検索...', noResults: '商品が見つかりません', inStock: '在庫あり', lowStock: '残り{{count}}点', outOfStock: '在庫切れ' },
    about: { badge: '私たちについて', title: '私たちが梱包。\nあなたは喜びを開封。', text: 'Ark Global Supplyはシンプルなアイデアから生まれました。', features: [ { icon: '📦', title: '迅速配送', desc: '2-5日' }, { icon: '✨', title: 'プレミアム品質', desc: '厳選' }, { icon: '🔄', title: '簡単返品', desc: '30日' }, { icon: '💬', title: '24/7サポート', desc: 'いつでも' } ] },
    faq: { title: 'よくある質問', subtitle: 'ご質問は？お答えします。' },
    contact: { title: 'お問い合わせ', subtitle: 'ご質問は？', email: 'メール', message: 'メッセージ', send: '送信', success: '送信完了！' },
    newsletter: { title: 'ニュースレター', subtitle: '限定オファーを受け取る。', placeholder: 'メール', button: '登録', success: 'ありがとう！' },
    cart: { title: 'カート', empty: '空です', remove: '削除', subtotal: '小計', shipping: '送料', shippingValue: '無料', discount: '割引', total: '合計', checkout: '購入', secure: '安全な決済', eta: 'お届け予定', discountCode: '割引コード', apply: '適用', invalidCode: '無効なコード', codeApplied: 'コード適用！' },
    shipping: { days: '営業日', free: '無料' },
    footer: { rights: '全著作権所有。', privacy: 'プライバシー', terms: '利用規約', refund: '返金' },
    stats: [ { value: '10K+', label: 'お客様' }, { value: '500+', label: '商品' }, { value: '4.9', label: '評価' } ],
    legal: { privacy: 'プライバシーポリシー', terms: '利用規約', refund: '返金ポリシー' }
  }
};

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
  { id: 1, name: "Back to School Essentials", description: "Everything they need to crush the new year. Notebooks, pens, folders, calculator & more.", price: 49.99, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80", tag: "BESTSELLER", category: "kids", stock: 50 },
  { id: 2, name: "Ultimate Christmas Bundle", description: "Festive magic delivered. Decorations, lights, stockings, and holiday surprises.", price: 89.99, image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&auto=format&fit=crop&q=80", tag: "SEASONAL", category: "holiday", stock: 25 },
  { id: 3, name: "Kids Creative Pack", description: "Unleash imagination. Art supplies, craft materials, coloring books & creative tools.", price: 39.99, image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&auto=format&fit=crop&q=80", tag: "POPULAR", category: "kids", stock: 100 },
  { id: 4, name: "Home Office Starter", description: "Work from anywhere. Desk organizers, tech accessories, and productivity essentials.", price: 79.99, image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&auto=format&fit=crop&q=80", tag: "NEW", category: "office", stock: 35 },
  { id: 5, name: "Birthday Party Pack", description: "Instant celebration. Decorations, tableware, balloons, and party favors for 12.", price: 34.99, image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80", tag: "FUN", category: "party", stock: 5 },
  { id: 6, name: "Premium Gift Box", description: "Luxury curated. Hand-picked premium items beautifully packaged for gifting.", price: 129.99, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80", tag: "LUXURY", category: "gift", stock: 15 }
];

const DEFAULT_DISCOUNT_CODES = [
  { code: 'WELCOME10', type: 'percent', value: 10, active: true },
  { code: 'SAVE20', type: 'percent', value: 20, active: true },
  { code: 'FLAT15', type: 'fixed', value: 15, active: true }
];

const FAQ_DATA = [
  { q: 'How long does shipping take?', a: 'Shipping times vary by location. US orders typically arrive in 2-5 business days. International orders may take 5-15 business days depending on the destination.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day money-back guarantee on all products. If you\'re not satisfied, simply contact us for a full refund or exchange.' },
  { q: 'Do you ship internationally?', a: 'Yes! We ship to over 15 countries worldwide. Shipping costs and delivery times vary by location. Select your country at checkout for accurate pricing.' },
  { q: 'How do I track my order?', a: 'Once your order ships, you\'ll receive an email with tracking information. You can also log into your account to view order status.' },
  { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 2 hours of placement. After that, please contact our support team and we\'ll do our best to help.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, MasterCard, Amex), PayPal, Apple Pay, and Google Pay through our secure Stripe checkout.' },
  { q: 'Are the bundles customizable?', a: 'Currently our bundles are pre-curated for the best value. However, we\'re working on custom bundle options. Sign up for our newsletter to be notified!' },
  { q: 'Do you offer gift wrapping?', a: 'Yes! Select the gift wrapping option at checkout for an additional $5. We\'ll beautifully wrap your bundle and include a personalized message.' }
];

const THEMES = {
  midnight: { name: "Midnight", bg: "#030303", bgSecondary: "rgba(255,255,255,0.03)", bgTertiary: "rgba(255,255,255,0.06)", text: "#ffffff", textMuted: "rgba(255,255,255,0.5)", accent1: "#8b5cf6", accent2: "#ec4899", gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)", glow: "rgba(139, 92, 246, 0.4)", border: "rgba(255,255,255,0.08)", cardBg: "rgba(255,255,255,0.02)" },
  ocean: { name: "Ocean", bg: "#020617", bgSecondary: "rgba(255,255,255,0.03)", bgTertiary: "rgba(255,255,255,0.06)", text: "#ffffff", textMuted: "rgba(255,255,255,0.5)", accent1: "#06b6d4", accent2: "#3b82f6", gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)", glow: "rgba(6, 182, 212, 0.4)", border: "rgba(255,255,255,0.08)", cardBg: "rgba(255,255,255,0.02)" },
  sunset: { name: "Sunset", bg: "#0c0a09", bgSecondary: "rgba(255,255,255,0.03)", bgTertiary: "rgba(255,255,255,0.06)", text: "#ffffff", textMuted: "rgba(255,255,255,0.5)", accent1: "#f97316", accent2: "#ef4444", gradient: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)", glow: "rgba(249, 115, 22, 0.4)", border: "rgba(255,255,255,0.08)", cardBg: "rgba(255,255,255,0.02)" },
  forest: { name: "Forest", bg: "#020a05", bgSecondary: "rgba(255,255,255,0.03)", bgTertiary: "rgba(255,255,255,0.06)", text: "#ffffff", textMuted: "rgba(255,255,255,0.5)", accent1: "#10b981", accent2: "#06b6d4", gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)", glow: "rgba(16, 185, 129, 0.4)", border: "rgba(255,255,255,0.08)", cardBg: "rgba(255,255,255,0.02)" },
  royal: { name: "Royal", bg: "#09090b", bgSecondary: "rgba(255,255,255,0.03)", bgTertiary: "rgba(255,255,255,0.06)", text: "#ffffff", textMuted: "rgba(255,255,255,0.5)", accent1: "#a855f7", accent2: "#6366f1", gradient: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)", glow: "rgba(168, 85, 247, 0.4)", border: "rgba(255,255,255,0.08)", cardBg: "rgba(255,255,255,0.02)" },
  cream: { name: "Cream", bg: "#fefcf9", bgSecondary: "rgba(0,0,0,0.02)", bgTertiary: "rgba(0,0,0,0.04)", text: "#18181b", textMuted: "rgba(24,24,27,0.6)", accent1: "#8b5cf6", accent2: "#ec4899", gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)", glow: "rgba(139, 92, 246, 0.25)", border: "rgba(0,0,0,0.06)", cardBg: "rgba(0,0,0,0.02)" }
};

// Legal content
const LEGAL_CONTENT = {
  privacy: `
# Privacy Policy

**Last updated: December 2024**

## Information We Collect

We collect information you provide directly to us, such as when you create an account, make a purchase, subscribe to our newsletter, or contact us for support.

### Personal Information
- Name and email address
- Shipping and billing address
- Payment information (processed securely via Stripe)
- Phone number (optional)

### Automatically Collected Information
- Device and browser information
- IP address and location data
- Browsing behavior on our site

## How We Use Your Information

- Process and fulfill your orders
- Send order confirmations and shipping updates
- Respond to your questions and requests
- Send promotional emails (with your consent)
- Improve our website and services
- Prevent fraud and enhance security

## Information Sharing

We do not sell your personal information. We share data only with:
- Payment processors (Stripe)
- Shipping carriers
- Service providers who assist our operations

## Your Rights

You have the right to:
- Access your personal data
- Correct inaccurate data
- Delete your data
- Opt-out of marketing emails
- Request data portability

## Contact Us

For privacy-related questions, contact us at privacy@arkglobalsupply.com
  `,
  terms: `
# Terms of Service

**Last updated: December 2024**

## Agreement to Terms

By accessing or using Ark Global Supply, you agree to be bound by these Terms of Service.

## Products and Pricing

- All prices are listed in USD and converted to local currency at checkout
- We reserve the right to modify prices at any time
- Product availability is subject to change

## Orders and Payment

- Orders are subject to acceptance and availability
- Payment is processed securely via Stripe
- You must provide accurate billing and shipping information

## Shipping and Delivery

- Shipping times are estimates and not guaranteed
- Risk of loss passes to you upon delivery to the carrier
- International orders may be subject to customs duties

## Returns and Refunds

- 30-day return policy for unused items in original packaging
- Refunds processed within 5-10 business days
- Shipping costs for returns are the customer's responsibility

## Intellectual Property

All content on this site is owned by Ark Global Supply and protected by copyright laws.

## Limitation of Liability

Ark Global Supply is not liable for any indirect, incidental, or consequential damages arising from your use of our services.

## Changes to Terms

We may update these terms at any time. Continued use of the site constitutes acceptance of updated terms.

## Contact

Questions about these terms? Contact us at legal@arkglobalsupply.com
  `,
  refund: `
# Refund Policy

**Last updated: December 2024**

## 30-Day Money-Back Guarantee

We want you to be completely satisfied with your purchase. If you're not happy, we'll make it right.

## Eligibility for Refunds

You may request a refund if:
- Item arrives damaged or defective
- Item doesn't match the description
- You're not satisfied with the quality
- Order never arrived

## Refund Process

1. **Contact Us**: Email support@arkglobalsupply.com within 30 days of delivery
2. **Provide Details**: Include your order number and reason for refund
3. **Return Item**: If required, we'll provide a return shipping label
4. **Receive Refund**: Refunds processed within 5-10 business days

## Non-Refundable Items

- Gift cards
- Downloadable products
- Items marked as final sale
- Items returned after 30 days

## Exchanges

We're happy to exchange items for a different product of equal value. Contact us to arrange an exchange.

## Damaged or Defective Items

If your item arrives damaged:
1. Take photos of the damage
2. Contact us within 48 hours
3. We'll send a replacement immediately

## Late or Missing Refunds

If you haven't received your refund:
1. Check your bank account again
2. Contact your credit card company
3. Contact your bank
4. If still not received, email us

## Contact

For refund inquiries: support@arkglobalsupply.com
  `
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
      if (data.success) onImageChange(data.data.url);
      else { const reader = new FileReader(); reader.onload = (e) => onImageChange(e.target.result); reader.readAsDataURL(file); }
    } catch (error) {
      const reader = new FileReader(); reader.onload = (e) => onImageChange(e.target.result); reader.readAsDataURL(file);
    }
    setIsUploading(false);
  };

  return (
    <div onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
      style={{ border: `2px dashed ${isDragging ? theme.accent1 : theme.border}`, borderRadius: 16, padding: 20, textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', background: isDragging ? `${theme.accent1}11` : 'transparent' }}>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => e.target.files[0] && uploadImage(e.target.files[0])} style={{ display: 'none' }} />
      {isUploading ? (
        <div style={{ padding: 20 }}><div style={{ width: 40, height: 40, border: `3px solid ${theme.border}`, borderTopColor: theme.accent1, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} /></div>
      ) : currentImage ? (
        <div><img src={currentImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: 100, borderRadius: 8, marginBottom: 8 }} /><div style={{ color: theme.textMuted, fontSize: 11 }}>Click to replace</div></div>
      ) : (
        <div style={{ padding: 10 }}><div style={{ fontSize: 24, marginBottom: 6 }}>📷</div><div style={{ color: theme.textMuted, fontSize: 12 }}>Drop image or click</div></div>
      )}
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ''));
  
  useEffect(() => {
    let start = 0;
    const end = numericValue;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [numericValue, duration]);
  
  return <span>{count}{value.includes('+') ? '+' : ''}{value.includes('K') ? 'K' : ''}{value.includes('.') ? '.' + value.split('.')[1] : ''}</span>;
};

export default function ArkGlobalSupply() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [discountCodes, setDiscountCodes] = useState(DEFAULT_DISCOUNT_CODES);
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
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '', tag: '', category: '', stock: 50 });
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('US');
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountInput, setDiscountInput] = useState('');
  const [showLegal, setShowLegal] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [settings, setSettings] = useState({
    storeName: 'ARK GLOBAL SUPPLY',
    heroImage: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop&q=80',
    aboutImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80'
  });

  const theme = THEMES[currentTheme];
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const countryData = COUNTRIES[country];
  const isRTL = language === 'ar';

  // Mouse tracking for effects
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['hero', 'products', 'about', 'faq', 'newsletter', 'contact'];
      const newVisible = {};
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) { const rect = el.getBoundingClientRect(); newVisible[id] = rect.top < window.innerHeight * 0.8; }
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
    const saved = { theme: localStorage.getItem('ark-theme'), products: localStorage.getItem('ark-products'), settings: localStorage.getItem('ark-settings'), language: localStorage.getItem('ark-language'), country: localStorage.getItem('ark-country'), subscribers: localStorage.getItem('ark-subscribers'), discountCodes: localStorage.getItem('ark-discounts') };
    if (saved.theme && THEMES[saved.theme]) setCurrentTheme(saved.theme);
    if (saved.products) try { setProducts(JSON.parse(saved.products)); } catch (e) {}
    if (saved.settings) try { setSettings(s => ({ ...s, ...JSON.parse(saved.settings) })); } catch (e) {}
    if (saved.language && LANGUAGES[saved.language]) setLanguage(saved.language);
    if (saved.country && COUNTRIES[saved.country]) setCountry(saved.country);
    if (saved.subscribers) try { setSubscribers(JSON.parse(saved.subscribers)); } catch (e) {}
    if (saved.discountCodes) try { setDiscountCodes(JSON.parse(saved.discountCodes)); } catch (e) {}
  }, []);

  // Save data
  useEffect(() => { localStorage.setItem('ark-theme', currentTheme); }, [currentTheme]);
  useEffect(() => { localStorage.setItem('ark-products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('ark-settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('ark-language', language); }, [language]);
  useEffect(() => { localStorage.setItem('ark-country', country); }, [country]);
  useEffect(() => { localStorage.setItem('ark-subscribers', JSON.stringify(subscribers)); }, [subscribers]);
  useEffect(() => { localStorage.setItem('ark-discounts', JSON.stringify(discountCodes)); }, [discountCodes]);

  const formatPrice = (usdPrice) => {
    const converted = usdPrice * countryData.rate;
    if (countryData.currency === 'JPY') return `${countryData.symbol}${Math.round(converted).toLocaleString()}`;
    return `${countryData.symbol}${converted.toFixed(2)}`;
  };

  const getETA = () => {
    const [min, max] = countryData.etaDays;
    return `${min}-${max} ${t.shipping?.days || 'days'}`;
  };

  const showNotif = (msg) => { setNotification(msg); setTimeout(() => setNotification(null), 3000); };

  const addToCart = (product) => {
    if (product.stock <= 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showNotif(`${product.name} added!`);
  };

  const removeFromCart = (productId) => setCart(prev => prev.filter(item => item.id !== productId));
  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const product = products.find(p => p.id === productId);
        const newQty = Math.max(0, Math.min(item.quantity + delta, product?.stock || 99));
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const applyDiscountCode = () => {
    const code = discountCodes.find(c => c.code.toLowerCase() === discountInput.toLowerCase() && c.active);
    if (code) { setAppliedDiscount(code); showNotif(t.cart.codeApplied); setDiscountInput(''); }
    else showNotif(t.cart.invalidCode);
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) { setAdminAuth(true); setAdminPassword(''); }
    else alert('Incorrect password');
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) { alert('Please fill in name and price'); return; }
    setProducts(prev => [...prev, { ...newProduct, id: Date.now(), price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock) || 50 }]);
    setNewProduct({ name: '', description: '', price: '', image: '', tag: '', category: '', stock: 50 });
    showNotif('Product added!');
  };

  const deleteProduct = (id) => { if (confirm('Delete this product?')) setProducts(prev => prev.filter(p => p.id !== id)); };
  const updateProduct = () => {
    if (!editingProduct) return;
    setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...editingProduct, price: parseFloat(editingProduct.price), stock: parseInt(editingProduct.stock) || 0 } : p));
    setEditingProduct(null);
    showNotif('Product updated!');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    if (!subscribers.includes(newsletterEmail)) setSubscribers(prev => [...prev, newsletterEmail]);
    setNewsletterEmail('');
    setNewsletterSuccess(true);
    setTimeout(() => setNewsletterSuccess(false), 3000);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedDiscount ? (appliedDiscount.type === 'percent' ? cartSubtotal * (appliedDiscount.value / 100) : appliedDiscount.value) : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  const getStockStatus = (stock) => {
    if (stock <= 0) return { text: t.products.outOfStock, color: '#ef4444' };
    if (stock <= 5) return { text: t.products.lowStock.replace('{{count}}', stock), color: '#f59e0b' };
    return { text: t.products.inStock, color: '#10b981' };
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: "'Inter', -apple-system, sans-serif", position: 'relative', overflow: 'hidden', transition: 'all 0.5s' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Animated mesh gradient background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', width: '150%', height: '150%', top: '-25%', left: '-25%', background: `radial-gradient(ellipse at ${30 + mousePos.x * 0.02}% ${30 + mousePos.y * 0.02}%, ${theme.accent1}15 0%, transparent 50%), radial-gradient(ellipse at ${70 - mousePos.x * 0.01}% ${70 - mousePos.y * 0.01}%, ${theme.accent2}12 0%, transparent 50%)`, transition: 'all 0.3s ease-out' }} />
      </div>

      {/* Grid pattern overlay */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: `linear-gradient(${theme.border} 1px, transparent 1px), linear-gradient(90deg, ${theme.border} 1px, transparent 1px)`, backgroundSize: '60px 60px', opacity: 0.3, pointerEvents: 'none', zIndex: 0 }} />

      {/* Floating orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 300 + i * 100,
            height: 300 + i * 100,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${i % 2 === 0 ? theme.accent1 : theme.accent2}08 0%, transparent 70%)`,
            left: `${10 + i * 20}%`,
            top: `${20 + i * 15}%`,
            animation: `float${i % 2 === 0 ? '' : 'Reverse'} ${20 + i * 5}s ease-in-out infinite`,
            filter: 'blur(40px)'
          }} />
        ))}
      </div>

      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed', top: 100, right: 24, background: theme.gradient, color: '#fff',
          padding: '16px 28px', borderRadius: 16, fontSize: 14, fontWeight: 600, zIndex: 1000,
          animation: 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: `0 20px 60px ${theme.glow}`, backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <span style={{ marginRight: 8 }}>✓</span>{notification}
        </div>
      )}

      {/* Header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '12px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrollY > 50 ? `${theme.bg}e8` : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrollY > 50 ? `1px solid ${theme.border}` : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, background: theme.gradient, borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 800, color: '#fff',
            boxShadow: `0 8px 32px ${theme.glow}`,
            animation: 'pulse 3s ease-in-out infinite'
          }}>{settings.storeName.charAt(0)}</div>
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>{settings.storeName}</span>
        </div>

        <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {[
            { href: '#products', label: t.nav.shop },
            { href: '#about', label: t.nav.about },
            { href: '#faq', label: t.nav.faq },
            { href: '#contact', label: t.nav.contact }
          ].map((link, i) => (
            <a key={i} href={link.href} style={{
              color: theme.textMuted, textDecoration: 'none', fontSize: 13, fontWeight: 500,
              padding: '8px 14px', borderRadius: 10, transition: 'all 0.3s',
              background: 'transparent'
            }}
            onMouseEnter={e => { e.target.style.background = theme.bgSecondary; e.target.style.color = theme.text; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = theme.textMuted; }}
            >{link.label}</a>
          ))}
          
          {/* Language Picker */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setShowLangPicker(!showLangPicker); setShowCountryPicker(false); setShowThemePicker(false); }}
              style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '10px 14px', color: theme.text, cursor: 'pointer', fontSize: 15, display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.3s' }}>
              {LANGUAGES[language].flag}
            </button>
            {showLangPicker && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 8, zIndex: 150, minWidth: 160, boxShadow: `0 24px 48px rgba(0,0,0,0.4)`, animation: 'scaleIn 0.2s ease' }}>
                {Object.entries(LANGUAGES).map(([code, lang]) => (
                  <button key={code} onClick={() => { setLanguage(code); setShowLangPicker(false); }}
                    style={{ width: '100%', padding: '12px 14px', background: language === code ? theme.gradient : 'transparent', color: language === code ? '#fff' : theme.text, border: 'none', borderRadius: 10, cursor: 'pointer', textAlign: 'left', fontSize: 13, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2, transition: 'all 0.2s' }}>
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Country Picker */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setShowCountryPicker(!showCountryPicker); setShowLangPicker(false); setShowThemePicker(false); }}
              style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '10px 14px', color: theme.text, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.3s' }}>
              {countryData.flag} {countryData.symbol}
            </button>
            {showCountryPicker && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 8, zIndex: 150, minWidth: 200, maxHeight: 320, overflow: 'auto', boxShadow: `0 24px 48px rgba(0,0,0,0.4)`, animation: 'scaleIn 0.2s ease' }}>
                {Object.entries(COUNTRIES).map(([code, c]) => (
                  <button key={code} onClick={() => { setCountry(code); setShowCountryPicker(false); }}
                    style={{ width: '100%', padding: '12px 14px', background: country === code ? theme.gradient : 'transparent', color: country === code ? '#fff' : theme.text, border: 'none', borderRadius: 10, cursor: 'pointer', textAlign: 'left', fontSize: 13, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2, transition: 'all 0.2s' }}>
                    {c.flag} {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => { setShowThemePicker(!showThemePicker); setShowLangPicker(false); setShowCountryPicker(false); }}
            style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '10px 14px', color: theme.text, cursor: 'pointer', fontSize: 15, transition: 'all 0.3s' }}>🎨</button>
          <button onClick={() => setShowAdmin(true)}
            style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '10px 14px', color: theme.text, cursor: 'pointer', fontSize: 15, transition: 'all 0.3s' }}>⚙️</button>
          
          <button onClick={() => setIsCartOpen(true)} style={{
            position: 'relative', background: theme.gradient, border: 'none', borderRadius: 14,
            padding: '12px 22px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
            gap: 8, fontSize: 14, fontWeight: 600, boxShadow: `0 8px 32px ${theme.glow}`,
            transition: 'all 0.3s'
          }}>
            🛒 {t.nav.cart}
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: -8, right: -8, background: '#fff', color: theme.accent1,
                fontSize: 11, fontWeight: 700, minWidth: 22, height: 22, borderRadius: 11,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'bounceIn 0.3s ease', boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}>{cartCount}</span>
            )}
          </button>
        </nav>
      </header>

      {/* Theme Picker */}
      {showThemePicker && (
        <>
          <div onClick={() => setShowThemePicker(false)} style={{ position: 'fixed', inset: 0, zIndex: 140 }} />
          <div style={{ position: 'fixed', top: 70, right: 200, background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 20, zIndex: 150, boxShadow: `0 24px 48px rgba(0,0,0,0.4)`, animation: 'scaleIn 0.2s ease' }}>
            <div style={{ fontSize: 11, color: theme.textMuted, marginBottom: 14, fontWeight: 600, letterSpacing: '0.05em' }}>THEME</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {Object.entries(THEMES).map(([key, t]) => (
                <button key={key} onClick={() => { setCurrentTheme(key); setShowThemePicker(false); }}
                  style={{ width: 56, height: 56, borderRadius: 14, border: currentTheme === key ? `2px solid ${t.accent1}` : `1px solid ${theme.border}`, background: t.bg, cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all 0.3s', transform: currentTheme === key ? 'scale(1.1)' : 'scale(1)' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: t.gradient }} />
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Legal Modal */}
      {showLegal && (
        <>
          <div onClick={() => setShowLegal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', zIndex: 300 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 24, padding: 0, zIndex: 301, width: '90%', maxWidth: 700, maxHeight: '85vh', overflow: 'hidden', animation: 'scaleIn 0.3s ease' }}>
            <div style={{ padding: '20px 24px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme.bgSecondary }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{t.legal[showLegal]}</h2>
              <button onClick={() => setShowLegal(null)} style={{ background: 'transparent', border: 'none', color: theme.text, fontSize: 24, cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ padding: 32, overflow: 'auto', maxHeight: 'calc(85vh - 80px)', lineHeight: 1.8, fontSize: 14, color: theme.textMuted }}>
              {LEGAL_CONTENT[showLegal].split('\n').map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i} style={{ color: theme.text, fontSize: 28, fontWeight: 800, marginBottom: 20, marginTop: i > 0 ? 40 : 0 }}>{line.replace('# ', '')}</h1>;
                if (line.startsWith('## ')) return <h2 key={i} style={{ color: theme.text, fontSize: 20, fontWeight: 700, marginBottom: 16, marginTop: 32 }}>{line.replace('## ', '')}</h2>;
                if (line.startsWith('### ')) return <h3 key={i} style={{ color: theme.text, fontSize: 16, fontWeight: 600, marginBottom: 12, marginTop: 24 }}>{line.replace('### ', '')}</h3>;
                if (line.startsWith('- ')) return <li key={i} style={{ marginBottom: 8, marginLeft: 20 }}>{line.replace('- ', '')}</li>;
                if (line.startsWith('**') && line.endsWith('**')) return <p key={i} style={{ fontWeight: 600, color: theme.text, marginBottom: 16 }}>{line.replace(/\*\*/g, '')}</p>;
                if (line.trim()) return <p key={i} style={{ marginBottom: 16 }}>{line}</p>;
                return null;
              })}
            </div>
          </div>
        </>
      )}

      {/* Admin Panel - keeping existing but shortened for space */}
      {showAdmin && (
        <>
          <div onClick={() => { setShowAdmin(false); setAdminAuth(false); }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', zIndex: 200 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 24, padding: 0, zIndex: 201, width: '95%', maxWidth: 950, maxHeight: '90vh', overflow: 'hidden', animation: 'scaleIn 0.3s ease' }}>
            <div style={{ padding: '18px 24px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme.bgSecondary }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>⚙️ Admin Panel</h2>
              <button onClick={() => { setShowAdmin(false); setAdminAuth(false); }} style={{ background: 'transparent', border: 'none', color: theme.text, fontSize: 24, cursor: 'pointer' }}>×</button>
            </div>
            {!adminAuth ? (
              <div style={{ textAlign: 'center', padding: 60 }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>🔐</div>
                <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()} placeholder="Password" style={{ width: '100%', maxWidth: 280, padding: 16, borderRadius: 14, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, fontSize: 16, marginBottom: 20, outline: 'none', textAlign: 'center' }} />
                <br />
                <button onClick={handleAdminLogin} style={{ background: theme.gradient, border: 'none', borderRadius: 14, padding: '14px 40px', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Login</button>
              </div>
            ) : (
              <div style={{ display: 'flex', height: 'calc(90vh - 70px)' }}>
                <div style={{ width: 200, borderRight: `1px solid ${theme.border}`, padding: 16, background: theme.bgSecondary }}>
                  {[
                    { id: 'products', icon: '📦', label: 'Products' },
                    { id: 'discounts', icon: '🏷️', label: 'Discounts' },
                    { id: 'subscribers', icon: '📧', label: `Emails (${subscribers.length})` },
                    { id: 'settings', icon: '⚙️', label: 'Settings' }
                  ].map(tab => (
                    <button key={tab.id} onClick={() => setAdminTab(tab.id)} style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: 'none', background: adminTab === tab.id ? theme.gradient : 'transparent', color: adminTab === tab.id ? '#fff' : theme.text, fontSize: 14, fontWeight: 500, cursor: 'pointer', textAlign: 'left', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.3s' }}>
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                </div>
                <div style={{ flex: 1, padding: 24, overflow: 'auto' }}>
                  {adminTab === 'products' && (
                    <div>
                      <div style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 24, marginBottom: 24 }}>
                        <h3 style={{ margin: '0 0 20px', fontSize: 16 }}>➕ Add Product</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                          <input placeholder="Name *" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} style={{ padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none' }} />
                          <input placeholder="Price (USD) *" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} style={{ padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none' }} />
                          <input placeholder="Stock" type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} style={{ padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none' }} />
                          <input placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} style={{ padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none' }} />
                          <input placeholder="Tag" value={newProduct.tag} onChange={(e) => setNewProduct({ ...newProduct, tag: e.target.value })} style={{ padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none' }} />
                          <button onClick={addProduct} style={{ background: theme.gradient, border: 'none', borderRadius: 12, padding: 14, color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Add Product</button>
                        </div>
                        <textarea placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} style={{ width: '100%', marginTop: 12, padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, outline: 'none', resize: 'none', height: 60, fontFamily: 'inherit', boxSizing: 'border-box' }} />
                        <div style={{ marginTop: 12 }}><ImageUpload currentImage={newProduct.image} onImageChange={(url) => setNewProduct({ ...newProduct, image: url })} theme={theme} /></div>
                      </div>
                      <h3 style={{ margin: '0 0 16px', fontSize: 16 }}>📦 Products ({products.length})</h3>
                      <div style={{ display: 'grid', gap: 12 }}>
                        {products.map(p => (
                          <div key={p.id} style={{ display: 'flex', gap: 16, background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 16, alignItems: 'center' }}>
                            <img src={p.image || 'https://via.placeholder.com/60'} alt="" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 12 }} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 600 }}>{p.name}</div>
                              <div style={{ fontSize: 13, color: theme.textMuted }}>${p.price} • Stock: {p.stock}</div>
                            </div>
                            <button onClick={() => setEditingProduct({ ...p })} style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 10, padding: '8px 16px', color: theme.text, cursor: 'pointer' }}>Edit</button>
                            <button onClick={() => deleteProduct(p.id)} style={{ background: '#ef4444', border: 'none', borderRadius: 10, padding: '8px 16px', color: '#fff', cursor: 'pointer' }}>Delete</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {adminTab === 'discounts' && (
                    <div>
                      <h3 style={{ margin: '0 0 20px', fontSize: 16 }}>🏷️ Discount Codes</h3>
                      <div style={{ display: 'grid', gap: 12 }}>
                        {discountCodes.map((code, i) => (
                          <div key={i} style={{ display: 'flex', gap: 16, background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 20, alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 700, fontSize: 18, fontFamily: 'monospace' }}>{code.code}</div>
                              <div style={{ fontSize: 13, color: theme.textMuted }}>{code.type === 'percent' ? `${code.value}% off` : `$${code.value} off`}</div>
                            </div>
                            <div style={{ padding: '6px 14px', borderRadius: 20, background: code.active ? '#10b98122' : '#ef444422', color: code.active ? '#10b981' : '#ef4444', fontSize: 12, fontWeight: 600 }}>{code.active ? 'Active' : 'Inactive'}</div>
                            <button onClick={() => { const updated = [...discountCodes]; updated[i].active = !updated[i].active; setDiscountCodes(updated); }} style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 10, padding: '8px 16px', color: theme.text, cursor: 'pointer' }}>{code.active ? 'Disable' : 'Enable'}</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {adminTab === 'subscribers' && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h3 style={{ margin: 0, fontSize: 16 }}>📧 Subscribers ({subscribers.length})</h3>
                        <button onClick={() => { const csv = subscribers.join('\n'); const blob = new Blob([csv], { type: 'text/csv' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'subscribers.csv'; a.click(); }} style={{ background: theme.gradient, border: 'none', borderRadius: 12, padding: '10px 20px', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Export CSV</button>
                      </div>
                      {subscribers.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: 60, color: theme.textMuted }}><div style={{ fontSize: 48, marginBottom: 16 }}>📭</div><p>No subscribers yet</p></div>
                      ) : (
                        <div style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 16, overflow: 'hidden' }}>
                          {subscribers.map((email, i) => (
                            <div key={i} style={{ padding: '14px 20px', borderBottom: i < subscribers.length - 1 ? `1px solid ${theme.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span>{email}</span>
                              <button onClick={() => setSubscribers(prev => prev.filter((_, idx) => idx !== i))} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 12 }}>Remove</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {adminTab === 'settings' && (
                    <div>
                      <h3 style={{ margin: '0 0 20px', fontSize: 16 }}>⚙️ Store Settings</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div>
                          <label style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8, display: 'block' }}>Store Name</label>
                          <input value={settings.storeName} onChange={(e) => setSettings({ ...settings, storeName: e.target.value })} style={{ width: '100%', padding: 16, borderRadius: 14, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, fontSize: 16, outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8, display: 'block' }}>Hero Image</label>
                          <ImageUpload currentImage={settings.heroImage} onImageChange={(url) => setSettings({ ...settings, heroImage: url })} theme={theme} />
                        </div>
                        <div>
                          <label style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8, display: 'block' }}>About Image</label>
                          <ImageUpload currentImage={settings.aboutImage} onImageChange={(url) => setSettings({ ...settings, aboutImage: url })} theme={theme} />
                        </div>
                      </div>
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
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 24, padding: 28, zIndex: 251, width: '90%', maxWidth: 500, animation: 'scaleIn 0.3s ease' }}>
            <h3 style={{ margin: '0 0 24px', fontSize: 18 }}>✏️ Edit Product</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input placeholder="Name" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} style={{ padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, outline: 'none' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <input placeholder="Price" type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} style={{ padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, outline: 'none' }} />
                <input placeholder="Stock" type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })} style={{ padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, outline: 'none' }} />
              </div>
              <input placeholder="Category" value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} style={{ padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, outline: 'none' }} />
              <textarea placeholder="Description" value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} style={{ padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, outline: 'none', resize: 'none', height: 80, fontFamily: 'inherit' }} />
              <ImageUpload currentImage={editingProduct.image} onImageChange={(url) => setEditingProduct({ ...editingProduct, image: url })} theme={theme} />
              <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
                <button onClick={() => setEditingProduct(null)} style={{ flex: 1, background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 16, color: theme.text, cursor: 'pointer' }}>Cancel</button>
                <button onClick={updateProduct} style={{ flex: 1, background: theme.gradient, border: 'none', borderRadius: 12, padding: 16, color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Save</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Hero Section */}
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1300, width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(60px)', transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${theme.accent1}15`, border: `1px solid ${theme.accent1}30`, borderRadius: 100, padding: '10px 20px', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', marginBottom: 28, color: theme.accent1, animation: 'pulse 3s ease-in-out infinite' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: theme.accent1, animation: 'blink 1.5s ease-in-out infinite' }} />
              {t.hero.badge}
            </div>
            
            <h1 style={{ fontSize: 'clamp(44px, 6vw, 76px)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.04em', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
              <span style={{ display: 'block', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s' }}>{t.hero.title1}</span>
              <span style={{ display: 'block', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s' }}>{t.hero.title2}</span>
              <span style={{ display: 'block', background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s', animation: 'shimmer 3s ease-in-out infinite' }}>{t.hero.title3}</span>
            </h1>
            
            <p style={{ fontSize: 17, color: theme.textMuted, lineHeight: 1.7, margin: '28px 0', maxWidth: 480, opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s' }}>{t.hero.subtitle}</p>

            <div style={{ display: 'flex', gap: 14, opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s' }}>
              <a href="#products" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: theme.gradient, color: '#fff', padding: '18px 32px', borderRadius: 16, fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: `0 16px 48px ${theme.glow}`, transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => e.target.style.transform = 'translateY(-2px) scale(1.02)'}
                onMouseLeave={e => e.target.style.transform = 'translateY(0) scale(1)'}>
                {t.hero.shopNow}
                <span style={{ transition: 'transform 0.3s' }}>→</span>
              </a>
              <a href="#about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: theme.bgSecondary, border: `1px solid ${theme.border}`, color: theme.text, padding: '18px 32px', borderRadius: 16, fontSize: 15, fontWeight: 500, textDecoration: 'none', backdropFilter: 'blur(10px)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.target.style.background = theme.bgTertiary; e.target.style.borderColor = theme.accent1; }}
                onMouseLeave={e => { e.target.style.background = theme.bgSecondary; e.target.style.borderColor = theme.border; }}>
                {t.hero.learnMore}
              </a>
            </div>

            <div style={{ display: 'flex', gap: 48, marginTop: 56, paddingTop: 32, borderTop: `1px solid ${theme.border}`, opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s' }}>
              {t.stats.map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{visibleSections.hero ? <AnimatedCounter value={stat.value} /> : '0'}</div>
                  <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0) rotate(0deg)' : 'translateY(80px) rotate(5deg)', transition: 'all 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s' }}>
            <div style={{ position: 'absolute', inset: -60, background: theme.gradient, opacity: 0.25, borderRadius: 60, filter: 'blur(80px)', zIndex: -1, animation: 'pulse 5s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: theme.gradient, borderRadius: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, boxShadow: `0 20px 60px ${theme.glow}`, animation: 'float 4s ease-in-out infinite', zIndex: 10 }}>🎁</div>
            <div style={{ background: `linear-gradient(135deg, ${theme.cardBg} 0%, transparent 100%)`, border: `1px solid ${theme.border}`, borderRadius: 32, padding: 24, backdropFilter: 'blur(20px)' }}>
              <img src={settings.heroImage} alt="Bundle" style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 24 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, padding: '0 4px' }}>
                <div>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginBottom: 4, letterSpacing: '0.1em' }}>FEATURED</div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>Holiday Collection</div>
                </div>
                <div style={{ background: theme.gradient, padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer', transition: 'all 0.3s' }}>{t.hero.shopNow}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" style={{ padding: '100px 24px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56, opacity: visibleSections.products ? 1 : 0, transform: visibleSections.products ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>{t.products.title}</h2>
            <p style={{ fontSize: 17, color: theme.textMuted, marginTop: 16 }}>{t.products.subtitle}</p>
          </div>

          {/* Search */}
          <div style={{ maxWidth: 500, margin: '0 auto 32px', position: 'relative' }}>
            <input type="text" placeholder={t.products.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '18px 24px 18px 56px', borderRadius: 20, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, fontSize: 15, outline: 'none', boxSizing: 'border-box', transition: 'all 0.3s' }}
              onFocus={e => e.target.style.borderColor = theme.accent1}
              onBlur={e => e.target.style.borderColor = theme.border} />
            <span style={{ position: 'absolute', left: 22, top: '50%', transform: 'translateY(-50%)', fontSize: 18, opacity: 0.5 }}>🔍</span>
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 48, flexWrap: 'wrap' }}>
            {categories.map((cat, i) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ padding: '12px 24px', borderRadius: 100, border: 'none', background: activeCategory === cat ? theme.gradient : theme.bgSecondary, color: activeCategory === cat ? '#fff' : theme.text, fontSize: 13, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.3s', boxShadow: activeCategory === cat ? `0 8px 24px ${theme.glow}` : 'none', opacity: visibleSections.products ? 1 : 0, transform: visibleSections.products ? 'translateY(0)' : 'translateY(20px)', transitionDelay: `${i * 0.05}s` }}>
                {cat === 'all' ? t.products.all : cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 80, color: theme.textMuted }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>🔍</div>
              <p style={{ fontSize: 18 }}>{t.products.noResults}</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
              {filteredProducts.map((product, index) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <div key={product.id}
                    style={{
                      background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 28,
                      overflow: 'hidden', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'pointer',
                      opacity: visibleSections.products ? 1 : 0,
                      transform: visibleSections.products ? 'translateY(0)' : 'translateY(50px)',
                      transitionDelay: `${index * 0.08}s`,
                      position: 'relative'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)'; e.currentTarget.style.boxShadow = `0 40px 80px rgba(0,0,0,0.3)`; e.currentTarget.style.borderColor = theme.accent1; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = theme.border; }}>
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name}
                        style={{ width: '100%', height: 260, objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                        onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                        onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                      {product.tag && (
                        <div style={{ position: 'absolute', top: 16, left: 16, background: theme.gradient, padding: '8px 14px', borderRadius: 10, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: '#fff', boxShadow: `0 8px 24px ${theme.glow}` }}>{product.tag}</div>
                      )}
                      <div style={{ position: 'absolute', top: 16, right: 16, background: `${theme.bg}dd`, backdropFilter: 'blur(10px)', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: stockStatus.color }}>{stockStatus.text}</div>
                    </div>
                    <div style={{ padding: 26 }}>
                      <h3 style={{ fontSize: 19, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>{product.name}</h3>
                      <p style={{ fontSize: 13, color: theme.textMuted, margin: '12px 0 18px', lineHeight: 1.6, minHeight: 40 }}>{product.description}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: theme.accent1, marginBottom: 18 }}>
                        <span>🚚</span>
                        <span>{t.cart.eta}: {getETA()}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif" }}>{formatPrice(product.price)}</div>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                          disabled={product.stock <= 0}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 8, background: product.stock <= 0 ? theme.bgSecondary : theme.gradient,
                            border: 'none', borderRadius: 14, padding: '14px 22px', color: '#fff', fontSize: 13, fontWeight: 600,
                            cursor: product.stock <= 0 ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
                            boxShadow: product.stock > 0 ? `0 8px 24px ${theme.glow}` : 'none',
                            opacity: product.stock <= 0 ? 0.5 : 1
                          }}>
                          <span style={{ fontSize: 16 }}>+</span> {t.products.addToCart}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '100px 24px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div style={{ opacity: visibleSections.about ? 1 : 0, transform: visibleSections.about ? 'translateX(0)' : 'translateX(-60px)', transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div style={{ display: 'inline-block', background: `${theme.accent1}15`, border: `1px solid ${theme.accent1}30`, borderRadius: 100, padding: '8px 18px', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', marginBottom: 24, color: theme.accent1 }}>{t.about.badge}</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 24px', fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'pre-line' }}>{t.about.title}</h2>
            <p style={{ fontSize: 17, color: theme.textMuted, lineHeight: 1.8 }}>{t.about.text}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 40 }}>
              {t.about.features.map((item, i) => (
                <div key={i}
                  style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 24, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'default', opacity: visibleSections.about ? 1 : 0, transform: visibleSections.about ? 'translateY(0)' : 'translateY(30px)', transitionDelay: `${0.2 + i * 0.1}s` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = theme.accent1; e.currentTarget.style.boxShadow = `0 20px 40px ${theme.glow}`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: theme.textMuted }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', opacity: visibleSections.about ? 1 : 0, transform: visibleSections.about ? 'translateX(0)' : 'translateX(60px)', transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s' }}>
            <div style={{ position: 'absolute', inset: -30, background: theme.gradient, opacity: 0.2, borderRadius: 40, filter: 'blur(50px)', zIndex: -1, animation: 'pulse 5s ease-in-out infinite' }} />
            <img src={settings.aboutImage} alt="About" style={{ width: '100%', height: 500, objectFit: 'cover', borderRadius: 32, border: `1px solid ${theme.border}` }} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ padding: '100px 24px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56, opacity: visibleSections.faq ? 1 : 0, transform: visibleSections.faq ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 16px', fontFamily: "'Space Grotesk', sans-serif" }}>{t.faq.title}</h2>
            <p style={{ fontSize: 17, color: theme.textMuted }}>{t.faq.subtitle}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FAQ_DATA.map((faq, i) => (
              <div key={i}
                style={{ background: theme.cardBg, border: `1px solid ${expandedFaq === i ? theme.accent1 : theme.border}`, borderRadius: 20, overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', opacity: visibleSections.faq ? 1 : 0, transform: visibleSections.faq ? 'translateY(0)' : 'translateY(30px)', transitionDelay: `${i * 0.05}s` }}>
                <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  style={{ width: '100%', padding: '22px 26px', background: 'transparent', border: 'none', color: theme.text, fontSize: 15, fontWeight: 600, textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {faq.q}
                  <span style={{ fontSize: 20, transition: 'transform 0.3s', transform: expandedFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
                <div style={{ maxHeight: expandedFaq === i ? 300 : 0, overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  <div style={{ padding: '0 26px 22px', color: theme.textMuted, lineHeight: 1.7, fontSize: 14 }}>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" style={{ padding: '80px 24px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 650, margin: '0 auto', textAlign: 'center', position: 'relative', opacity: visibleSections.newsletter ? 1 : 0, transform: visibleSections.newsletter ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <div style={{ position: 'absolute', inset: -100, background: theme.gradient, opacity: 0.08, filter: 'blur(100px)', borderRadius: '50%', zIndex: -1 }} />
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 14px', fontFamily: "'Space Grotesk', sans-serif" }}>{t.newsletter.title}</h2>
          <p style={{ fontSize: 16, color: theme.textMuted, marginBottom: 32 }}>{t.newsletter.subtitle}</p>
          <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto' }}>
            <input type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder={t.newsletter.placeholder}
              style={{ flex: 1, background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 16, padding: '18px 24px', color: theme.text, fontSize: 15, outline: 'none', transition: 'all 0.3s' }}
              onFocus={e => e.target.style.borderColor = theme.accent1}
              onBlur={e => e.target.style.borderColor = theme.border} />
            <button type="submit" style={{ background: theme.gradient, border: 'none', borderRadius: 16, padding: '18px 32px', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: `0 12px 36px ${theme.glow}`, transition: 'all 0.3s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}>
              {t.newsletter.button}
            </button>
          </form>
          {newsletterSuccess && <div style={{ marginTop: 20, color: theme.accent1, fontWeight: 600, animation: 'fadeInUp 0.5s ease' }}>✓ {t.newsletter.success}</div>}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '80px 24px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', opacity: visibleSections.contact ? 1 : 0, transform: visibleSections.contact ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 14px', fontFamily: "'Space Grotesk', sans-serif" }}>{t.contact.title}</h2>
          <p style={{ fontSize: 16, color: theme.textMuted, marginBottom: 40 }}>{t.contact.subtitle}</p>
          <div style={{ background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 28, padding: 36 }}>
            <input type="email" placeholder={t.contact.email} style={{ width: '100%', background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 18, color: theme.text, fontSize: 15, marginBottom: 16, outline: 'none', boxSizing: 'border-box', transition: 'all 0.3s' }} onFocus={e => e.target.style.borderColor = theme.accent1} onBlur={e => e.target.style.borderColor = theme.border} />
            <textarea placeholder={t.contact.message} rows={4} style={{ width: '100%', background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 18, color: theme.text, fontSize: 15, marginBottom: 16, outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'all 0.3s' }} onFocus={e => e.target.style.borderColor = theme.accent1} onBlur={e => e.target.style.borderColor = theme.border} />
            <button style={{ width: '100%', background: theme.gradient, border: 'none', borderRadius: 14, padding: 18, color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', boxShadow: `0 16px 48px ${theme.glow}`, transition: 'all 0.3s' }} onClick={() => showNotif(t.contact.success)}>{t.contact.send}</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '60px 24px 40px', borderTop: `1px solid ${theme.border}`, position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, background: theme.gradient, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff' }}>{settings.storeName.charAt(0)}</div>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{settings.storeName}</span>
              </div>
              <p style={{ color: theme.textMuted, fontSize: 14, maxWidth: 300, lineHeight: 1.7 }}>Curated bundles for every moment in life. Premium quality, delivered worldwide.</p>
            </div>
            <div style={{ display: 'flex', gap: 60 }}>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: theme.text }}>LEGAL</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button onClick={() => setShowLegal('privacy')} style={{ background: 'none', border: 'none', color: theme.textMuted, fontSize: 14, cursor: 'pointer', textAlign: 'left', padding: 0 }}>{t.footer.privacy}</button>
                  <button onClick={() => setShowLegal('terms')} style={{ background: 'none', border: 'none', color: theme.textMuted, fontSize: 14, cursor: 'pointer', textAlign: 'left', padding: 0 }}>{t.footer.terms}</button>
                  <button onClick={() => setShowLegal('refund')} style={{ background: 'none', border: 'none', color: theme.textMuted, fontSize: 14, cursor: 'pointer', textAlign: 'left', padding: 0 }}>{t.footer.refund}</button>
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: theme.text }}>SOCIAL</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Twitter', 'Instagram', 'Facebook'].map(s => <a key={s} href="#" style={{ color: theme.textMuted, fontSize: 14, textDecoration: 'none' }}>{s}</a>)}
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ color: theme.textMuted, fontSize: 13 }}>© 2024 {settings.storeName}. {t.footer.rights}</div>
            <div style={{ display: 'flex', gap: 16 }}>
              {Object.entries(COUNTRIES).slice(0, 6).map(([code, c]) => <span key={code} style={{ fontSize: 18, opacity: 0.6 }}>{c.flag}</span>)}
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <>
          <div onClick={() => setIsCartOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 200 }} />
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 440, background: theme.bg, borderLeft: `1px solid ${theme.border}`, zIndex: 201, display: 'flex', flexDirection: 'column', animation: 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div style={{ padding: 24, borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{t.cart.title} ({cartCount})</h3>
              <button onClick={() => setIsCartOpen(false)} style={{ background: theme.bgSecondary, border: 'none', borderRadius: 12, width: 40, height: 40, color: theme.text, cursor: 'pointer', fontSize: 20 }}>×</button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 60, color: theme.textMuted }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>🛒</div>
                  <p style={{ fontSize: 16 }}>{t.cart.empty}</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: 16, background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 16 }}>
                      <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 14 }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 600 }}>{item.name}</h4>
                        <div style={{ color: theme.textMuted, fontSize: 14 }}>{formatPrice(item.price)}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${theme.border}`, background: 'transparent', color: theme.text, cursor: 'pointer', fontSize: 16 }}>−</button>
                          <span style={{ fontWeight: 600 }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${theme.border}`, background: 'transparent', color: theme.text, cursor: 'pointer', fontSize: 16 }}>+</button>
                          <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 12 }}>{t.cart.remove}</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div style={{ padding: 24, borderTop: `1px solid ${theme.border}`, background: theme.bgSecondary }}>
                {/* Discount Code */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                  <input type="text" placeholder={t.cart.discountCode} value={discountInput} onChange={(e) => setDiscountInput(e.target.value)}
                    style={{ flex: 1, padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontSize: 14, outline: 'none' }} />
                  <button onClick={applyDiscountCode} style={{ background: theme.bgTertiary, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '14px 20px', color: theme.text, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>{t.cart.apply}</button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: theme.textMuted }}><span>{t.cart.subtotal}</span><span>{formatPrice(cartSubtotal)}</span></div>
                {appliedDiscount && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: '#10b981' }}><span>{t.cart.discount} ({appliedDiscount.code})</span><span>-{formatPrice(discountAmount)}</span></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: theme.textMuted }}><span>{t.cart.shipping}</span><span>{t.cart.shippingValue}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: theme.accent1 }}><span>{t.cart.eta}</span><span>{getETA()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, fontSize: 20, fontWeight: 700, paddingTop: 16, borderTop: `1px solid ${theme.border}` }}><span>{t.cart.total}</span><span>{formatPrice(cartTotal)}</span></div>
                <button onClick={() => alert(`Ready for Stripe!\n\nTotal: ${formatPrice(cartTotal)}\nCountry: ${countryData.name}\nETA: ${getETA()}`)}
                  style={{ width: '100%', background: theme.gradient, border: 'none', borderRadius: 16, padding: 20, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: `0 16px 48px ${theme.glow}`, transition: 'all 0.3s' }}>
                  {t.cart.checkout} — {formatPrice(cartTotal)}
                </button>
                <p style={{ textAlign: 'center', fontSize: 12, color: theme.textMuted, marginTop: 16 }}>{t.cart.secure}</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
        @keyframes floatReverse { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(20px); } }
        @keyframes pulse { 0%, 100% { opacity: 0.25; transform: scale(1); } 50% { opacity: 0.35; transform: scale(1.02); } }
        @keyframes shimmer { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.2); } }
        @keyframes bounceIn { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        ::placeholder { color: ${theme.textMuted}; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${theme.textMuted}; }
        @media (max-width: 900px) {
          section > div { grid-template-columns: 1fr !important; }
          nav { gap: 8px !important; }
          nav > a { display: none !important; }
        }
      `}</style>
    </div>
  );
}
