
export interface BaseEntity {
  id: string;
  name: string;
  delivery: 'Active' | 'Off' | 'Learning' | 'In Draft' | 'Processing' | 'Review';
  results: string;
  reach: string;
  impressions: string;
  costPerResult: string;
  amountSpent: string;
  ends: string;
}

export interface Campaign extends BaseEntity {
  bidStrategy: string;
  budget: string;
}

export interface AdSet extends BaseEntity {
  budget: string;
  schedule: string;
}

export interface Ad extends BaseEntity {
  qualityRanking: string;
  creative?: {
    type: 'image' | 'video' | 'carousel';
    imageUrl?: string;
    videoUrl?: string;
    primaryText: string;
    headline: string;
    cta: string;
    carouselCards?: {
      imageUrl: string;
      headline: string;
      description?: string;
    }[];
  };
}

export const campaigns: Campaign[] = [
  {
    id: 'c1',
    name: 'New Traffic Campaign - Q3 Promo',
    delivery: 'Active',
    bidStrategy: 'Lowest cost',
    budget: '$50.00 Daily',
    results: '4,320 Link Clicks',
    reach: '12,500',
    impressions: '15,400',
    costPerResult: '$0.42',
    amountSpent: '$1,814.40',
    ends: 'Ongoing',
  },
  {
    id: 'c2',
    name: 'Brand Awareness - Spring Collection',
    delivery: 'Learning',
    bidStrategy: 'Lowest cost',
    budget: '$20.00 Daily',
    results: '15,200 Est. Ad Recall',
    reach: '45,000',
    impressions: '52,100',
    costPerResult: '$0.05',
    amountSpent: '$760.00',
    ends: 'Dec 31, 2024',
  },
  {
    id: 'c3',
    name: 'Retargeting - Cart Abandoners',
    delivery: 'Active',
    bidStrategy: 'Cap',
    budget: '$150.00 Lifetime',
    results: '24 Purchases',
    reach: '3,200',
    impressions: '8,500',
    costPerResult: '$12.50',
    amountSpent: '$300.00',
    ends: 'Nov 15, 2024',
  },
  {
    id: 'c4',
    name: 'Lead Gen - Webinar Signup',
    delivery: 'Off',
    bidStrategy: 'Lowest cost',
    budget: '$100.00 Daily',
    results: '85 Leads',
    reach: '8,000',
    impressions: '11,200',
    costPerResult: '$3.50',
    amountSpent: '$297.50',
    ends: 'Ended',
  },
  {
    id: 'c5',
    name: 'App Install - iOS',
    delivery: 'In Draft',
    bidStrategy: 'Lowest cost',
    budget: '$75.00 Daily',
    results: '-',
    reach: '-',
    impressions: '-',
    costPerResult: '-',
    amountSpent: '-',
    ends: 'Not Started',
  },
];

export const adSets: AdSet[] = [
  {
    id: 'as1',
    name: 'US - 18-65+ - Interests: Tech',
    delivery: 'Active',
    budget: '$25.00 Daily',
    schedule: 'Ongoing',
    results: '2,100 Link Clicks',
    reach: '6,200',
    impressions: '7,500',
    costPerResult: '$0.45',
    amountSpent: '$945.00',
    ends: 'Ongoing',
  },
  {
    id: 'as2',
    name: 'UK - 25-45 - Lookalike 1%',
    delivery: 'Active',
    budget: '$25.00 Daily',
    schedule: 'Ongoing',
    results: '2,220 Link Clicks',
    reach: '6,300',
    impressions: '7,900',
    costPerResult: '$0.39',
    amountSpent: '$869.40',
    ends: 'Ongoing',
  },
  {
    id: 'as3',
    name: 'Retargeting - Website Visitors 30d',
    delivery: 'Learning',
    budget: '$150.00 Lifetime',
    schedule: 'Ends Nov 15',
    results: '24 Purchases',
    reach: '3,200',
    impressions: '8,500',
    costPerResult: '$12.50',
    amountSpent: '$300.00',
    ends: 'Nov 15, 2024',
  }
];

export const ads: Ad[] = [
  {
    id: 'a1',
    name: 'Image 01 - Blue Background',
    delivery: 'Active',
    qualityRanking: 'Above Average',
    results: '1,500 Link Clicks',
    reach: '4,000',
    impressions: '5,000',
    costPerResult: '$0.40',
    amountSpent: '$600.00',
    ends: 'Ongoing',
    creative: {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80',
        primaryText: 'Boost your team\'s productivity with our award-winning collaboration platform. Try it free for 14 days! 🚀',
        headline: 'The Ultimate Collaboration Tool',
        cta: 'Sign Up'
    }
  },
  {
    id: 'a2',
    name: 'Video 01 - Product Demo',
    delivery: 'Active',
    qualityRanking: 'Average',
    results: '600 Link Clicks',
    reach: '2,200',
    impressions: '2,500',
    costPerResult: '$0.58',
    amountSpent: '$345.00',
    ends: 'Ongoing',
    creative: {
        type: 'video',
        imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80',
        videoUrl: '#',
        primaryText: 'See how it works in real-time. Seamless integration with your favorite tools.',
        headline: 'Watch Demo: Integration Flow',
        cta: 'Watch More'
    }
  },
  {
    id: 'a3',
    name: 'Carousel - Best Sellers',
    delivery: 'Review',
    qualityRanking: '-',
    results: '-',
    reach: '-',
    impressions: '-',
    costPerResult: '-',
    amountSpent: '-',
    ends: 'Ongoing',
    creative: {
        type: 'carousel',
        primaryText: 'Our best sellers are back in stock. Grab them before they are gone!',
        headline: 'Spring Collection Highlights',
        cta: 'Shop Now',
        carouselCards: [
            {
                imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80',
                headline: 'Classic Tee',
                description: '$29.99'
            },
            {
                imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
                headline: 'Urban Jacket',
                description: '$89.99'
            },
            {
                imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
                headline: 'Summer Hat',
                description: '$24.99'
            }
        ]
    }
  }
];

export const performanceData = [
  { date: 'Oct 1', amount: 120, clicks: 45 },
  { date: 'Oct 2', amount: 132, clicks: 50 },
  { date: 'Oct 3', amount: 101, clicks: 38 },
  { date: 'Oct 4', amount: 154, clicks: 65 },
  { date: 'Oct 5', amount: 190, clicks: 80 },
  { date: 'Oct 6', amount: 230, clicks: 105 },
  { date: 'Oct 7', amount: 210, clicks: 95 },
];
