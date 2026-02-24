export interface Service {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  shortDesc_en: string;
  shortDesc_ar: string;
  tagline_en: string;
  tagline_ar: string;
  description_en: string;
  description_ar: string;
  background: string;
  iconBg: string;
  primaryColor: string;
  features_en: Array<{ icon: string; title: string; description: string }>;
  features_ar: Array<{ icon: string; title: string; description: string }>;
  benefits_en: string[];
  benefits_ar: string[];
  steps_en: Array<{ number: string; title: string; description: string }>;
  steps_ar: Array<{ number: string; title: string; description: string }>;
  testimonials: Array<{ name: string; role: string; content: string; avatar?: string }>;
  faqs_en: Array<{ question: string; answer: string }>;
  faqs_ar: Array<{ question: string; answer: string }>;
}

export const SERVICES: Service[] = [
  {
    id: 'medical-content',
    slug: 'medical-content',
    title_en: 'Medical Content Marketing',
    title_ar: 'تسويق المحتوى الطبي',
    shortDesc_en: 'Educate and engage your audience with compelling medical content.',
    shortDesc_ar: 'تثقيف وتفاعل جمهورك بمحتوى طبي جذاب.',
    tagline_en: 'Build Trust Through Knowledge',
    tagline_ar: 'بناء الثقة من خلال المعرفة',
    description_en: 'Our medical content marketing service creates educational, SEO-optimized articles, blog posts, and infographics that establish your clinic or hospital as a trusted authority in healthcare.',
    description_ar: 'خدمة تسويق المحتوى الطبي لدينا تنشئ مقالات وتدوينات وإنفوجرافيك تثقيفية ومحسنة للسيو تؤسس عيادتك أو مستشفاك كسلطة موثوقة في الرعاية الصحية.',
    background: 'from-blue-50 to-blue-100',
    iconBg: 'bg-blue-200',
    primaryColor: '#2563EB',
    features_en: [
      { icon: '📝', title: 'SEO Articles', description: 'Optimized content for search rankings' },
      { icon: '🎯', title: 'Patient Education', description: 'Clear explanations for healthcare topics' },
      { icon: '📊', title: 'Analytics', description: 'Track performance and engagement' },
      { icon: '🔄', title: 'Content Calendar', description: 'Consistent publishing schedule' },
      { icon: '💡', title: 'Infographics', description: 'Visual medical data representation' },
      { icon: '📱', title: 'Multi-Platform', description: 'Blog, social media, and email' }
    ],
    features_ar: [
      { icon: '📝', title: 'مقالات سيو', description: 'محتوى محسّن لتصنيفات البحث' },
      { icon: '🎯', title: 'تثقيف المريض', description: 'شروحات واضحة للمواضيع الطبية' },
      { icon: '📊', title: 'التحليلات', description: 'تتبع الأداء والمشاركة' },
      { icon: '🔄', title: 'تقويم المحتوى', description: 'جدول نشر منتظم' },
      { icon: '💡', title: 'إنفوجرافيك', description: 'تمثيل بصري للبيانات الطبية' },
      { icon: '📱', title: 'متعدد المنصات', description: 'مدونة وسائل تواصل وبريد' }
    ],
    benefits_en: [
      'Establish authority in your specialty',
      'Increase organic website traffic by 250%+',
      'Build patient trust and confidence',
      'Improve SEO rankings for medical keywords',
      'Generate qualified patient leads',
      'Reduce patient inquiries through informative content'
    ],
    benefits_ar: [
      'أسس سلطتك في التخصص',
      'زيادة حركة المرور العضوية بأكثر من 250%',
      'بناء ثقة المريض والثقة به',
      'تحسين تصنيفات السيو للكلمات الطبية',
      'توليد عملاء مرضى مؤهلين',
      'تقليل استفسارات المرضى من خلال المحتوى المفيد'
    ],
    steps_en: [
      { number: '01', title: 'Strategy Development', description: 'We analyze your target audience and create a content roadmap' },
      { number: '02', title: 'Content Creation', description: 'Expert writers develop engaging, medically accurate content' },
      { number: '03', title: 'SEO Optimization', description: 'Each piece is optimized for search engines and readability' },
      { number: '04', title: 'Distribution & Analytics', description: 'Content is published and performance is tracked' }
    ],
    steps_ar: [
      { number: '01', title: 'تطوير الاستراتيجية', description: 'نحلل جمهورك المستهدف ونضع خريطة طريق للمحتوى' },
      { number: '02', title: 'إنشاء المحتوى', description: 'كتاب متخصصون ينشئون محتوى جذاب وطبيًا دقيقًا' },
      { number: '03', title: 'تحسين السيو', description: 'يتم تحسين كل قطعة محتوى لمحركات البحث والقراءة' },
      { number: '04', title: 'النشر والتحليلات', description: 'يتم نشر المحتوى وتتبع الأداء' }
    ],
    testimonials: [
      { name: 'Dr. Ahmed Hassan', role: 'Clinic Owner', content: 'Their content marketing doubled our patient inquiries within 3 months.' },
      { name: 'Dr. Fatima', role: 'Hospital Manager', content: 'Professional, reliable, and results-driven. Highly recommended!' }
    ],
    faqs_en: [
      { question: 'How often will content be published?', answer: 'We typically publish 4-8 pieces per month, depending on your package.' },
      { question: 'Can you write about specific medical topics?', answer: 'Yes! We work with medical professionals to ensure accuracy.' },
      { question: 'How do you measure success?', answer: 'We track organic traffic, rankings, leads, and engagement metrics.' },
      { question: 'What is the typical cost?', answer: 'Pricing starts from $500/month. Let\'s discuss your needs!' }
    ],
    faqs_ar: [
      { question: 'ما هي تكرار نشر المحتوى؟', answer: 'عادة ننشر 4-8 قطع شهريًا حسب الحزمة المختارة.' },
      { question: 'هل يمكنكم الكتابة عن مواضيع طبية محددة؟', answer: 'نعم! نعمل مع المتخصصين الطبيين لضمان الدقة.' },
      { question: 'كيف تقيسون النجاح؟', answer: 'نتتبع حركة البحث العضوية والتصنيفات والعملاء والتفاعل.' },
      { question: 'ما هي التكلفة الإجمالية؟', answer: 'تبدأ الأسعار من $500 شهريًا. دعنا نناقش احتياجاتك!' }
    ]
  },
  {
    id: 'customer-service',
    slug: 'customer-service',
    title_en: 'Customer Service Management',
    title_ar: 'إدارة خدمة العملاء',
    shortDesc_en: 'Transform patient interactions into positive experiences.',
    shortDesc_ar: 'تحويل تفاعلات المريض إلى تجارب إيجابية.',
    tagline_en: 'Excellence in Patient Care',
    tagline_ar: 'التميز في رعاية المريض',
    description_en: 'We manage your customer service operations with trained professionals, ensuring every patient interaction reflects your clinic\'s commitment to excellence.',
    description_ar: 'نإدارة عمليات خدمة العملاء لديك بمحترفين مدربين، مما يضمن أن كل تفاعل مريض يعكس التزام عيادتك بالتميز.',
    background: 'from-teal-50 to-teal-100',
    iconBg: 'bg-teal-200',
    primaryColor: '#0891B2',
    features_en: [
      { icon: '📞', title: 'Call Management', description: 'Professional phone support for all inquiries' },
      { icon: '💬', title: 'Chat Support', description: 'Real-time messaging on WhatsApp and web' },
      { icon: '📧', title: 'Email Handling', description: 'Professional email responses within 2 hours' },
      { icon: '📅', title: 'Appointment Booking', description: 'Seamless scheduling and reminders' },
      { icon: '📋', title: 'CRM Integration', description: 'Track all patient interactions' },
      { icon: '✅', title: 'Quality Assurance', description: 'Regular monitoring and feedback' }
    ],
    features_ar: [
      { icon: '📞', title: 'إدارة المكالمات', description: 'دعم هاتفي احترافي لجميع الاستفسارات' },
      { icon: '💬', title: 'دعم الدردشة', description: 'رسائل حية على الواتساب والويب' },
      { icon: '📧', title: 'معالجة البريد', description: 'ردود بريد احترافية خلال ساعتين' },
      { icon: '📅', title: 'حجز المواعيد', description: 'جدولة سلسة والتذكيرات' },
      { icon: '📋', title: 'تكامل CRM', description: 'تتبع جميع تفاعلات المريض' },
      { icon: '✅', title: 'ضمان الجودة', description: 'مراقبة منتظمة وملاحظات' }
    ],
    benefits_en: [
      'Improve patient satisfaction scores',
      'Reduce appointment no-shows by 40%',
      'Increase patient retention',
      'Professional 24/7 availability',
      'Multilingual support (Arabic & English)',
      'Focus on core medical services while we handle inquiries'
    ],
    benefits_ar: [
      'تحسين درجات رضا المريض',
      'تقليل عدم الحضور بنسبة 40%',
      'زيادة الاحتفاظ بالمرضى',
      'توفر احترافي 24/7',
      'دعم متعدد اللغات (عربي وإنجليزي)',
      'التركيز على الخدمات الطبية بينما نتولى الاستفسارات'
    ],
    steps_en: [
      { number: '01', title: 'Onboarding', description: 'We train our team on your clinic\'s procedures' },
      { number: '02', title: 'System Setup', description: 'Integration with your existing tools and CRM' },
      { number: '03', title: 'Live Support', description: 'Real-time management of patient interactions' },
      { number: '04', title: 'Reporting & Optimization', description: 'Monthly reports and continuous improvement' }
    ],
    steps_ar: [
      { number: '01', title: 'التدريب', description: 'نقوم بتدريب فريقنا على إجراءات عيادتك' },
      { number: '02', title: 'إعداد النظام', description: 'التكامل مع أدواتك وأنظمة CRM الموجودة' },
      { number: '03', title: 'الدعم المباشر', description: 'إدارة فورية لتفاعلات المريض' },
      { number: '04', title: 'التقارير والتحسين', description: 'تقارير شهرية وتحسين مستمر' }
    ],
    testimonials: [
      { name: 'Dr. Sara Mohammed', role: 'Hospital Director', content: 'Patient satisfaction increased by 35% after we switched to their service.' },
      { name: 'Dr. Karim', role: 'Clinic Manager', content: 'Reliable, professional, and always responsive to our needs.' }
    ],
    faqs_en: [
      { question: 'What hours are covered?', answer: 'We offer flexible coverage from 8 AM to 10 PM daily.' },
      { question: 'Can you handle multiple languages?', answer: 'Yes, we provide Arabic and English support.' },
      { question: 'How do you handle emergencies?', answer: 'We escalate urgent cases immediately to your medical team.' },
      { question: 'What systems can you integrate with?', answer: 'We integrate with most CRM and clinic management software.' }
    ],
    faqs_ar: [
      { question: 'ما هي ساعات التغطية؟', answer: 'نوفر تغطية مرنة من 8 صباحًا إلى 10 مساءً يوميًا.' },
      { question: 'هل يمكنكم التعامل مع لغات متعددة؟', answer: 'نعم، نوفر دعم عربي وإنجليزي.' },
      { question: 'كيف تتعاملون مع الحالات الطارئة؟', answer: 'نرفع الحالات الطارئة فورًا إلى فريقك الطبي.' },
      { question: 'ما هي الأنظمة التي يمكنكم التكامل معها؟', answer: 'نتكامل مع معظم برامج CRM وإدارة العيادات.' }
    ]
  },
  {
    id: 'ecommerce',
    slug: 'ecommerce',
    title_en: 'E-commerce Management',
    title_ar: 'إدارة التجارة الإلكترونية',
    shortDesc_en: 'Sell medical products and services online with confidence.',
    shortDesc_ar: 'بيع المنتجات والخدمات الطبية عبر الإنترنت بثقة.',
    tagline_en: 'Turn Browsers into Buyers',
    tagline_ar: 'تحويل المتصفحين إلى مشترين',
    description_en: 'From setup to optimization, we manage your complete online store for medical products, supplements, and services with secure payments and inventory management.',
    description_ar: 'من الإعداد إلى التحسين، ندير متجرك الإلكتروني الكامل للمنتجات الطبية والمكملات والخدمات مع الدفع الآمن وإدارة المخزون.',
    background: 'from-amber-50 to-orange-50',
    iconBg: 'bg-orange-200',
    primaryColor: '#F97316',
    features_en: [
      { icon: '🛍️', title: 'Store Setup', description: 'Professional e-commerce store creation' },
      { icon: '💳', title: 'Payment Integration', description: 'Secure credit card and online payments' },
      { icon: '📦', title: 'Inventory Management', description: 'Real-time stock tracking' },
      { icon: '📊', title: 'Sales Analytics', description: 'Track revenue and customer behavior' },
      { icon: '🔐', title: 'Security', description: 'HIPAA compliant and PCI certified' },
      { icon: '🚚', title: 'Shipping Integration', description: 'Automated fulfillment and tracking' }
    ],
    features_ar: [
      { icon: '🛍️', title: 'إعداد المتجر', description: 'إنشاء متجر تجارة إلكترونية احترافي' },
      { icon: '💳', title: 'تكامل الدفع', description: 'دفع آمن بطاقات ائتمان وعبر الإنترنت' },
      { icon: '📦', title: 'إدارة المخزون', description: 'تتبع المخزون الفوري' },
      { icon: '📊', title: 'تحليلات المبيعات', description: 'تتبع الإيرادات وسلوك العملاء' },
      { icon: '🔐', title: 'الأمان', description: 'متوافق مع HIPAA ومعتمد PCI' },
      { icon: '🚚', title: 'تكامل الشحن', description: 'الإتمام والتتبع الآلي' }
    ],
    benefits_en: [
      'Generate additional revenue stream',
      'Reach patients beyond your clinic',
      'Reduce manual order processing',
      'Increase average transaction value',
      'Provide convenient home delivery',
      '24/7 automated sales channel'
    ],
    benefits_ar: [
      'توليد دخل إضافي',
      'الوصول إلى المرضى خارج عيادتك',
      'تقليل معالجة الطلبات اليدوية',
      'زيادة قيمة المعاملات',
      'توفير توصيل منزلي مريح',
      'قناة مبيعات آلية 24/7'
    ],
    steps_en: [
      { number: '01', title: 'Product Catalog Setup', description: 'We organize and list all your products' },
      { number: '02', title: 'Payment & Shipping Setup', description: 'Configure secure payments and delivery options' },
      { number: '03', title: 'Launch Store', description: 'Go live with your online store' },
      { number: '04', title: 'Ongoing Management', description: 'Daily operations, orders, and support' }
    ],
    steps_ar: [
      { number: '01', title: 'إعداد فهرس المنتجات', description: 'ننظم ونرسم جميع منتجاتك' },
      { number: '02', title: 'إعداد الدفع والشحن', description: 'تكوين الدفع الآمن وخيارات التسليم' },
      { number: '03', title: 'إطلاق المتجر', description: 'البدء بمتجرك الإلكتروني' },
      { number: '04', title: 'الإدارة المستمرة', description: 'العمليات اليومية والطلبات والدعم' }
    ],
    testimonials: [
      { name: 'Pharmacy Manager', role: 'Healthcare Retail', content: 'Our online sales increased by 180% in the first 6 months.' },
      { name: 'Dr. Hassan', role: 'Clinic Owner', content: 'Simple to use and great for our supplement sales!' }
    ],
    faqs_en: [
      { question: 'What payment methods do you support?', answer: 'We support credit cards, debit cards, and digital wallets.' },
      { question: 'How do you handle medical product compliance?', answer: 'We ensure all products meet regulatory requirements.' },
      { question: 'Can you handle B2B orders?', answer: 'Yes, we can set up wholesale and corporate accounts.' },
      { question: 'What are your processing fees?', answer: 'Standard payment processing with competitive rates. Let\'s discuss!' }
    ],
    faqs_ar: [
      { question: 'ما هي طرق الدفع المدعومة؟', answer: 'ندعم بطاقات الائتمان والخصم والمحافظ الرقمية.' },
      { question: 'كيف تتعاملون مع الامتثال للمنتجات الطبية؟', answer: 'نضمن توافق جميع المنتجات مع المتطلبات التنظيمية.' },
      { question: 'هل يمكنكم التعامل مع طلبات B2B؟', answer: 'نعم، يمكننا إعداد حسابات الجملة والشركات.' },
      { question: 'ما هي رسوم المعالجة؟', answer: 'معالجة دفع قياسية برسوم تنافسية. دعنا نناقش!' }
    ]
  },
  {
    id: 'social-media',
    slug: 'social-media',
    title_en: 'Social Media Marketing',
    title_ar: 'تسويق وسائل التواصل الاجتماعي',
    shortDesc_en: 'Build engaged communities and grow your medical brand online.',
    shortDesc_ar: 'بناء مجتمعات فعالة ونمو علامتك الطبية عبر الإنترنت.',
    tagline_en: 'Connect. Engage. Grow.',
    tagline_ar: 'الاتصال. الارتباط. النمو.',
    description_en: 'We create and manage your social media presence across all platforms, building trust, engagement, and patient loyalty.',
    description_ar: 'ننشئ وندير وجودك على وسائل التواصل الاجتماعي عبر جميع المنصات، ببناء الثقة والمشاركة وولاء المريض.',
    background: 'from-rose-50 to-pink-50',
    iconBg: 'bg-pink-200',
    primaryColor: '#E11D48',
    features_en: [
      { icon: '📱', title: 'Content Creation', description: 'Professional graphics, videos, and posts' },
      { icon: '📅', title: 'Scheduling', description: 'Consistent posting on optimal times' },
      { icon: '👥', title: 'Community Management', description: 'Engage with followers daily' },
      { icon: '📈', title: 'Growth Strategy', description: 'Strategic follower growth campaigns' },
      { icon: '💰', title: 'Paid Advertising', description: 'Targeted ads for lead generation' },
      { icon: '📊', title: 'Analytics & Reports', description: 'Monthly performance insights' }
    ],
    features_ar: [
      { icon: '📱', title: 'إنشاء المحتوى', description: 'رسومات واحترافية وفيديوهات ومنشورات' },
      { icon: '📅', title: 'الجدولة', description: 'نشر مستمر في الأوقات المثلى' },
      { icon: '👥', title: 'إدارة المجتمع', description: 'التفاعل مع المتابعين يوميًا' },
      { icon: '📈', title: 'استراتيجية النمو', description: 'حملات نمو المتابعين الاستراتيجية' },
      { icon: '💰', title: 'الإعلانات المدفوعة', description: 'إعلانات موجهة لتوليد العملاء' },
      { icon: '📊', title: 'التحليلات والتقارير', description: 'رؤى الأداء الشهرية' }
    ],
    benefits_en: [
      'Build brand recognition and trust',
      'Generate qualified patient leads',
      'Improve patient engagement by 300%',
      'Cost-effective patient acquisition',
      'Real-time patient communication channel',
      'Showcase clinic expertise and success stories'
    ],
    benefits_ar: [
      'بناء الاعتراف والثقة بالعلامة',
      'توليد عملاء مرضى مؤهلين',
      'تحسين مشاركة المريض بنسبة 300%',
      'استقطاب مرضى فعال من حيث التكلفة',
      'قناة اتصال فورية مع المريض',
      'عرض خبرة العيادة وقصص النجاح'
    ],
    steps_en: [
      { number: '01', title: 'Audit & Strategy', description: 'We analyze your current presence and create a plan' },
      { number: '02', title: 'Content Production', description: 'Create engaging medical and lifestyle content' },
      { number: '03', title: 'Launch & Grow', description: 'Publish consistently and grow your audience' },
      { number: '04', title: 'Optimize & Scale', description: 'Use data to improve and scale campaigns' }
    ],
    steps_ar: [
      { number: '01', title: 'التدقيق والاستراتيجية', description: 'نحلل وجودك الحالي ننشئ خطة' },
      { number: '02', title: 'إنتاج المحتوى', description: 'ننشئ محتوى طبي وترفيهي جذاب' },
      { number: '03', title: 'الإطلاق والنمو', description: 'النشر المستمر ونمو جمهورك' },
      { number: '04', title: 'التحسين والتوسع', description: 'استخدام البيانات للتحسين والتوسع' }
    ],
    testimonials: [
      { name: 'Dr. Layla', role: 'Dental Clinic', content: 'Our Instagram followers grew from 500 to 12,000 in 8 months!' },
      { name: 'Healthcare Facility', role: 'Hospital', content: 'Excellent results and professional team. Highly satisfied!' }
    ],
    faqs_en: [
      { question: 'Which platforms do you manage?', answer: 'Facebook, Instagram, LinkedIn, TikTok, and Twitter.' },
      { question: 'How often will you post?', answer: 'Daily posts across platforms, tailored to your schedule.' },
      { question: 'Can you help with paid advertising?', answer: 'Yes, we manage and optimize all paid social campaigns.' },
      { question: 'How do you measure success?', answer: 'Through engagement rates, reach, leads, and conversions.' }
    ],
    faqs_ar: [
      { question: 'أي منصات تديرونها؟', answer: 'فيسبوك وإنستغرام ولينكدإن وتيكتوك وتويتر.' },
      { question: 'كم مرة ستنشرون؟', answer: 'منشورات يومية عبر المنصات، مخصصة لجدولك.' },
      { question: 'هل يمكنكم المساعدة في الإعلانات المدفوعة؟', answer: 'نعم، ندير وتحسين جميع حملات التواصل الاجتماعي المدفوعة.' },
      { question: 'كيف تقيسون النجاح؟', answer: 'من خلال معدلات المشاركة والوصول والعملاء والتحويلات.' }
    ]
  },
  {
    id: 'team-training',
    slug: 'team-training',
    title_en: 'Marketing Team Training',
    title_ar: 'تدريب فريق التسويق',
    shortDesc_en: 'Empower your team with cutting-edge marketing skills.',
    shortDesc_ar: 'دعّم فريقك بمهارات تسويق متقدمة.',
    tagline_en: 'Knowledge is Power',
    tagline_ar: 'المعرفة قوة',
    description_en: 'Our comprehensive training programs equip your team with the latest healthcare marketing strategies, digital tools, and best practices.',
    description_ar: 'برامج التدريب الشاملة لدينا تزود فريقك بأحدث استراتيجيات التسويق الصحي والأدوات الرقمية وأفضل الممارسات.',
    background: 'from-violet-50 to-purple-100',
    iconBg: 'bg-purple-200',
    primaryColor: '#7C3AED',
    features_en: [
      { icon: '👨‍🏫', title: 'Expert Trainers', description: 'Industry veterans and certified professionals' },
      { icon: '📚', title: 'Comprehensive Curriculum', description: 'From basics to advanced strategies' },
      { icon: '💻', title: 'Hands-on Workshops', description: 'Practical, real-world exercises' },
      { icon: '📖', title: 'Training Materials', description: 'Guides, templates, and resources' },
      { icon: '👥', title: 'Group Sessions', description: 'Collaborative learning environment' },
      { icon: '🏆', title: 'Certification', description: 'Industry-recognized certificates' }
    ],
    features_ar: [
      { icon: '👨‍🏫', title: 'مدربون خبراء', description: 'قدامى الصناعة والمحترفون المعتمدون' },
      { icon: '📚', title: 'منهج شامل', description: 'من الأساسيات إلى الاستراتيجيات المتقدمة' },
      { icon: '💻', title: 'ورش عمل عملية', description: 'تمارين عملية وواقعية' },
      { icon: '📖', title: 'مواد التدريب', description: 'أدلة وقوالب وموارد' },
      { icon: '👥', title: 'جلسات جماعية', description: 'بيئة تعلم تعاونية' },
      { icon: '🏆', title: 'شهادة', description: 'شهادات معترف بها من الصناعة' }
    ],
    benefits_en: [
      'Build in-house marketing expertise',
      'Reduce dependency on external agencies',
      'Improve campaign performance',
      'Faster implementation of strategies',
      'Higher ROI from marketing investments',
      'Stay updated with industry trends'
    ],
    benefits_ar: [
      'بناء خبرة تسويق داخلية',
      'تقليل الاعتماد على الوكالات الخارجية',
      'تحسين أداء الحملات',
      'تطبيق أسرع للاستراتيجيات',
      'عائد استثمار أعلى من استثمارات التسويق',
      'البقاء على اطلاع باتجاهات الصناعة'
    ],
    steps_en: [
      { number: '01', title: 'Needs Assessment', description: 'We evaluate your team\'s current skills and needs' },
      { number: '02', title: 'Custom Training Plan', description: 'Design program tailored to your goals' },
      { number: '03', title: 'Training Delivery', description: 'Group sessions over 2-4 weeks' },
      { number: '04', title: 'Support & Follow-up', description: 'Ongoing mentorship and support' }
    ],
    steps_ar: [
      { number: '01', title: 'تقييم الاحتياجات', description: 'نقيم مهارات واحتياجات فريقك الحالية' },
      { number: '02', title: 'خطة تدريب مخصصة', description: 'تصميم برنامج مشروط بأهدافك' },
      { number: '03', title: 'تقديم التدريب', description: 'جلسات جماعية على مدى 2-4 أسابيع' },
      { number: '04', title: 'الدعم والمتابعة', description: 'الإرشاد المستمر والدعم' }
    ],
    testimonials: [
      { name: 'Marketing Manager', role: 'Hospital', content: 'Great training program. Our team is now much more confident!' },
      { name: 'Clinic Administrator', role: 'Private Practice', content: 'Practical and applicable. Worth every penny!' }
    ],
    faqs_en: [
      { question: 'What modules are included?', answer: 'SEO, social media, content marketing, analytics, and more.' },
      { question: 'How long is the training?', answer: 'Typically 2-4 weeks depending on intensity and content.' },
      { question: 'Is it online or in-person?', answer: 'Both options available. Flexible to your needs.' },
      { question: 'Do you provide ongoing support?', answer: 'Yes, 3 months of email and phone support included.' }
    ],
    faqs_ar: [
      { question: 'ما المواد المضمنة؟', answer: 'السيو ووسائل التواصل والمحتوى والتحليلات وغيرها.' },
      { question: 'ما مدة التدريب؟', answer: 'عادة 2-4 أسابيع حسب الكثافة والمحتوى.' },
      { question: 'هل هو أونلاين أم وجاهي؟', answer: 'كلا الخيارين متاح. مرن وفقًا لاحتياجاتك.' },
      { question: 'هل توفرون دعم مستمر؟', answer: 'نعم، 3 أشهر من دعم البريد والهاتف مضمنة.' }
    ]
  },
  {
    id: 'web-mobile',
    slug: 'web-mobile',
    title_en: 'Website & Mobile App Development',
    title_ar: 'تطوير الموقع والتطبيق الجوال',
    shortDesc_en: 'Professional digital platforms that convert visitors to patients.',
    shortDesc_ar: 'منصات رقمية احترافية تحول الزوار إلى مرضى.',
    tagline_en: 'Build. Convert. Grow.',
    tagline_ar: 'بناء. تحويل. نمو.',
    description_en: 'Custom-built websites and mobile apps designed specifically for healthcare providers, with an emphasis on user experience, security, and conversion.',
    description_ar: 'مواقع وتطبيقات جوال مخصصة مصممة خصيصًا لمقدمي الرعاية الصحية، مع التركيز على تجربة المستخدم والأمان والتحويل.',
    background: 'from-cyan-50 to-sky-50',
    iconBg: 'bg-sky-200',
    primaryColor: '#0284C7',
    features_en: [
      { icon: '🌐', title: 'Responsive Design', description: 'Perfect on all devices and screen sizes' },
      { icon: '⚡', title: 'Fast Performance', description: 'Lightning-fast loading speeds' },
      { icon: '🔐', title: 'Security', description: 'HIPAA compliant and SSL encrypted' },
      { icon: '📱', title: 'Mobile Apps', description: 'Native iOS and Android applications' },
      { icon: '🔄', title: 'Appointment Booking', description: 'Integrated online scheduling system' },
      { icon: '📊', title: 'Analytics', description: 'Built-in performance tracking' }
    ],
    features_ar: [
      { icon: '🌐', title: 'تصميم متجاوب', description: 'مثالي على جميع الأجهزة وأحجام الشاشات' },
      { icon: '⚡', title: 'أداء سريع', description: 'سرعات تحميل خاطفة' },
      { icon: '🔐', title: 'الأمان', description: 'متوافق مع HIPAA وتشفير SSL' },
      { icon: '📱', title: 'تطبيقات الجوال', description: 'تطبيقات iOS و Android أصلية' },
      { icon: '🔄', title: 'حجز المواعيد', description: 'نظام جدولة عبر الإنترنت متكامل' },
      { icon: '📊', title: 'التحليلات', description: 'تتبع الأداء المدمج' }
    ],
    benefits_en: [
      'Establish professional online presence',
      'Increase patient acquisition by 200%+',
      'Reduce administrative workload',
      'Provide 24/7 patient portal access',
      'Secure patient data and records',
      'Improve patient experience and retention'
    ],
    benefits_ar: [
      'إنشاء وجود احترافي عبر الإنترنت',
      'زيادة استقطاب المرضى بأكثر من 200%',
      'تقليل عبء العمل الإداري',
      'توفير وصول بوابة مريض 24/7',
      'مأمنية البيانات وسجلات المريض',
      'تحسين تجربة المريض والاحتفاظ به'
    ],
    steps_en: [
      { number: '01', title: 'Discovery', description: 'Understand your clinic\'s unique needs and goals' },
      { number: '02', title: 'Design & Development', description: 'Create beautiful, functional digital platform' },
      { number: '03', title: 'Testing & Deployment', description: 'Rigorous testing and secure launch' },
      { number: '04', title: 'Support & Maintenance', description: 'Ongoing updates and technical support' }
    ],
    steps_ar: [
      { number: '01', title: 'الاستكشاف', description: 'فهم احتياجات وأهداف عيادتك الفريدة' },
      { number: '02', title: 'التصميم والتطوير', description: 'إنشاء منصة رقمية جميلة وفعالة' },
      { number: '03', title: 'الاختبار والنشر', description: 'اختبار صارم وإطلاق آمن' },
      { number: '04', title: 'الدعم والصيانة', description: 'التحديثات المستمرة والدعم الفني' }
    ],
    testimonials: [
      { name: 'Dr. Amina', role: 'Clinic Owner', content: 'Beautiful design and works perfectly. Our patients love it!' },
      { name: 'Healthcare Director', role: 'Hospital', content: 'Professional team, excellent results, highly recommended!' }
    ],
    faqs_en: [
      { question: 'How long does development take?', answer: 'Typically 6-12 weeks depending on complexity.' },
      { question: 'Can you integrate with our existing systems?', answer: 'Yes, we integrate with most clinic management software.' },
      { question: 'What about ongoing maintenance?', answer: 'We offer monthly maintenance packages for updates and support.' },
      { question: 'Is the platform scalable?', answer: 'Yes, it grows with your clinic and patient base.' }
    ],
    faqs_ar: [
      { question: 'كم يستغرق التطوير؟', answer: 'عادة 6-12 أسبوع حسب التعقيد.' },
      { question: 'هل يمكنكم التكامل مع أنظمتنا الموجودة؟', answer: 'نعم، نتكامل مع معظم برامج إدارة العيادات.' },
      { question: 'ما عن الصيانة المستمرة؟', answer: 'نوفر حزم صيانة شهرية للتحديثات والدعم.' },
      { question: 'هل المنصة قابلة للتوسع؟', answer: 'نعم، تنمو مع عيادتك وقاعدة المرضى.' }
    ]
  }
];

export const findServiceBySlug = (slug: string): Service | undefined => {
  return SERVICES.find(s => s.slug === slug);
};

export const getAllServices = (): Service[] => SERVICES;
