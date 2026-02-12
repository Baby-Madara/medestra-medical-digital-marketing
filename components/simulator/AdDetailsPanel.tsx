
import React, { useState } from 'react';
import {
    X, ExternalLink, ThumbsUp, MessageCircle, Share2, MoreHorizontal, Globe,
    Layout, Info, Play, Heart, Send, Bookmark
} from 'lucide-react';
import { Ad } from '../../utils/simulator/mockData';

interface AdDetailsPanelProps {
    isOpen: boolean;
    ad: Ad | null;
    onClose: () => void;
}

const AdDetailsPanel: React.FC<AdDetailsPanelProps> = ({ isOpen, ad, onClose }) => {
    const [platform, setPlatform] = useState<'facebook' | 'instagram'>('facebook');

    if (!isOpen || !ad) return null;

    // Fallback defaults if creative is missing
    const creative = ad.creative || {
        type: 'image',
        primaryText: '',
        headline: ad.name,
        cta: 'Learn More',
        imageUrl: ''
    } as any;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Slide-in Panel */}
            <div className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-[#F0F2F5] shadow-2xl z-[70] transform transition-transform duration-300 translate-x-0 flex flex-col border-l border-gray-300">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-300 shrink-0">
                    <div>
                        <h2 className="text-[18px] font-bold text-[#1C1E21] leading-tight">Ad Preview</h2>
                        <div className="flex items-center text-[12px] text-gray-500 mt-1">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium mr-2">ID: {ad.id}29384</span>
                            <span className={`flex items-center ${ad.delivery === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${ad.delivery === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                {ad.delivery}
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Platform Toggle */}
                <div className="bg-white border-b border-gray-300 px-6 py-2 flex justify-center space-x-4 shrink-0">
                    <button
                        onClick={() => setPlatform('facebook')}
                        className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors ${platform === 'facebook' ? 'bg-blue-50 text-[#1877F2]' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                        <div className="w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[10px] font-bold mr-2">f</div>
                        Facebook
                    </button>
                    <button
                        onClick={() => setPlatform('instagram')}
                        className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors ${platform === 'instagram' ? 'bg-pink-50 text-[#E1306C]' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center text-[10px] font-bold mr-2">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </div>
                        Instagram
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-[400px] mx-auto space-y-6">

                        {/* Ad Preview Card */}
                        {platform === 'facebook' ? (
                            <FacebookPreview ad={ad} creative={creative} />
                        ) : (
                            <InstagramPreview ad={ad} creative={creative} />
                        )}

                        {/* Info Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-4">
                            <h3 className="text-[15px] font-bold text-[#1C1E21] mb-4 flex items-center">
                                <Info size={16} className="mr-2 text-gray-500" /> Performance Snapshot
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div className="text-[12px] text-gray-500 mb-1">Results</div>
                                    <div className="text-[16px] font-bold text-[#1C1E21]">{ad.results}</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div className="text-[12px] text-gray-500 mb-1">Cost per result</div>
                                    <div className="text-[16px] font-bold text-[#1C1E21]">{ad.costPerResult}</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div className="text-[12px] text-gray-500 mb-1">Quality Ranking</div>
                                    <div className="text-[16px] font-bold text-[#1C1E21]">{ad.qualityRanking}</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div className="text-[12px] text-gray-500 mb-1">Amount Spent</div>
                                    <div className="text-[16px] font-bold text-[#1C1E21]">{ad.amountSpent}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-5 py-4 bg-white border-t border-gray-300 shrink-0 flex justify-end space-x-3">
                    <button
                        className="px-4 py-2 border border-gray-300 rounded-md text-[14px] font-bold text-[#1C1E21] hover:bg-gray-50 transition-colors"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button className="px-4 py-2 bg-[#1877F2] hover:bg-[#166fe5] rounded-md text-[14px] font-bold text-white flex items-center shadow-sm transition-colors">
                        <ExternalLink size={16} className="mr-2" /> View Charts
                    </button>
                </div>
            </div>
        </>
    );
};

// --- Platform Components ---

const FacebookPreview = ({ ad, creative }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
        {/* Header */}
        <div className="p-3 flex items-center justify-between">
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 flex-shrink-0 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=Acme+Corp&background=random&color=fff&background=1877F2`} alt="Logo" className="w-full h-full" />
                </div>
                <div className="ml-2">
                    <div className="text-[14px] font-bold text-[#1C1E21] leading-none">Acme Corp</div>
                    <div className="text-[12px] text-gray-500 mt-0.5 flex items-center">
                        Sponsored <Globe size={10} className="ml-1" />
                    </div>
                </div>
            </div>
            <MoreHorizontal size={20} className="text-gray-500" />
        </div>

        {/* Primary Text */}
        {creative.primaryText && (
            <div className="px-3 pb-3 text-[14px] text-[#1C1E21] whitespace-pre-wrap leading-snug">
                {creative.primaryText}
            </div>
        )}

        {/* Media Content */}
        {creative.type === 'carousel' ? (
            <div className="flex overflow-x-auto pb-4 px-2 space-x-2 snap-x hide-scrollbar">
                {creative.carouselCards?.map((card: any, idx: number) => (
                    <div key={idx} className="min-w-[240px] w-[240px] snap-center border border-gray-200 rounded-lg overflow-hidden shrink-0 shadow-sm">
                        <div className="aspect-square bg-gray-100 relative">
                            <img src={card.imageUrl} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3 bg-[#F0F2F5] min-h-[90px] flex flex-col justify-center">
                            <div className="text-[11px] text-gray-500 uppercase tracking-wide">example.com</div>
                            <div className="text-[15px] font-bold text-[#1C1E21] leading-tight mt-0.5 truncate">{card.headline}</div>
                            {card.description && <div className="text-[12px] text-gray-500 mt-0.5">{card.description}</div>}
                            <button className="mt-3 w-full py-1.5 bg-gray-200 hover:bg-gray-300 rounded text-[13px] font-bold text-[#1C1E21]">{creative.cta || 'Shop Now'}</button>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="w-full bg-black min-h-[250px] relative flex items-center justify-center overflow-hidden">
                {creative.type === 'video' ? (
                    <>
                        <img src={creative.imageUrl} className="w-full h-auto object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/80 hover:scale-105 transition-transform cursor-pointer">
                                <Play size={32} className="text-white fill-current ml-1" />
                            </div>
                        </div>
                    </>
                ) : (
                    <img src={creative.imageUrl || "https://placehold.co/600x400?text=No+Image"} alt="Ad Creative" className="w-full h-auto object-cover" />
                )}
            </div>
        )}

        {/* CTA Bar (Non-Carousel) */}
        {creative.type !== 'carousel' && (
            <div className="bg-[#F0F2F5] p-3 flex justify-between items-center border-b border-gray-200">
                <div className="flex-1 pr-4 overflow-hidden">
                    <div className="text-[11px] text-gray-500 uppercase font-medium">example.com</div>
                    <div className="text-[16px] font-bold text-[#1C1E21] leading-tight mt-0.5 truncate">
                        {creative.headline || ad.name}
                    </div>
                </div>
                <button className="px-4 py-2 bg-gray-300/50 hover:bg-gray-300 rounded text-[14px] font-bold text-[#1C1E21] whitespace-nowrap transition-colors">
                    {creative.cta || 'Learn More'}
                </button>
            </div>
        )}

        {/* Social Actions */}
        <div className="px-2 py-1 flex justify-between items-center border-t border-gray-100 text-gray-500">
            <button className="flex-1 flex justify-center items-center py-2 hover:bg-gray-50 rounded-lg transition-colors text-[13px] font-semibold">
                <ThumbsUp size={18} className="mr-2" /> Like
            </button>
            <button className="flex-1 flex justify-center items-center py-2 hover:bg-gray-50 rounded-lg transition-colors text-[13px] font-semibold">
                <MessageCircle size={18} className="mr-2" /> Comment
            </button>
            <button className="flex-1 flex justify-center items-center py-2 hover:bg-gray-50 rounded-lg transition-colors text-[13px] font-semibold">
                <Share2 size={18} className="mr-2" /> Share
            </button>
        </div>
    </div>
);

const InstagramPreview = ({ ad, creative }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
        {/* Header */}
        <div className="p-3 flex items-center justify-between">
            <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[1.5px] flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-white p-[1.5px]">
                        <img src={`https://ui-avatars.com/api/?name=Acme+Corp&background=random&color=fff&background=1877F2`} alt="Logo" className="w-full h-full rounded-full" />
                    </div>
                </div>
                <div className="ml-2">
                    <div className="text-[13px] font-bold text-[#262626] leading-none">acmecorp</div>
                    <div className="text-[11px] text-[#262626] mt-0.5">Sponsored</div>
                </div>
            </div>
            <MoreHorizontal size={20} className="text-[#262626]" />
        </div>

        {/* Media Content */}
        {creative.type === 'carousel' ? (
            <div className="relative">
                <div className="flex overflow-x-auto snap-x hide-scrollbar">
                    {creative.carouselCards?.map((card: any, idx: number) => (
                        <div key={idx} className="min-w-full snap-center relative aspect-square">
                            <img src={card.imageUrl} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                                {idx + 1}/{creative.carouselCards.length}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Carousel Dots */}
                <div className="flex justify-center py-2 space-x-1">
                    {creative.carouselCards?.map((_: any, i: number) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#0095f6]' : 'bg-gray-300'}`}></div>
                    ))}
                </div>
            </div>
        ) : (
            <div className="w-full aspect-square bg-gray-100 relative flex items-center justify-center overflow-hidden">
                {creative.type === 'video' ? (
                    <>
                        <img src={creative.imageUrl} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Play size={24} className="text-white fill-current ml-1" />
                            </div>
                        </div>
                    </>
                ) : (
                    <img src={creative.imageUrl || "https://placehold.co/600x600?text=No+Image"} alt="Ad Creative" className="w-full h-full object-cover" />
                )}
            </div>
        )}

        {/* CTA Bar */}
        <div className="bg-[#EBF5FF] px-4 py-2.5 flex justify-between items-center cursor-pointer hover:bg-blue-100 transition-colors">
            <span className="text-[12px] font-semibold text-[#0095f6]">
                {creative.cta || (creative.type === 'carousel' ? 'Shop Now' : 'Learn More')}
            </span>
            <span className="text-[#0095f6]"><ChevronRight size={16} /></span>
        </div>

        {/* Actions */}
        <div className="px-3 py-2">
            <div className="flex justify-between items-center mb-2">
                <div className="flex space-x-4">
                    <Heart size={24} className="text-[#262626]" />
                    <MessageCircle size={24} className="text-[#262626] -rotate-90" />
                    <Send size={24} className="text-[#262626]" />
                </div>
                <Bookmark size={24} className="text-[#262626]" />
            </div>

            <div className="text-[13px] font-bold text-[#262626] mb-1">2,439 likes</div>

            <div className="text-[13px] text-[#262626]">
                <span className="font-bold mr-1">acmecorp</span>
                {creative.primaryText ? (
                    <span className="leading-snug">{creative.primaryText.length > 80 ? creative.primaryText.substring(0, 80) + '...' : creative.primaryText} <span className="text-gray-500">more</span></span>
                ) : (
                    <span>Check out our latest collection!</span>
                )}
            </div>
        </div>
    </div>
);

// Helper Icon for Arrow
const ChevronRight = ({ size }: any) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>);

export default AdDetailsPanel;
