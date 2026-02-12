import { Share2, ShoppingCart, Headset, PenTool, Building2, Pill, Sparkles, Baby, Stethoscope, Store, TestTube, Smartphone } from 'lucide-react';

export const translations = {
  ar: {
    nav: {
      home: 'الرئيسية',
      services: 'خدماتنا',
      markets: 'تواجدنا',
      contact: 'تواصل معنا',
      book: 'احجز استشارتك',
      eservice: 'المحتوى التعليمي',
      metaAdsMaster: 'دورة إتقان إعلانات ميتا',
      metaAdsManager: 'محاكي مدير الإعلانات',
    },
    hero: {
      badge: 'الشريك رقم 1 للتسويق في مصر والسعودية',
      titleStart: 'نجاحك الطبي يبدأ بـ',
      titleHighlight: 'تسويق ذكي',
      description: 'في ميديسترا، ندمج الخبرة الطبية مع الإبداع الرقمي. نقدم حلول تسويق متكاملة تضمن لك الوصول لجمهورك المستهدف وزيادة حجوزاتك بشكل حقيقي.',
      quoteBtn: 'اطلب عرض سعر',
      servicesBtn: 'تصفح خدماتنا',
      mascotText: 'ضع صورة الماسكوت هنا',
    },
    services: {
      heading: 'خدماتنا المتميزة',
      subheading: 'نقدم باقة متكاملة من الخدمات الرقمية المصممة خصيصاً للقطاع الطبي لتلبية احتياجات الأطباء والمراكز العلاجية.',
      items: [
        {
          id: 'social-media',
          title: 'سوشيال ميديا ماركتينج',
          description: 'إدارة متكاملة لحسابات التواصل الاجتماعي لزيادة الوعي بعيادتك وجذب المزيد من المرضى.',
          icon: Share2,
          color: 'text-brand-blue'
        },
        {
          id: 'ecommerce',
          title: 'إدارة التجارة الإلكترونية',
          description: 'حلول متكاملة لبيع المنتجات الطبية والمستحضرات عبر الإنترنت مع تجربة مستخدم سلسة.',
          icon: ShoppingCart,
          color: 'text-brand-red'
        },
        {
          id: 'customer-service',
          title: 'إدارة خدمة العملاء',
          description: 'فريق متخصص للرد على استفسارات المرضى وحجز المواعيد لضمان رضاهم وولائهم.',
          icon: Headset,
          color: 'text-brand-yellow'
        },
        {
          id: 'content-marketing',
          title: 'التسويق بالمحتوى',
          description: 'كتابة محتوى طبي موثوق وجذاب يعزز من مكانتك كخبير في مجالك الطبي.',
          icon: PenTool,
          color: 'text-brand-green'
        },
        {
          id: 'web-mobile',
          title: 'انشاء المواقع وتطبيقات الجوال',
          description: 'تطوير مواقع إلكترونية وتطبيقات جوال طبية احترافية تضمن تجربة مستخدم مميزة وسهولة في الحجز.',
          icon: Smartphone,
          color: 'text-purple-600'
        }
      ]
    },
    beneficiaries: {
      heading: 'شركاء النجاح',
      subheading: 'نخدم القطاع الطبي بمختلف تخصصاته لنضمن نمو أعمالكم',
      items: [
        { label: 'المستشفيات', icon: Building2 },
        { label: 'شركات المكملات الغذائية', icon: Pill },
        { label: 'منتجات التجميل', icon: Sparkles },
        { label: 'مراكز النساء والتوليد', icon: Baby },
        { label: 'العيادات', icon: Stethoscope },
        { label: 'الصيدليات', icon: Store },
        { label: 'المعامل الطبية', icon: TestTube },
      ]
    },
    markets: {
      badge: 'تواجد دولي',
      title: 'خبرة تمتد عبر الحدود',
      subtitle: 'مصر والسعودية',
      description: 'نفهم طبيعة السوق الطبي في كل من مصر والمملكة العربية السعودية. نمتلك الخبرة في التعامل مع مختلف التخصصات الطبية ونعرف كيف نخاطب المريض في كل منطقة بلهجته وثقافته.',
      points: [
        'فهم عميق للوائح وزارة الصحة والتراخيص الإعلانية',
        'استهداف دقيق للمناطق الجغرافية (Geotargeting)',
        'إدارة حملات إعلانية تناسب المواسم الطبية في البلدين'
      ],
      stats: [
        { value: '+٢٠', label: 'عميل طبي' },
        { value: '٢ دولة', label: 'مصر والسعودية' },
        { value: '%٩٨', label: 'نسبة رضا العملاء' },
      ]
    },
    contact: {
      heading: 'جاهز لمضاعفة عدد عملائك؟',
      subheading: 'يمكنك ملء النموذج أدناه وسيصلنا على البريد الإلكتروني، أو تواصل معنا مباشرة عبر الواتساب للحصول على عرض سعر سريع.',
      call: 'واتساب',
      email: 'البريد الإلكتروني',
      addressTitle: 'المقر الرئيسي',
      address: 'القاهرة، مصر | الرياض، السعودية',
      whatsappBtn: 'اطلب عرض سعر عبر الواتساب',
      formTitle: 'أرسل لنا رسالة',
      nameLabel: 'الاسم',
      namePlaceholder: 'اسمك الكريم',
      phoneLabel: 'رقم الهاتف',
      phonePlaceholder: 'رقم الواتساب',
      clinicLabel: 'اسم العيادة / المستشفى',
      clinicPlaceholder: 'مثال: عيادات النور التخصصية',
      messageLabel: 'تفاصيل الطلب',
      messagePlaceholder: 'كيف يمكننا مساعدتك؟',
      submit: 'إرسال الطلب',
      submitting: 'جاري الإرسال...',
      success: 'تم الإرسال بنجاح!',
    },
    footer: {
      description: 'شريكك الاستراتيجي في التسويق الطبي. نساعدك في بناء علامة تجارية قوية والوصول للمرضى المناسبين بأحدث التقنيات.',
      quickLinks: 'روابط سريعة',
      contactUs: 'تواصل معنا',
      rights: '© ' + new Date().getFullYear() + ' ميديسترا. جميع الحقوق محفوظة.',
      madeIn: 'صنع بكل حب في مصر 🇪🇬'
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      markets: 'Presence',
      contact: 'Contact Us',
      book: 'Book Consultation',
      eservice: 'Educational Content',
      metaAdsMaster: 'Meta Ads Master Class',
      metaAdsManager: 'Ads Manager Simulator',
    },
    hero: {
      badge: '#1 Marketing Partner in Egypt & KSA',
      titleStart: 'Medical Success Starts with',
      titleHighlight: 'Smart Marketing',
      description: 'At Medestra, we blend medical expertise with digital creativity. We provide integrated marketing solutions ensuring you reach your target audience and genuinely increase your bookings.',
      quoteBtn: 'Get a Quote',
      servicesBtn: 'View Services',
      mascotText: 'Mascot Image Here',
    },
    services: {
      heading: 'Our Premium Services',
      subheading: 'We offer a comprehensive suite of digital services designed specifically for the medical sector to meet the needs of doctors and medical centers.',
      items: [
        {
          id: 'social-media',
          title: 'Social Media Marketing',
          description: 'Integrated management of social media accounts to increase awareness of your clinic and attract more patients.',
          icon: Share2,
          color: 'text-brand-blue'
        },
        {
          id: 'ecommerce',
          title: 'E-commerce Management',
          description: 'Complete solutions for selling medical products and supplies online with a seamless user experience.',
          icon: ShoppingCart,
          color: 'text-brand-red'
        },
        {
          id: 'customer-service',
          title: 'Customer Service Management',
          description: 'A specialized team to respond to patient inquiries and book appointments to ensure satisfaction and loyalty.',
          icon: Headset,
          color: 'text-brand-yellow'
        },
        {
          id: 'content-marketing',
          title: 'Content Marketing',
          description: 'Writing reliable and engaging medical content that reinforces your position as an expert in your medical field.',
          icon: PenTool,
          color: 'text-brand-green'
        },
        {
          id: 'web-mobile',
          title: 'Web & Mobile App Development',
          description: 'Development of professional medical websites and mobile apps ensuring distinctive user experience and easy booking.',
          icon: Smartphone,
          color: 'text-purple-600'
        }
      ]
    },
    beneficiaries: {
      heading: 'Industries We Serve',
      subheading: 'We serve the medical sector in various specialties to ensure your business growth',
      items: [
        { label: 'Hospitals', icon: Building2 },
        { label: 'Supplement Companies', icon: Pill },
        { label: 'Cosmetics', icon: Sparkles },
        { label: 'OBGYN Centers', icon: Baby },
        { label: 'Clinics', icon: Stethoscope },
        { label: 'Pharmacies', icon: Store },
        { label: 'Medical Labs', icon: TestTube },
      ]
    },
    markets: {
      badge: 'International Presence',
      title: 'Experience Across Borders',
      subtitle: 'Egypt & Saudi Arabia',
      description: 'We understand the nature of the medical market in both Egypt and KSA. We have expertise in dealing with various medical specialties and know how to address patients in each region with their dialect and culture.',
      points: [
        'Deep understanding of Ministry of Health regulations',
        'Precise Geographic Targeting (Geotargeting)',
        'Managing ad campaigns that fit medical seasons in both countries'
      ],
      stats: [
        { value: '+20', label: 'Medical Clients' },
        { value: '2 Countries', label: 'Egypt & KSA' },
        { value: '98%', label: 'Client Satisfaction' },
      ]
    },
    contact: {
      heading: 'Ready to double your clients?',
      subheading: 'Fill out the form below to email us, or contact us directly via WhatsApp for a quick quote.',
      call: 'WhatsApp',
      email: 'Email',
      addressTitle: 'Headquarters',
      address: 'Cairo, Egypt | Riyadh, KSA',
      whatsappBtn: 'Get Quote via WhatsApp',
      formTitle: 'Send us a message',
      nameLabel: 'Name',
      namePlaceholder: 'Your Name',
      phoneLabel: 'Phone Number',
      phonePlaceholder: 'WhatsApp Number',
      clinicLabel: 'Clinic / Hospital Name',
      clinicPlaceholder: 'Ex: Al-Noor Specialized Clinics',
      messageLabel: 'Request Details',
      messagePlaceholder: 'How can we help you?',
      submit: 'Send Request',
      submitting: 'Sending...',
      success: 'Sent Successfully!',
    },
    footer: {
      description: 'Your strategic partner in medical marketing. We help you build a strong brand and reach the right patients with the latest technologies.',
      quickLinks: 'Quick Links',
      contactUs: 'Connect With Us',
      rights: '© ' + new Date().getFullYear() + ' Medestra. All rights reserved.',
      madeIn: 'Made with love in Egypt 🇪🇬'
    }
  }
};