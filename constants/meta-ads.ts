import { LevelData, InteractionType } from '../types/meta-ads';

export const COURSE_CONTENT_AR: LevelData[] = [
  {
    id: 1,
    title: 'مقدمة في مدير الأعمال (Business Manager)',
    objective: 'فهم ما هو Business Manager ولماذا هو مهم.',
    content: [
      'Business Manager (BM) هو أداة مجانية من فيسبوك تتيح لك إدارة حساباتك الإعلانية وصفحاتك وتطبيقاتك في مكان واحد.',
      'يفصل بين العمل الشخصي والعمل التجاري، مما يجعله أكثر احترافية وأماناً.',
      'يتكون من: الحسابات الإعلانية، الصفحات، الأشخاص والأدوار، وطرق الدفع (الفوترة).',
      'يسمح لك بمنح صلاحيات محددة للموظفين أو الوكالات دون إعطائهم كلمات مرور حسابك الشخصي.'
    ],
    interactionType: InteractionType.DRAG_DROP,
    interactionData: {
      instruction: 'قم بتصنيف العناصر التالية إلى أماكنها الصحيحة (اسحب العنصر أو انقر عليه ثم انقر على الصندوق المناسب):',
      items: [
        { id: 'i1', text: 'بطاقة ائتمان الشركة', targetId: 'billing' },
        { id: 'i2', text: 'صفحة المطعم الرسمية', targetId: 'assets' },
        { id: 'i3', text: 'أحمد (مدير تسويق)', targetId: 'people' },
        { id: 'i4', text: 'حساب إعلانات الربع الأول', targetId: 'assets' },
      ],
      zones: [
        { id: 'people', title: 'الأشخاص والأدوار' },
        { id: 'assets', title: 'الأصول (صفحات/حسابات)' },
        { id: 'billing', title: 'الفوترة والدفع' },
      ]
    }
  },
  {
    id: 2,
    title: 'نظرة عامة على مدير الإعلانات (Ads Manager)',
    objective: 'فهم كيفية هيكلة الحملة الإعلانية.',
    content: [
      'هيكل الحملة يتكون من 3 مستويات رئيسية كالهرم:',
      '1. الحملة (Campaign): حيث تحدد الهدف الرئيسي (مثلاً: الوعي، المبيعات).',
      '2. المجموعة الإعلانية (Ad Set): حيث تحدد الجمهور، الميزانية، الجدول الزمني، وأماكن العرض (Placements).',
      '3. الإعلان (Ad): هو ما يراه الجمهور (الصورة، الفيديو، النص، الرابط).'
    ],
    interactionType: InteractionType.QUIZ,
    interactionData: {
      question: 'أين نقوم بتحديد "الجمهور المستهدف" و "الميزانية"؟',
      options: [
        { id: 'a', text: 'مستوى الحملة (Campaign)', isCorrect: false, feedback: 'مستوى الحملة مخصص لتحديد الهدف الإعلاني فقط (إلا إذا استخدمت ميزانية الحملة Advantage+).' },
        { id: 'b', text: 'مستوى المجموعة الإعلانية (Ad Set)', isCorrect: true, feedback: 'صحيح! المجموعة الإعلانية هي المسؤولة عن الاستهداف والميزانية والجدول الزمني.' },
        { id: 'c', text: 'مستوى الإعلان (Ad)', isCorrect: false, feedback: 'مستوى الإعلان مخصص للتصميم والنصوص والروابط.' },
      ]
    }
  },
  {
    id: 3,
    title: 'الجمهور والاستهداف (Audience & Targeting)',
    objective: 'تعلم استهداف الجمهور الصحيح.',
    content: [
      'أنواع الجماهير:',
      '1. الجمهور الأساسي (Core Audience): الاستهداف حسب العمر، الموقع، والاهتمامات.',
      '2. الجمهور المخصص (Custom Audience): أشخاص تفاعلوا معك سابقاً (زاروا موقعك، شاهدوا فيديو).',
      '3. الجمهور المشابه (Lookalike Audience): أشخاص يشبهون جمهورك المخصص.',
      'الاستهداف الدقيق يوفر الميزانية ويزيد النتائج.'
    ],
    interactionType: InteractionType.SCENARIO,
    interactionData: {
      question: 'لديك متجر إلكتروني لبيع "ألعاب تعليمية للأطفال من عمر 3-6 سنوات". أي خيار استهداف هو الأفضل للبدء؟',
      options: [
        { id: 'a', text: 'استهداف الأطفال مباشرة (أعمار 3-6)', isCorrect: false, feedback: 'خطأ. سياسات فيسبوك تمنع استهداف الأطفال، كما أنهم لا يملكون قرار الشراء.' },
        { id: 'b', text: 'استهداف الآباء والأمهات (Parents) ولديهم أطفال في سن الحضانة/الروضة', isCorrect: true, feedback: 'ممتاز! هذا الخيار يستهدف صانع القرار (الوالدين) بدقة.' },
        { id: 'c', text: 'استهداف عام لكل الناس في دولتك', isCorrect: false, feedback: 'جمهور واسع جداً سيؤدي لهدر الميزانية على غير المهتمين.' },
      ]
    }
  },
  {
    id: 4,
    title: 'الميزانية والمزايدة (Budgeting & Bidding)',
    objective: 'إدارة الميزانية وفهم أنواع المزايدة.',
    content: [
      'CBO (Advantage+ Campaign Budget): فيسبوك يوزع الميزانية تلقائياً على المجموعات الأفضل أداءً.',
      'ABO (Ad Set Budget): أنت تحدد ميزانية ثابتة لكل مجموعة إعلانية يدوياً.',
      'استراتيجيات المزايدة: التكلفة الأقل (Lowest Cost) للحصول على أقصى نتائج بأقل سعر، وسقف العرض (Bid Cap) للتحكم الصارم في تكلفة النتيجة.'
    ],
    interactionType: InteractionType.QUIZ,
    interactionData: {
      question: 'تريد اختبار 3 جماهير مختلفة لتعرف أيهم أفضل، وتريد ضمان أن كل جمهور يحصل على فرصة متساوية في الصرف. ماذا تختار؟',
      options: [
        { id: 'a', text: 'ميزانية الحملة (CBO)', isCorrect: false, feedback: 'CBO ستقوم بصرف الميزانية على الجمهور الأسهل وصولاً ولن تعطي فرصة متساوية للاختبار.' },
        { id: 'b', text: 'ميزانية المجموعة الإعلانية (ABO)', isCorrect: true, feedback: 'صحيح! تحديد ميزانية لكل مجموعة يضمن أن كل جمهور سيحصل على نصيبه من الصرف للاختبار.' },
      ]
    }
  },
  {
    id: 5,
    title: 'الإبداع وكتابة المحتوى (Creative & Copywriting)',
    objective: 'فهم إنشاء الإعلان الجذاب.',
    content: [
      'أنواع الإعلانات: صورة واحدة، فيديو، تشكيلة (Collection)، أو دوار (Carousel).',
      'النص الإعلاني (Ad Copy): يجب أن يخاطب مشكلة العميل ويقدم الحل.',
      'CTA (Call to Action): الزر الذي يوجه العميل (تسوق الآن، سجل الآن، تعرف على المزيد).',
      'أول 3 ثوانٍ في الفيديو هي الأهم لجذب الانتباه.'
    ],
    interactionType: InteractionType.INPUT, // Using Input to simulate writing
    interactionData: {
      prompt: 'اكتب عنواناً (Headline) جذاباً لإعلان يبيع "دورة تعلم اللغة الإنجليزية للمبتدئين" مع خصم 50%.',
      placeholder: 'اكتب العنوان هنا...',
      expectedKeywords: ['خصم', '50', 'إنجليزية', 'تعلم', 'عرض', 'نصف'],
      successMessage: 'عنوان رائع! استخدام الأرقام والخصومات والكلمات الواضحة يزيد من نسبة النقر.'
    }
  },
  {
    id: 6,
    title: 'البكسل والتتبع (Pixel & Tracking)',
    objective: 'معرفة كيفية قياس أداء الإعلانات.',
    content: [
      'Facebook Pixel: كود برمجي يوضع في موقعك لتتبع أفعال الزوار.',
      'يسمح لك بمعرفة من اشترى، من أضاف للسلة، ومن مجرد زار الصفحة.',
      'يستخدم لإعادة الاستهداف (Retargeting) وإنشاء جماهير مشابهة.',
      'الأحداث (Events): PageView, AddToCart, Purchase, Lead.'
    ],
    interactionType: InteractionType.DRAG_DROP,
    interactionData: {
      instruction: 'اربط نوع الحدث (Event) بالهدف المناسب للحملة:',
      items: [
        { id: 'e1', text: 'Purchase (شراء)', targetId: 'sales' },
        { id: 'e2', text: 'Lead (عميل محتمل)', targetId: 'forms' },
        { id: 'e3', text: 'View Content (مشاهدة محتوى)', targetId: 'traffic' },
      ],
      zones: [
        { id: 'sales', title: 'زيادة مبيعات المتجر' },
        { id: 'forms', title: 'جمع بيانات العملاء للعقارات' },
        { id: 'traffic', title: 'قراءة مقالات المدونة' },
      ]
    }
  },
  {
    id: 7,
    title: 'قمع التسويق (Marketing Funnel)',
    objective: 'فهم رحلة العميل من الوعي إلى التحويل.',
    content: [
      'TOFU (Top of Funnel): مرحلة الوعي (Awareness). الهدف: تعريف الناس بالعلامة التجارية.',
      'MOFU (Middle of Funnel): مرحلة الاهتمام (Consideration). الهدف: تفاعل، زيارات، رسائل.',
      'BOFU (Bottom of Funnel): مرحلة التحويل (Conversion). الهدف: مبيعات، تسجيل.',
      'يجب تغيير رسالة الإعلان حسب المرحلة.'
    ],
    interactionType: InteractionType.SCENARIO,
    interactionData: {
      question: 'عميل زار موقعك وأضاف منتجاً للسلة لكنه لم يشترِ. في أي مرحلة هو الآن، وما هو الإعلان المناسب له؟',
      options: [
        { id: 'a', text: 'مرحلة الوعي - نعرض له فيديو تعريفي عن الشركة', isCorrect: false, feedback: 'هو يعرف الشركة بالفعل وزار الموقع.' },
        { id: 'b', text: 'مرحلة التحويل - نعرض له إعلان خصم إضافي لإتمام الشراء (Retargeting)', isCorrect: true, feedback: 'بالضبط! هو جاهز للشراء ويحتاج لدفعة صغيرة (خصم أو تذكير).' },
        { id: 'c', text: 'مرحلة الاهتمام - نطلب منه عمل لايك للصفحة', isCorrect: false, feedback: 'لقد تجاوز هذه المرحلة، هو قريب جداً من الشراء.' },
      ]
    }
  },
  {
    id: 8,
    title: 'التحليلات والتحسين (Analytics & Optimization)',
    objective: 'فهم كيفية تحسين الحملات وقراءة الأرقام.',
    content: [
      'CTR (Click-Through Rate): نسبة النقر للظهور. يدل على جاذبية الإعلان.',
      'CPC (Cost Per Click): تكلفة النقرة.',
      'ROAS (Return on Ad Spend): العائد على الإنفاق الإعلاني. (المبيعات ÷ الصرف).',
      'CPM (Cost Per 1000 Impressions): تكلفة الوصول لألف شخص.',
      'إذا كان الـ CTR منخفضاً، جرب تغيير التصميم أو العنوان.'
    ],
    interactionType: InteractionType.CHART,
    interactionData: {
      instruction: 'قم بتحليل أداء الحملة في الرسم البياني أدناه. الخط الأزرق يمثل "المصاريف" والخط الأخضر يمثل "المبيعات". برأيك، ما هو "اليوم الذهبي" الذي حققت فيه الحملة أعلى كفاءة (ROAS) قبل أن نبدأ في زيادة الصرف وتراجع النتائج؟',
      // Chart data handled in component
      correctDayIndex: 4, // e.g., Day 5
      feedback: 'ممتاز! في "يوم 5" حققنا مبيعات 250 بمصروف 75 فقط (ROAS = 3.33). بعد ذلك، ورغم زيادة المصاريف بشكل كبير في يوم 6 و 7، لم تزد المبيعات بنفس النسبة، مما يعني انخفاض الكفاءة (Scaling Issues).'
    }
  },
  {
    id: 9,
    title: 'التحدي النهائي (Final Challenge)',
    objective: 'تطبيق شامل لكل ما تعلمته.',
    content: [
      'حان وقت الاختبار النهائي!',
      'ستقوم بإعداد استراتيجية حملة كاملة لمتجر عطور جديد.',
      'يجب عليك اتخاذ القرارات الصحيحة في كل خطوة.'
    ],
    interactionType: InteractionType.FINAL,
    interactionData: {
      steps: [
        {
          question: 'المتجر جديد تماماً. ما هو الهدف الأول للحملة؟',
          options: [
             { id: '1a', text: 'Conversion (مبيعات) فوراً', isCorrect: false, feedback: 'صعب جداً لمتجر غير معروف. ابدأ بالوعي أو الزيارات أولاً.' },
             { id: '1b', text: 'Awareness (وعي) أو Traffic (زيارات)', isCorrect: true, feedback: 'صحيح. نحتاج لتعريف الناس بالماركة أولاً.' }
          ]
        },
        {
          question: 'ما هو الجمهور الأنسب للبدء؟',
          options: [
             { id: '2a', text: 'جمهور واسع (Broad) مهتم بالعطور والموضة', isCorrect: true, feedback: 'جيد. ليس لدينا بيانات سابقة، لذا الاستهداف بالاهتمامات هو الأفضل.' },
             { id: '2b', text: 'Lookalike Audience', isCorrect: false, feedback: 'لا يمكن إنشاء جمهور مشابه بدون بيانات سابقة (Custom Audience).' }
          ]
        },
        {
          question: 'الإعلان: ما هو أهم عنصر للتركيز عليه؟',
          options: [
             { id: '3a', text: 'صورة المنتج بجودة عالية توحي بالفخامة', isCorrect: true, feedback: 'ممتاز. العطور تعتمد على "الإحساس" والشكل لأن العميل لا يشمها.' },
             { id: '3b', text: 'كتابة نص طويل جداً يشرح المكونات الكيميائية', isCorrect: false, feedback: 'ممل وقد لا يقرأه أحد.' }
          ]
        }
      ]
    }
  }
];

export const COURSE_CONTENT_EN: LevelData[] = [
  {
    id: 1,
    title: 'Introduction to Business Manager',
    objective: 'Understand what Business Manager is and why it matters.',
    content: [
      'Business Manager (BM) is a free tool from Facebook to manage your ad accounts, pages, and apps in one place.',
      'It separates personal and business work, making it more professional and secure.',
      'It consists of: Ad Accounts, Pages, People & Roles, and Payment Methods (Billing).',
      'It allows you to grant specific permissions to employees or agencies without giving them your personal account password.'
    ],
    interactionType: InteractionType.DRAG_DROP,
    interactionData: {
      instruction: 'Categorize the following items into their correct places (drag the item or click it then click the appropriate box):',
      items: [
        { id: 'i1', text: 'Company Credit Card', targetId: 'billing' },
        { id: 'i2', text: 'Official Restaurant Page', targetId: 'assets' },
        { id: 'i3', text: 'Ahmed (Marketing Manager)', targetId: 'people' },
        { id: 'i4', text: 'Q1 Ads Account', targetId: 'assets' },
      ],
      zones: [
        { id: 'people', title: 'People & Roles' },
        { id: 'assets', title: 'Assets (Pages/Accounts)' },
        { id: 'billing', title: 'Billing & Payment' },
      ]
    }
  },
  {
    id: 2,
    title: 'Ads Manager Overview',
    objective: 'Understand how an ad campaign is structured.',
    content: [
      'Campaign structure consists of 3 main levels like a pyramid:',
      '1. Campaign: Where you define the main objective (e.g., Awareness, Sales).',
      '2. Ad Set: Where you define audience, budget, schedule, and placements.',
      '3. Ad: What the audience sees (Image, Video, Text, Link).'
    ],
    interactionType: InteractionType.QUIZ,
    interactionData: {
      question: 'Where do we define "Target Audience" and "Budget"?',
      options: [
        { id: 'a', text: 'Campaign Level', isCorrect: false, feedback: 'Campaign level is for defined the objective only (unless using Advantage+ Campaign Budget).' },
        { id: 'b', text: 'Ad Set Level', isCorrect: true, feedback: 'Correct! The Ad Set is responsible for targeting, budget, and schedule.' },
        { id: 'c', text: 'Ad Level', isCorrect: false, feedback: 'Ad level is for design, copy, and links.' },
      ]
    }
  },
  {
    id: 3,
    title: 'Audience & Targeting',
    objective: 'Learn to target the right audience.',
    content: [
      'Audience Types:',
      '1. Core Audience: Targeting by age, location, and interests.',
      '2. Custom Audience: People who interacted with you before (visited website, watched video).',
      '3. Lookalike Audience: People who look like your custom audience.',
      'Precise targeting saves budget and increases results.'
    ],
    interactionType: InteractionType.SCENARIO,
    interactionData: {
      question: 'You have an online store selling "Educational Toys for Kids aged 3-6". Which targeting option is best to start?',
      options: [
        { id: 'a', text: 'Target Kids directly (ages 3-6)', isCorrect: false, feedback: 'Wrong. Facebook policies strictly restrict targeting children, and they dont make purchasing decisions.' },
        { id: 'b', text: 'Target Parents with kids in preschool/early school age', isCorrect: true, feedback: 'Excellent! This option targets the decision maker (parents) accurately.' },
        { id: 'c', text: 'General targeting for everyone in your country', isCorrect: false, feedback: 'Too broad audience will waste budget on uninterested people.' },
      ]
    }
  },
  {
    id: 4,
    title: 'Budgeting & Bidding',
    objective: 'Manage budget and understand bidding types.',
    content: [
      'CBO (Advantage+ Campaign Budget): Facebook automatically distributes budget to best performing ad sets.',
      'ABO (Ad Set Budget): You set a fixed budget for each ad set manually.',
      'Bidding Strategies: Lowest Cost for max results at lowest price, and Bid Cap for strict control over cost per result.'
    ],
    interactionType: InteractionType.QUIZ,
    interactionData: {
      question: 'You want to test 3 different audiences to see which is best, and ensure each audience gets equal spend chance. What do you choose?',
      options: [
        { id: 'a', text: 'Campaign Budget (CBO)', isCorrect: false, feedback: 'CBO will spend on the easiest-to-reach audience and wont give equal testing chance.' },
        { id: 'b', text: 'Ad Set Budget (ABO)', isCorrect: true, feedback: 'Correct! Setting a budget for each ad set ensures every audience gets its share of spend for testing.' },
      ]
    }
  },
  {
    id: 5,
    title: 'Creative & Copywriting',
    objective: 'Understand creating attractive ads.',
    content: [
      'Ad Formats: Single Image, Video, Collection, or Carousel.',
      'Ad Copy: Must address customer pain points and offer a solution.',
      'CTA (Call to Action): The button guiding the user (Shop Now, Sign Up, Learn More).',
      'The first 3 seconds of a video are crucial for grabbing attention.'
    ],
    interactionType: InteractionType.INPUT,
    interactionData: {
      prompt: 'Write a catchy Headline for an ad selling "English Course for Beginners" with 50% discount.',
      placeholder: 'Write the headline here...',
      expectedKeywords: ['discount', '50', 'english', 'learn', 'offer', 'beginner', 'half', 'off'],
      successMessage: 'Great headline! Using numbers, discounts, and clear words increases Click-Through Rate.'
    }
  },
  {
    id: 6,
    title: 'Pixel & Tracking',
    objective: 'Know how to measure ad performance.',
    content: [
      'Facebook Pixel: Code placed on your website to track visitor actions.',
      'Allows you to know who bought, added to cart, or just visited.',
      'Used for Retargeting and creating Lookalike Audiences.',
      'Events: PageView, AddToCart, Purchase, Lead.'
    ],
    interactionType: InteractionType.DRAG_DROP,
    interactionData: {
      instruction: 'Match the Event type to the appropriate Campaign Goal:',
      items: [
        { id: 'e1', text: 'Purchase', targetId: 'sales' },
        { id: 'e2', text: 'Lead', targetId: 'forms' },
        { id: 'e3', text: 'View Content', targetId: 'traffic' },
      ],
      zones: [
        { id: 'sales', title: 'Increase Store Sales' },
        { id: 'forms', title: 'Collect Real Estate Leads' },
        { id: 'traffic', title: 'Read Blog Articles' },
      ]
    }
  },
  {
    id: 7,
    title: 'Marketing Funnel',
    objective: 'Understand the customer journey from awareness to conversion.',
    content: [
      'TOFU (Top of Funnel): Awareness. Goal: Introduce brand to people.',
      'MOFU (Middle of Funnel): Consideration. Goal: Engagement, visits, messages.',
      'BOFU (Bottom of Funnel): Conversion. Goal: Sales, registrations.',
      'Ad message must change according to the stage.'
    ],
    interactionType: InteractionType.SCENARIO,
    interactionData: {
      question: 'A customer visited your site and added a product to cart but didn’t buy. Which stage is he in, and what ad fits him?',
      options: [
        { id: 'a', text: 'Awareness - Show him an intro video about the company', isCorrect: false, feedback: 'He already knows the company and visited the site.' },
        { id: 'b', text: 'Conversion - Show him an extra discount ad to complete purchase (Retargeting)', isCorrect: true, feedback: 'Exactly! He is ready to buy and needs a small push (discount or reminder).' },
        { id: 'c', text: 'Consideration - Ask him to like the page', isCorrect: false, feedback: 'He passed this stage, he is very close to buying.' },
      ]
    }
  },
  {
    id: 8,
    title: 'Analytics & Optimization',
    objective: 'Understand how to optimize campaigns and read numbers.',
    content: [
      'CTR (Click-Through Rate): Indicates ad attractiveness.',
      'CPC (Cost Per Click).',
      'ROAS (Return on Ad Spend): (Sales ÷ Spend).',
      'CPM (Cost Per 1000 Impressions).',
      'If CTR is low, try changing the design or headline.'
    ],
    interactionType: InteractionType.CHART,
    interactionData: {
      instruction: 'Analyze campaign performance in the chart below. Blue line is "Spend", Green line is "Sales". In your opinion, what is the "Golden Day" where campaign had highest efficiency (ROAS) before we started increasing spend and results declined?',
      correctDayIndex: 4,
      feedback: 'Excellent! On "Day 5" we made 250 sales with only 75 spend (ROAS = 3.33). After that, despite increasing spend significantly on days 6 & 7, sales didn’t increase by same ratio, indicating efficiency drop (Scaling Issues).'
    }
  },
  {
    id: 9,
    title: 'Final Challenge',
    objective: 'Comprehensive application of everything learned.',
    content: [
      'Time for the final test!',
      'You will create a full campaign strategy for a new Perfume Store.',
      'You must make the right decisions at every step.'
    ],
    interactionType: InteractionType.FINAL,
    interactionData: {
      steps: [
        {
          question: 'The store is brand new. What is the first campaign objective?',
          options: [
             { id: '1a', text: 'Conversion immediately', isCorrect: false, feedback: 'Very hard for unknown store. Start with Awareness or Traffic first.' },
             { id: '1b', text: 'Awareness or Traffic', isCorrect: true, feedback: 'Correct. We need to introduce the brand to people first.' }
          ]
        },
        {
          question: 'What is the most suitable audience to start?',
          options: [
             { id: '2a', text: 'Broad audience interested in Perfumes/Fashion', isCorrect: true, feedback: 'Good. We don’t have past data, so interest targeting is best.' },
             { id: '2b', text: 'Lookalike Audience', isCorrect: false, feedback: 'Cannot create Lookalike without past data (Custom Audience).' }
          ]
        },
        {
          question: 'Ad Creative: What is the most important element to focus on?',
          options: [
             { id: '3a', text: 'High quality product image implying luxury', isCorrect: true, feedback: 'Excellent. Perfumes rely on "Feeling" and look because customer can’t smell it.' },
             { id: '3b', text: 'Write very long text explaining chemical ingredients', isCorrect: false, feedback: 'Boring and likely no one will read it.' }
          ]
        }
      ]
    }
  }
];

export const COURSE_CONTENT = COURSE_CONTENT_AR; // Default export for backwards compatibility

export const getCourseContent = (lang: 'ar' | 'en') => {
  return lang === 'ar' ? COURSE_CONTENT_AR : COURSE_CONTENT_EN;
};
