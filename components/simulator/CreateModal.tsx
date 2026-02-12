
import React, { useState, useEffect } from 'react';
import {
    X, ArrowRight, ArrowLeft, Target, Megaphone, TrendingUp, Users, MousePointer, Download,
    Check, HelpCircle, Plus, ChevronDown, ChevronRight, Info, MapPin, Globe, Layout,
    Smartphone, CreditCard, Calendar, Image as ImageIcon, Link, Eye, ThumbsUp, MessageCircle,
    Search, Monitor, Video, Grid, List, Filter, Briefcase, GraduationCap, DollarSign, Heart, Plane, ShoppingBag,
    PlayCircle, Edit3, Trash2, Sparkles, LayoutGrid, Clock, Compass, MoreHorizontal, Folder, Zap, AlertCircle
} from 'lucide-react';
import { Campaign } from '../../utils/simulator/mockData';

interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: any) => void;
    initialData?: any;
    context?: string; // 'Campaigns', 'Ad Sets', 'Ads'
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onCreate, initialData, context }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedObjective, setSelectedObjective] = useState<string>('awareness');
    const [buyingType, setBuyingType] = useState('Auction');

    // -- Form State --
    // Campaign
    const [campaignName, setCampaignName] = useState('New Awareness Campaign');
    const [specialAdCategories, setSpecialAdCategories] = useState(false);
    const [advPlusBudget, setAdvPlusBudget] = useState(false);
    const [abTesting, setAbTesting] = useState(false);
    const [campaignBudget, setCampaignBudget] = useState('50.00'); // Campaign Level Budget
    const [campaignBudgetType, setCampaignBudgetType] = useState('Daily budget');
    const [campaignBidStrategy, setCampaignBidStrategy] = useState('Highest volume');

    // Ad Set
    const [adSetName, setAdSetName] = useState('New Awareness Ad Set');
    const [performanceGoal, setPerformanceGoal] = useState('Maximize reach of ads');
    const [facebookPage, setFacebookPage] = useState('Acme Corp');

    // Ad Set - Budget & Schedule
    const [adSetBudgetType, setAdSetBudgetType] = useState('Daily budget');
    const [adSetBudgetAmount, setAdSetBudgetAmount] = useState('20.00');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [startTime, setStartTime] = useState('00:00');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('23:59');

    // Ad Set - Audience & Targeting
    const [audienceLocation, setAudienceLocation] = useState('United States');
    const [minAge, setMinAge] = useState('18');
    const [gender, setGender] = useState('All');
    const [languages, setLanguages] = useState('All languages');
    const [targetingQuery, setTargetingQuery] = useState('');
    const [includedInterests, setIncludedInterests] = useState<string[]>([]);
    const [showBrowseMenu, setShowBrowseMenu] = useState(false);

    // Ad Set - Placements & Scheduling
    const [placementType, setPlacementType] = useState('advantage'); // advantage | manual
    const [adScheduling, setAdScheduling] = useState(false);
    const [platforms, setPlatforms] = useState({
        facebook: true,
        instagram: true,
        audienceNetwork: true,
        messenger: true,
        whatsapp: false
    });

    // Ad
    const [adName, setAdName] = useState('New Awareness Ad');
    const [identityPage, setIdentityPage] = useState('Acme Corp');
    const [instagramAccount, setInstagramAccount] = useState('');
    const [adSetup, setAdSetup] = useState('create_ad'); // create_ad, existing_post, mockup
    const [format, setFormat] = useState('single'); // single, carousel, collection
    const [multiAdvertiser, setMultiAdvertiser] = useState(true);
    const [primaryText, setPrimaryText] = useState('');
    const [headline, setHeadline] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');

    // Effect to populate data for editing
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                // Edit Mode
                if (context === 'Campaigns') {
                    setCurrentStep(2);
                    setCampaignName(initialData.name);
                    if (initialData.budget) {
                        // Simple parse for demo
                        setCampaignBudget(initialData.budget.replace(/[^0-9.]/g, ''));
                        setAdvPlusBudget(true); // Assume if editing campaign it has budget
                    }
                } else if (context === 'Ad Sets') {
                    setCurrentStep(3);
                    setAdSetName(initialData.name);
                    if (initialData.budget) setAdSetBudgetAmount(initialData.budget.replace(/[^0-9.]/g, ''));
                } else if (context === 'Ads') {
                    setCurrentStep(4);
                    setAdName(initialData.name);
                    if (initialData.creative) {
                        setPrimaryText(initialData.creative.primaryText || '');
                        setHeadline(initialData.creative.headline || '');
                    }
                } else {
                    setCurrentStep(2);
                }
            } else {
                // Create Mode - Reset defaults
                setCurrentStep(1);
                setCampaignName('New Awareness Campaign');
                setAdSetName('New Awareness Ad Set');
                setAdName('New Awareness Ad');
                setCampaignBudget('50.00');
                setCampaignBudgetType('Daily budget');
                setCampaignBidStrategy('Highest volume');
                setAdSetBudgetAmount('20.00');
                setPrimaryText('');
                setHeadline('');
                setIncludedInterests([]);
                setPlacementType('advantage');
                setGender('All');
                setShowBrowseMenu(false);
                setAdScheduling(false);
            }
        }
    }, [isOpen, initialData, context]);

    const toggleInterest = (interest: string) => {
        if (includedInterests.includes(interest)) {
            setIncludedInterests(includedInterests.filter(i => i !== interest));
        } else {
            setIncludedInterests([...includedInterests, interest]);
            setTargetingQuery('');
        }
    };

    const togglePlatform = (key: keyof typeof platforms) => {
        setPlatforms(prev => ({ ...prev, [key]: !prev[key] }));
    }

    if (!isOpen) return null;

    const objectives = [
        { id: 'awareness', name: 'Awareness', icon: <Megaphone size={20} />, description: 'Show your ads to people who are most likely to remember them.', goodFor: 'Reach, Brand awareness, Video views' },
        { id: 'traffic', name: 'Traffic', icon: <MousePointer size={20} />, description: 'Send people to a destination, like your website, app or Instagram event.', goodFor: 'Link clicks, Landing page views' },
        { id: 'engagement', name: 'Engagement', icon: <MessageCircle size={20} />, description: 'Get more messages, video views, post engagement, page likes or event responses.', goodFor: 'Messages, Video views' },
        { id: 'leads', name: 'Leads', icon: <Filter size={20} />, description: 'Collect leads for your business or brand.', goodFor: 'Instant forms, Messenger, Conversions' },
        { id: 'app_promotion', name: 'App promotion', icon: <Smartphone size={20} />, description: 'Find new people to install your app and continue using it.', goodFor: 'App installs, App events' },
        { id: 'sales', name: 'Sales', icon: <ShoppingBag size={20} />, description: 'Find people likely to purchase your product or service.', goodFor: 'Conversions, Catalogue sales' },
    ];

    const handleOpenMediaLibrary = (type: 'image' | 'video') => {
        console.log(`Open ${type} media library`);
    };

    const handleContinue = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        } else {
            // Prepare Data Object
            let resultData: any = {};

            if (initialData && context === 'Ad Sets') {
                resultData = {
                    name: adSetName,
                    budget: `$${adSetBudgetAmount} ${adSetBudgetType === 'Daily budget' ? 'Daily' : 'Lifetime'}`,
                    schedule: 'Ongoing'
                }
            } else if (initialData && context === 'Ads') {
                resultData = {
                    name: adName,
                    creative: {
                        ...initialData.creative,
                        primaryText: primaryText,
                        headline: headline
                    }
                }
            } else {
                resultData = {
                    name: campaignName,
                    bidStrategy: advPlusBudget ? campaignBidStrategy : 'Lowest cost',
                    budget: `$${advPlusBudget ? campaignBudget : adSetBudgetAmount} ${advPlusBudget ? (campaignBudgetType === 'Daily budget' ? 'Daily' : 'Lifetime') : (adSetBudgetType === 'Daily budget' ? 'Daily' : 'Lifetime')}`,
                    ends: endDate ? new Date(endDate).toLocaleDateString() : 'Ongoing'
                };
            }

            onCreate(resultData);
        }
    };

    const SidebarItem = ({ stepId, label, icon, isChild = false, isActive = false, hasError = false }: any) => {
        return (
            <div
                onClick={() => currentStep > 1 && setCurrentStep(stepId)}
                className={`
                flex items-center px-4 py-2 cursor-pointer transition-all relative group select-none
                ${isActive ? 'bg-[#EBF5FF]' : 'hover:bg-gray-100'}
                ${isChild ? 'pl-8' : ''}
            `}
            >
                <div className={`mr-3 ${isActive ? 'text-[#1877F2]' : 'text-gray-500'}`}>
                    {icon}
                </div>
                <div className="flex-1 overflow-hidden">
                    <span className={`text-[13px] block truncate ${isActive ? 'text-[#1877F2] font-semibold' : 'text-[#1C1E21] font-medium'}`}>
                        {label}
                    </span>
                    {hasError && <span className="text-[11px] text-red-500 flex items-center mt-0.5"><AlertCircle size={10} className="mr-1" /> 1 Error</span>}
                </div>
                <div className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={14} />
                </div>
            </div>
        );
    };

    const renderInitialModal = () => (
        <div className="flex h-full flex-col bg-white rounded-lg shadow-xl overflow-hidden max-w-[800px] w-full max-h-[650px] relative animate-scale-up">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300">
                <h2 className="text-[16px] font-bold text-[#1C1E21]">Create new campaign</h2>
                <button onClick={onClose} className="p-1 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">

                {/* Buying Type */}
                <div className="mb-6">
                    <div className="flex items-center mb-2">
                        <span className="text-[14px] font-bold text-[#1C1E21] mr-1">Choose a buying type</span>
                        <Info size={12} className="text-gray-500" />
                    </div>
                    <div className="relative">
                        <select
                            value={buyingType}
                            onChange={(e) => setBuyingType(e.target.value)}
                            className="w-full p-2.5 bg-white border border-gray-300 rounded-md text-[14px] text-[#1C1E21] font-medium appearance-none focus:ring-1 focus:ring-[#1877F2] focus:border-[#1877F2] outline-none cursor-pointer hover:border-gray-400"
                        >
                            <option>Auction</option>
                            <option>Reservation</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                    </div>
                </div>

                {/* Objective Selection */}
                <div className="mb-2">
                    <span className="text-[14px] font-bold text-[#1C1E21] block mb-3">Choose a campaign objective</span>

                    <div className="flex gap-6">
                        {/* Objectives List */}
                        <div className="w-1/2 space-y-2">
                            {objectives.map((obj) => (
                                <label
                                    key={obj.id}
                                    className={`
                                    flex items-center p-3 rounded-md cursor-pointer border transition-all
                                    ${selectedObjective === obj.id
                                            ? 'bg-[#EBF5FF] border-[#EBF5FF]'
                                            : 'bg-white border-transparent hover:bg-gray-100'
                                        }
                                `}
                                >
                                    <input
                                        type="radio"
                                        name="objective"
                                        checked={selectedObjective === obj.id}
                                        onChange={() => setSelectedObjective(obj.id)}
                                        className="hidden" // Hiding default radio, custom styling via container
                                    />
                                    <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center mr-3 shrink-0 transition-colors
                                    ${selectedObjective === obj.id ? 'bg-[#1877F2] text-white' : 'bg-[#E4E6EB] text-gray-600'}
                                `}>
                                        {React.cloneElement(obj.icon as React.ReactElement<any>, { size: 20 })}
                                    </div>
                                    <span className="text-[14px] font-semibold text-[#1C1E21]">{obj.name}</span>
                                </label>
                            ))}
                        </div>

                        {/* Right Illustration/Info Panel */}
                        <div className="w-1/2 flex flex-col justify-center text-gray-600 pl-4 border-l border-gray-100">
                            {selectedObjective ? (
                                <>
                                    <div className="mb-6 flex justify-center opacity-80">
                                        {/* Simplified Compass Illustration matching screenshot style */}
                                        <div className="relative w-48 h-32">
                                            <div className="absolute inset-0 bg-gray-100 rounded-lg border border-dashed border-gray-300"></div>
                                            {/* Dashed Path */}
                                            <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                                                <path d="M40,30 Q90,10 120,60 T180,80" fill="none" stroke="#A0AEC0" strokeWidth="2" strokeDasharray="6,4" />
                                                <circle cx="40" cy="30" r="6" fill="#4FD1C5" /> {/* Start Point */}
                                            </svg>
                                            {/* Compass Icon */}
                                            <div className="absolute bottom-4 right-10 bg-white p-2 rounded-full shadow-lg border border-gray-100">
                                                <Compass size={32} className="text-[#364a5f]" fill="#364a5f" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-[13px] leading-relaxed">
                                        <p className="mb-4">{objectives.find(o => o.id === selectedObjective)?.description}</p>
                                        <div className="font-bold text-gray-500 text-[11px] uppercase mb-1">Good for:</div>
                                        <div className="text-gray-500">{objectives.find(o => o.id === selectedObjective)?.goodFor}</div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center text-[13px]">Select an objective to see details.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-300 flex justify-between items-center bg-white">
                <a href="#" className="text-[14px] font-semibold text-[#1877F2] hover:underline">About campaign objectives</a>
                <div className="flex space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md bg-[#E4E6EB] hover:bg-[#D8DADF] text-[14px] font-semibold text-[#4B4C4F] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleContinue}
                        className="px-8 py-2 rounded-md bg-[#1877F2] hover:bg-[#166fe5] text-[14px] font-bold text-white transition-colors shadow-sm"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );

    const renderMainEditor = () => (
        <div className="flex h-full w-full bg-[#F0F2F5] animate-fade-in">
            {/* Sidebar */}
            <div className="w-[280px] bg-white border-r border-gray-300 flex flex-col shrink-0 z-10">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center text-[12px] font-bold text-gray-500">
                    <FolderOpenIcon className="mr-2" size={14} /> Campaigns
                </div>
                <div className="py-2 space-y-1">
                    <SidebarItem
                        stepId={2}
                        label={campaignName || 'New Campaign'}
                        icon={<Folder size={16} fill={currentStep === 2 ? "#1877F2" : "#99C2FF"} className={currentStep === 2 ? "text-[#1877F2]" : "text-[#99C2FF]"} />}
                        isActive={currentStep === 2}
                    />
                    <SidebarItem
                        stepId={3}
                        label={adSetName || 'New Ad Set'}
                        icon={<LayoutGrid size={16} className={currentStep === 3 ? "text-[#1877F2]" : "text-gray-400"} />}
                        isChild
                        isActive={currentStep === 3}
                    />
                    <SidebarItem
                        stepId={4}
                        label={adName || 'New Ad'}
                        icon={<ImageIcon size={16} className={currentStep === 4 ? "text-[#1877F2]" : "text-gray-400"} />}
                        isChild
                        isActive={currentStep === 4}
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative min-w-0">
                {/* Toolbar Header */}
                <div className="bg-white border-b border-gray-300 px-6 py-3 flex justify-between items-center shrink-0 shadow-sm z-10">
                    <div className="flex items-center space-x-2 text-[12px] text-gray-500 overflow-hidden">
                        <Folder size={14} className="text-[#1877F2]" fill="#1877F2" />
                        <span className="text-[#1877F2] font-medium truncate max-w-[150px]">{campaignName}</span>
                        <ChevronRight size={12} />
                        {currentStep > 2 && (
                            <>
                                <LayoutGrid size={14} />
                                <span className={`truncate max-w-[150px] ${currentStep === 3 ? "text-[#1877F2] font-medium" : ""}`}>1 Ad set</span>
                                <ChevronRight size={12} />
                            </>
                        )}
                        {currentStep > 3 && (
                            <>
                                <ImageIcon size={14} />
                                <span className="text-[#1877F2] font-medium truncate max-w-[150px]">1 Ad</span>
                            </>
                        )}
                    </div>

                    <div className="flex space-x-1 bg-[#F0F2F5] p-1 rounded-md shrink-0">
                        <button className="px-4 py-1 bg-white shadow-sm rounded text-[13px] font-semibold text-[#1877F2] flex items-center transition-all"><Edit3 size={12} className="mr-1.5" /> Edit</button>
                        <button className="px-4 py-1 text-[13px] font-semibold text-gray-600 hover:bg-gray-200 rounded flex items-center transition-all"><Eye size={12} className="mr-1.5" /> Review</button>
                    </div>

                    <div className="flex items-center space-x-4 shrink-0">
                        <div className="flex items-center text-[12px] font-medium text-gray-600">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> In draft
                        </div>
                        <div className="relative inline-block w-10 align-middle select-none">
                            <input type="checkbox" checked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-[#1877F2] checked:bg-[#1877F2] transition-all" />
                            <div className="block overflow-hidden h-5 rounded-full bg-[#1877F2] opacity-50 cursor-pointer"></div>
                        </div>
                        <button onClick={onClose}><MoreHorizontal size={20} className="text-gray-500 hover:text-gray-700" /></button>
                        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} className="text-gray-500" /></button>
                    </div>
                </div>

                {/* Scrollable Form Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F0F2F5]">
                    <div className="flex flex-col lg:flex-row gap-6 max-w-[1200px] mx-auto">

                        {/* Main Form Column */}
                        <div className="flex-1 space-y-4 min-w-0">

                            {/* --- CAMPAIGN LEVEL --- */}
                            {currentStep === 2 && (
                                <>
                                    <Card title="Campaign name">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={campaignName}
                                                onChange={(e) => setCampaignName(e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:ring-1 focus:ring-[#1877F2] focus:border-[#1877F2] outline-none"
                                                placeholder="Enter your campaign name"
                                            />
                                            <button className="px-3 py-2 border border-gray-300 rounded-md text-[14px] font-semibold bg-[#F0F2F5] hover:bg-gray-200 text-[#4B4C4F]">Create template</button>
                                        </div>
                                    </Card>

                                    <Card title="Special Ad Categories">
                                        <div className="mb-4">
                                            <p className="text-[13px] text-gray-500 mb-3">Declare if your ads are related to credit, employment or housing, or about social issues, elections or politics.</p>
                                            <div className="relative">
                                                <select
                                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md bg-white text-[14px] appearance-none focus:border-[#1877F2] outline-none cursor-pointer"
                                                    onChange={(e) => setSpecialAdCategories(e.target.value !== 'none')}
                                                >
                                                    <option value="none">Choose a category</option>
                                                    <option value="credit">Credit</option>
                                                    <option value="employment">Employment</option>
                                                    <option value="housing">Housing</option>
                                                    <option value="social">Social Issues, Elections or Politics</option>
                                                </select>
                                                <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card title="Campaign details">
                                        <div className="space-y-4">
                                            <div className="pb-4 border-b border-gray-100">
                                                <div className="text-[12px] font-bold text-gray-500 mb-1">Buying type</div>
                                                <div className="text-[14px] text-[#1C1E21]">{buyingType}</div>
                                            </div>
                                            <div className="pb-4 border-b border-gray-100">
                                                <div className="text-[12px] font-bold text-gray-500 mb-1 flex items-center">Campaign objective <Info size={12} className="ml-1" /></div>
                                                <div className="text-[14px] text-[#1C1E21]">{objectives.find(o => o.id === selectedObjective)?.name}</div>
                                            </div>
                                            <div className="text-[13px] text-[#1877F2] font-semibold cursor-pointer hover:underline">Show more options</div>
                                        </div>
                                    </Card>

                                    <Card title="A/B test" toggle checked={abTesting} onToggle={() => setAbTesting(!abTesting)}>
                                        <p className="text-[13px] text-gray-500 max-w-lg mb-0">Help improve ad performance by comparing versions to see what works best.</p>
                                    </Card>

                                    <Card title="Advantage+ campaign budget" toggle checked={advPlusBudget} onToggle={() => setAdvPlusBudget(!advPlusBudget)} icon={<Sparkles size={14} className="text-[#1877F2] ml-1 fill-current" />}>
                                        <div className="space-y-4">
                                            <p className="text-[13px] text-gray-500 max-w-lg">Advantage+ campaign budget automatically distributes your budget across your currently delivering ad sets to get better results.</p>

                                            {advPlusBudget && (
                                                <div className="pt-2 animate-fade-in space-y-4 border-t border-gray-100 mt-2">
                                                    <div className="flex items-center gap-2 pt-2">
                                                        <div className="relative flex-1 max-w-[200px]">
                                                            <span className="absolute left-3 top-2.5 text-gray-500 font-bold">$</span>
                                                            <input
                                                                type="text"
                                                                value={campaignBudget}
                                                                onChange={(e) => setCampaignBudget(e.target.value)}
                                                                className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none"
                                                            />
                                                        </div>
                                                        <div className="relative">
                                                            <select
                                                                value={campaignBudgetType}
                                                                onChange={(e) => setCampaignBudgetType(e.target.value)}
                                                                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-[14px] appearance-none pr-8 cursor-pointer focus:border-[#1877F2] outline-none"
                                                            >
                                                                <option>Daily budget</option>
                                                                <option>Lifetime budget</option>
                                                            </select>
                                                            <ChevronDown size={14} className="absolute right-2 top-3 text-gray-500 pointer-events-none" />
                                                        </div>
                                                    </div>

                                                    {/* Campaign Bid Strategy */}
                                                    <div>
                                                        <label className="block text-[12px] font-bold text-gray-500 mb-1">Campaign bid strategy</label>
                                                        <div className="relative">
                                                            <select
                                                                value={campaignBidStrategy}
                                                                onChange={(e) => setCampaignBidStrategy(e.target.value)}
                                                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md bg-white text-[14px] appearance-none focus:border-[#1877F2] outline-none cursor-pointer"
                                                            >
                                                                <option value="Highest volume">Highest volume</option>
                                                                <option value="Cost per result goal">Cost per result goal</option>
                                                                <option value="Bid cap">Bid cap</option>
                                                            </select>
                                                            <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                                                        </div>
                                                        <div className="mt-1 p-2 bg-gray-50 rounded text-[11px] text-gray-500 border border-gray-100">
                                                            {campaignBidStrategy === 'Highest volume' && 'Get the most results for your budget.'}
                                                            {campaignBidStrategy === 'Cost per result goal' && 'Aim for a certain cost per result while maximizing volume.'}
                                                            {campaignBidStrategy === 'Bid cap' && 'Set a limit on what to bid in each auction.'}
                                                        </div>
                                                    </div>

                                                    {/* Ad Scheduling Note if Lifetime */}
                                                    {campaignBudgetType === 'Lifetime budget' && (
                                                        <div className="flex items-start text-[12px] text-gray-600 bg-blue-50 p-2 rounded border border-blue-100">
                                                            <Info size={14} className="text-[#1877F2] mr-2 mt-0.5 shrink-0" />
                                                            <span>You can now schedule ads in your ad sets.</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                </>
                            )}

                            {/* --- AD SET LEVEL --- */}
                            {currentStep === 3 && (
                                <>
                                    <Card title="Ad set name">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={adSetName}
                                                onChange={(e) => setAdSetName(e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:ring-1 focus:ring-[#1877F2] focus:border-[#1877F2] outline-none"
                                            />
                                            <button className="px-3 py-2 border border-gray-300 rounded-md text-[14px] font-semibold bg-[#F0F2F5] hover:bg-gray-200 text-[#4B4C4F]">Create template</button>
                                        </div>
                                    </Card>

                                    <Card title="Conversion">
                                        <div className="mb-4">
                                            <div className="text-[12px] font-bold text-gray-500 mb-2">Performance goal</div>
                                            <div className="relative">
                                                <select
                                                    value={performanceGoal}
                                                    onChange={(e) => setPerformanceGoal(e.target.value)}
                                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md bg-white text-[14px] appearance-none focus:ring-1 focus:ring-[#1877F2] focus:border-[#1877F2] outline-none cursor-pointer"
                                                >
                                                    <option>Maximize reach of ads</option>
                                                    <option>Maximize number of impressions</option>
                                                    <option>Maximize ad recall lift</option>
                                                </select>
                                                <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="text-[14px] font-bold text-[#1C1E21] flex items-center">Facebook Page <Info size={12} className="ml-1 text-gray-500" /></label>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="flex-1 relative">
                                                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-[14px] flex items-center cursor-pointer hover:border-gray-400">
                                                        <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 overflow-hidden border border-gray-200">
                                                            <img src="https://ui-avatars.com/api/?name=Acme+Corp&background=random" alt="" className="w-full h-full" />
                                                        </div>
                                                        <span className="flex-1 font-medium text-[#1C1E21]">{facebookPage}</span>
                                                        <ChevronDown size={16} className="text-gray-500" />
                                                    </div>
                                                </div>
                                                <button className="px-3 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600"><Plus size={18} /></button>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card title="Budget & schedule">
                                        <div className="space-y-4">
                                            {/* Ad Set Budget Controls */}
                                            <div className="mb-4 pb-4 border-b border-gray-100">
                                                <label className="block text-[12px] font-bold text-gray-500 mb-2">Budget</label>
                                                {advPlusBudget ? (
                                                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-600 flex items-start">
                                                        <Info size={16} className="mr-2 mt-0.5 text-[#1877F2] shrink-0" />
                                                        <span>Campaign budget is on. Budget is controlled at the campaign level.</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <div className="relative">
                                                            <select
                                                                value={adSetBudgetType}
                                                                onChange={(e) => setAdSetBudgetType(e.target.value)}
                                                                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-[14px] appearance-none focus:border-[#1877F2] outline-none pr-8 cursor-pointer"
                                                            >
                                                                <option>Daily budget</option>
                                                                <option>Lifetime budget</option>
                                                            </select>
                                                            <ChevronDown size={14} className="absolute right-2 top-3 text-gray-500 pointer-events-none" />
                                                        </div>
                                                        <div className="relative flex-1 max-w-[150px]">
                                                            <span className="absolute left-3 top-2.5 text-gray-500 font-bold">$</span>
                                                            <input
                                                                type="text"
                                                                value={adSetBudgetAmount}
                                                                onChange={(e) => setAdSetBudgetAmount(e.target.value)}
                                                                className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none text-right"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {!advPlusBudget && adSetBudgetType === 'Lifetime budget' && (
                                                    <div className="mt-2 text-[11px] text-gray-500">
                                                        You won't spend more than ${adSetBudgetAmount} during the lifetime of your ad set.
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex gap-4">
                                                <div className="flex-1">
                                                    <label className="block text-[12px] font-bold text-gray-500 mb-1">Start date</label>
                                                    <input
                                                        type="date"
                                                        value={startDate}
                                                        onChange={(e) => setStartDate(e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none"
                                                    />
                                                </div>
                                                <div className="w-1/3">
                                                    <label className="block text-[12px] font-bold text-gray-500 mb-1">Time</label>
                                                    <input
                                                        type="time"
                                                        value={startTime}
                                                        onChange={(e) => setStartTime(e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none"
                                                    />
                                                </div>
                                            </div>

                                            {!endDate && (
                                                <div className="flex items-center">
                                                    <input type="checkbox" id="setEndDate" className="mr-2" onChange={(e) => e.target.checked && setEndDate(startDate)} />
                                                    <label htmlFor="setEndDate" className="text-[14px] text-[#1C1E21]">Set an end date</label>
                                                </div>
                                            )}

                                            {endDate && (
                                                <div className="flex gap-4">
                                                    <div className="flex-1">
                                                        <label className="block text-[12px] font-bold text-gray-500 mb-1">End date</label>
                                                        <input
                                                            type="date"
                                                            value={endDate}
                                                            onChange={(e) => setEndDate(e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none"
                                                        />
                                                    </div>
                                                    <div className="w-1/3">
                                                        <label className="block text-[12px] font-bold text-gray-500 mb-1">Time</label>
                                                        <input
                                                            type="time"
                                                            value={endTime}
                                                            onChange={(e) => setEndTime(e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Ad Scheduling Section */}
                                            <div className="pt-4 border-t border-gray-100">
                                                <div className="flex justify-between items-center mb-2">
                                                    <label className="text-[12px] font-bold text-gray-500">Ad scheduling</label>
                                                </div>

                                                {/* Show scheduling if Ad Set Lifetime Budget OR Campaign Lifetime Budget (Adv+) */}
                                                {(adSetBudgetType === 'Lifetime budget' && !advPlusBudget) || (advPlusBudget && campaignBudgetType === 'Lifetime budget') ? (
                                                    <div className="space-y-3">
                                                        <label className="flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={adScheduling}
                                                                onChange={(e) => setAdScheduling(e.target.checked)}
                                                                className="mr-2 rounded border-gray-300 text-[#1877F2] focus:ring-[#1877F2]"
                                                            />
                                                            <span className="text-[14px] text-[#1C1E21]">Run ads on a schedule</span>
                                                        </label>

                                                        {adScheduling && (
                                                            <div className="border border-gray-300 rounded-md p-4 animate-fade-in bg-white">
                                                                <div className="flex justify-between items-center mb-3">
                                                                    <span className="text-[12px] text-gray-500">Use viewer's time zone</span>
                                                                    <div className="flex items-center text-[10px] text-gray-500">
                                                                        <div className="w-3 h-3 bg-[#1877F2] mr-1.5 rounded-sm"></div> Scheduled
                                                                    </div>
                                                                </div>

                                                                {/* Scheduler Grid */}
                                                                <div className="select-none">
                                                                    <div className="grid grid-cols-[40px_1fr] gap-2">
                                                                        {/* Y-Axis Labels */}
                                                                        <div className="text-[10px] text-gray-400 space-y-3 pt-5 text-right font-medium">
                                                                            <div>Mon</div>
                                                                            <div>Tue</div>
                                                                            <div>Wed</div>
                                                                            <div>Thu</div>
                                                                            <div>Fri</div>
                                                                            <div>Sat</div>
                                                                            <div>Sun</div>
                                                                        </div>

                                                                        {/* Grid */}
                                                                        <div>
                                                                            {/* X-Axis Labels */}
                                                                            <div className="flex justify-between text-[10px] text-gray-400 mb-1 px-1">
                                                                                <span>12am</span>
                                                                                <span>3</span>
                                                                                <span>6</span>
                                                                                <span>9</span>
                                                                                <span>12pm</span>
                                                                                <span>3</span>
                                                                                <span>6</span>
                                                                                <span>9</span>
                                                                            </div>

                                                                            <div className="space-y-3 bg-gray-50 border border-gray-200 rounded p-1">
                                                                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                                                                    <div key={day} className="h-4 flex rounded-sm overflow-hidden bg-white border border-gray-100">
                                                                                        {Array.from({ length: 24 }).map((_, i) => (
                                                                                            <div
                                                                                                key={i}
                                                                                                className={`flex-1 border-r border-gray-50 last:border-0 hover:bg-blue-200 transition-colors cursor-pointer ${
                                                                                                    // Pre-fill some slots for simulation
                                                                                                    (day !== 'Sat' && day !== 'Sun' && i >= 9 && i <= 17) ? 'bg-[#1877F2]' :
                                                                                                        ((day === 'Sat' || day === 'Sun') && i >= 10 && i <= 14) ? 'bg-[#1877F2]' : ''
                                                                                                    }`}
                                                                                                title={`${day} ${i}:00`}
                                                                                            ></div>
                                                                                        ))}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-3 text-[11px] text-gray-400 text-center">
                                                                    Click or drag to select times to show your ads.
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-start bg-gray-50 p-3 rounded-md text-[13px] text-gray-600">
                                                        <Info size={16} className="mr-2 mt-0.5 text-gray-400 shrink-0" />
                                                        <span>Ad scheduling is only available with a lifetime budget. Switch to a lifetime budget to use this feature.</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Card>

                                    <Card title="Audience Controls">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-[12px] font-bold text-gray-500 mb-1">Locations</label>
                                                <div className="p-2 border border-gray-300 rounded-md bg-white flex items-center justify-between hover:border-gray-400 cursor-pointer">
                                                    <span className="text-[14px]">{audienceLocation}</span>
                                                    <Edit3 size={14} className="text-gray-500" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[12px] font-bold text-gray-500 mb-1">Minimum age</label>
                                                <div className="p-2 border border-gray-300 rounded-md bg-white flex items-center justify-between hover:border-gray-400 cursor-pointer">
                                                    <span className="text-[14px]">{minAge}+</span>
                                                    <Edit3 size={14} className="text-gray-500" />
                                                </div>
                                            </div>
                                            <div className="pt-2">
                                                <button className="text-[#1877F2] text-[14px] font-semibold hover:underline">Show more options</button>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card title="Audience" icon={<Users size={16} className="text-[#1C1E21] mr-2" />}>
                                        <div className="space-y-4">
                                            <div className="bg-[#F0F2F5] p-3 rounded-md text-[13px] text-gray-600 mb-2">
                                                <span className="font-bold">Advantage+ audience</span> is automatically using AI to find your audience. You can add specific targeting below as a suggestion.
                                            </div>

                                            {/* Gender */}
                                            <div>
                                                <label className="block text-[12px] font-bold text-gray-500 mb-1">Gender</label>
                                                <div className="flex space-x-4">
                                                    {['All', 'Men', 'Women'].map(g => (
                                                        <label key={g} className="flex items-center cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name="gender"
                                                                checked={gender === g}
                                                                onChange={() => setGender(g)}
                                                                className="mr-2 text-[#1877F2] focus:ring-[#1877F2]"
                                                            />
                                                            <span className="text-[14px]">{g}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Detailed Targeting */}
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <label className="block text-[12px] font-bold text-gray-500">Detailed Targeting</label>
                                                    <button
                                                        onClick={() => setShowBrowseMenu(!showBrowseMenu)}
                                                        className="text-[13px] font-semibold text-[#1877F2] hover:bg-[#EBF5FF] px-2 py-1 rounded transition-colors"
                                                    >
                                                        Browse
                                                    </button>
                                                </div>
                                                <p className="text-[12px] text-gray-400 mb-2">Include people who match</p>
                                                <div className="relative">
                                                    <div className={`flex flex-wrap gap-2 p-2 border ${showBrowseMenu ? 'border-[#1877F2] ring-1 ring-[#1877F2]' : 'border-gray-300'} rounded-md bg-white min-h-[42px] focus-within:ring-1 focus-within:ring-[#1877F2] focus-within:border-[#1877F2] transition-all`}>
                                                        {includedInterests.map(interest => (
                                                            <span key={interest} className="bg-[#EBF5FF] text-[#0064D1] px-2 py-1 rounded-full text-[13px] font-medium flex items-center animate-fade-in">
                                                                {interest}
                                                                <X size={14} className="ml-1 cursor-pointer hover:text-blue-800" onClick={() => toggleInterest(interest)} />
                                                            </span>
                                                        ))}
                                                        <input
                                                            type="text"
                                                            value={targetingQuery}
                                                            onChange={(e) => {
                                                                setTargetingQuery(e.target.value);
                                                                if (e.target.value) setShowBrowseMenu(false);
                                                            }}
                                                            onFocus={() => setShowBrowseMenu(false)}
                                                            placeholder={includedInterests.length > 0 ? "" : "Add demographics, interests or behaviors"}
                                                            className="flex-1 outline-none text-[14px] min-w-[150px] bg-transparent"
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter' && targetingQuery) {
                                                                    toggleInterest(targetingQuery);
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <Search size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                                </div>

                                                {/* Search Suggestions */}
                                                {targetingQuery && (
                                                    <div className="absolute z-20 w-full bg-white border border-gray-200 shadow-xl rounded-md mt-1 max-h-60 overflow-auto animate-fade-in">
                                                        <div className="px-3 py-2 text-[11px] font-bold text-gray-500 bg-gray-50 border-b border-gray-100">SUGGESTIONS</div>
                                                        {[
                                                            { name: 'Marketing', type: 'Interest' },
                                                            { name: 'Social Media', type: 'Interest' },
                                                            { name: 'Small Business', type: 'Interest' },
                                                            { name: 'Advertising', type: 'Interest' },
                                                            { name: 'Technology', type: 'Interest' },
                                                            { name: 'Fitness', type: 'Interest' },
                                                            { name: 'Business Owner', type: 'Job Title' },
                                                            { name: 'Engaged Shoppers', type: 'Behavior' },
                                                            { name: 'University Graduate', type: 'Demographic' },
                                                        ].filter(i => i.name.toLowerCase().includes(targetingQuery.toLowerCase())).map(i => (
                                                            <div
                                                                key={i.name}
                                                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-[14px] flex justify-between items-center group"
                                                                onClick={() => {
                                                                    toggleInterest(i.name);
                                                                    setTargetingQuery('');
                                                                }}
                                                            >
                                                                <div>
                                                                    <div className="font-medium text-[#1C1E21]">{i.name}</div>
                                                                    <div className="text-[11px] text-gray-500">{i.type}</div>
                                                                </div>
                                                                <Plus size={16} className="text-gray-400 group-hover:text-[#1877F2]" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Browse Menu */}
                                                {showBrowseMenu && !targetingQuery && (
                                                    <div className="absolute z-20 w-full bg-white border border-gray-200 shadow-xl rounded-md mt-1 max-h-60 overflow-auto animate-fade-in">
                                                        <div className="px-3 py-2 text-[11px] font-bold text-gray-500 bg-gray-50 border-b border-gray-100">BROWSE</div>
                                                        {['Demographics', 'Interests', 'Behaviors'].map((category) => (
                                                            <div
                                                                key={category}
                                                                className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-50 last:border-0 group"
                                                                onClick={() => {
                                                                    // Mock action for browsing
                                                                    setTargetingQuery(category.slice(0, 3));
                                                                    setShowBrowseMenu(false);
                                                                }}
                                                            >
                                                                <div className="flex items-center">
                                                                    <Folder size={16} className="text-gray-400 mr-3 group-hover:text-[#1C1E21]" />
                                                                    <span className="text-[14px] font-medium text-[#1C1E21]">{category}</span>
                                                                </div>
                                                                <ChevronRight size={16} className="text-gray-400" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Languages */}
                                            <div>
                                                <label className="block text-[12px] font-bold text-gray-500 mb-1">Languages</label>
                                                <input
                                                    type="text"
                                                    value={languages}
                                                    onChange={(e) => setLanguages(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none"
                                                />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card title="Placements">
                                        <div className="space-y-4">
                                            <label className={`flex items-start p-3 rounded-md border cursor-pointer transition-all ${placementType === 'advantage' ? 'bg-[#F0F7FF] border-[#1877F2]' : 'hover:bg-gray-50 border-gray-200'}`}>
                                                <input
                                                    type="radio"
                                                    name="placements"
                                                    checked={placementType === 'advantage'}
                                                    onChange={() => setPlacementType('advantage')}
                                                    className="mt-1 mr-3 text-[#1877F2] focus:ring-[#1877F2]"
                                                />
                                                <div>
                                                    <div className="flex items-center">
                                                        <span className="text-[14px] font-bold text-[#1C1E21]">Advantage+ placements (Recommended)</span>
                                                        <Sparkles size={12} className="text-[#1877F2] ml-1 fill-current" />
                                                    </div>
                                                    <p className="text-[12px] text-gray-500 mt-0.5">Use Advantage+ placements to maximize your budget and help show your ads to more people.</p>
                                                </div>
                                            </label>

                                            <label className={`flex items-start p-3 rounded-md border cursor-pointer transition-all ${placementType === 'manual' ? 'bg-white border-gray-300 ring-1 ring-[#1877F2] border-[#1877F2]' : 'hover:bg-gray-50 border-gray-200'}`}>
                                                <input
                                                    type="radio"
                                                    name="placements"
                                                    checked={placementType === 'manual'}
                                                    onChange={() => setPlacementType('manual')}
                                                    className="mt-1 mr-3 text-[#1877F2] focus:ring-[#1877F2]"
                                                />
                                                <div>
                                                    <span className="text-[14px] font-bold text-[#1C1E21]">Manual placements</span>
                                                    <p className="text-[12px] text-gray-500 mt-0.5">Manually choose the places to show your ad.</p>
                                                </div>
                                            </label>

                                            {placementType === 'manual' && (
                                                <div className="pl-8 pt-2 animate-fade-in">
                                                    <div className="text-[12px] font-bold text-gray-500 mb-2">Devices</div>
                                                    <div className="flex items-center space-x-6 mb-4 text-[14px]">
                                                        <label className="flex items-center cursor-pointer">
                                                            <input type="checkbox" defaultChecked className="mr-2 rounded text-[#1877F2] focus:ring-[#1877F2]" />
                                                            <Smartphone size={16} className="mr-1 text-gray-500" /> Mobile
                                                        </label>
                                                        <label className="flex items-center cursor-pointer">
                                                            <input type="checkbox" defaultChecked className="mr-2 rounded text-[#1877F2] focus:ring-[#1877F2]" />
                                                            <Monitor size={16} className="mr-1 text-gray-500" /> Desktop
                                                        </label>
                                                    </div>

                                                    <div className="text-[12px] font-bold text-gray-500 mb-2">Platforms</div>
                                                    <div className="space-y-2">
                                                        <label className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-md -ml-2 transition-colors">
                                                            <input type="checkbox" checked={platforms.facebook} onChange={() => togglePlatform('facebook')} className="mr-3 rounded border-gray-300 text-[#1877F2] focus:ring-[#1877F2] w-4 h-4" />
                                                            <span className="text-[14px] font-medium text-[#1C1E21]">Facebook</span>
                                                        </label>
                                                        <label className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-md -ml-2 transition-colors">
                                                            <input type="checkbox" checked={platforms.instagram} onChange={() => togglePlatform('instagram')} className="mr-3 rounded border-gray-300 text-[#1877F2] focus:ring-[#1877F2] w-4 h-4" />
                                                            <span className="text-[14px] font-medium text-[#1C1E21]">Instagram</span>
                                                        </label>
                                                        <label className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-md -ml-2 transition-colors">
                                                            <input type="checkbox" checked={platforms.audienceNetwork} onChange={() => togglePlatform('audienceNetwork')} className="mr-3 rounded border-gray-300 text-[#1877F2] focus:ring-[#1877F2] w-4 h-4" />
                                                            <span className="text-[14px] font-medium text-[#1C1E21]">Audience Network</span>
                                                        </label>
                                                        <label className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-md -ml-2 transition-colors">
                                                            <input type="checkbox" checked={platforms.messenger} onChange={() => togglePlatform('messenger')} className="mr-3 rounded border-gray-300 text-[#1877F2] focus:ring-[#1877F2] w-4 h-4" />
                                                            <span className="text-[14px] font-medium text-[#1C1E21]">Messenger</span>
                                                        </label>
                                                        <label className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-md -ml-2 transition-colors">
                                                            <input type="checkbox" checked={platforms.whatsapp} onChange={() => togglePlatform('whatsapp')} className="mr-3 rounded border-gray-300 text-[#1877F2] focus:ring-[#1877F2] w-4 h-4" />
                                                            <span className="text-[14px] font-medium text-[#1C1E21]">WhatsApp</span>
                                                        </label>
                                                    </div>

                                                    <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md text-[12px] flex items-start">
                                                        <Info size={14} className="mr-2 mt-0.5 shrink-0" />
                                                        <span>Asset customization available in the Ad level.</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                </>
                            )}

                            {/* --- AD LEVEL --- */}
                            {currentStep === 4 && (
                                <>
                                    <Card title="Ad name">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={adName}
                                                onChange={(e) => setAdName(e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:ring-1 focus:ring-[#1877F2] focus:border-[#1877F2] outline-none"
                                            />
                                        </div>
                                    </Card>

                                    <Card title="Identity">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-[12px] font-bold text-gray-500 mb-1">Facebook Page</label>
                                                <div className="relative">
                                                    <select
                                                        value={identityPage}
                                                        onChange={(e) => setIdentityPage(e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-[14px] font-medium appearance-none focus:border-[#1877F2] outline-none"
                                                    >
                                                        <option>Acme Corp</option>
                                                        <option>Acme Lifestyle</option>
                                                    </select>
                                                    <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[12px] font-bold text-gray-500 mb-1">Instagram account</label>
                                                <div className="relative">
                                                    <select
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-[14px] appearance-none focus:border-[#1877F2] outline-none text-gray-600"
                                                    >
                                                        <option>Use selected page</option>
                                                    </select>
                                                    <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card title="Ad setup">
                                        <div className="mb-4">
                                            <div className="flex gap-4 text-[14px] font-semibold text-gray-500 border-b border-gray-200 pb-2 mb-4">
                                                <button
                                                    className={`pb-2 -mb-2.5 border-b-2 transition-colors ${adSetup === 'create_ad' ? 'text-[#1877F2] border-[#1877F2]' : 'border-transparent hover:text-gray-700'}`}
                                                    onClick={() => setAdSetup('create_ad')}
                                                >Create ad</button>
                                                <button
                                                    className={`pb-2 -mb-2.5 border-b-2 transition-colors ${adSetup === 'existing_post' ? 'text-[#1877F2] border-[#1877F2]' : 'border-transparent hover:text-gray-700'}`}
                                                    onClick={() => setAdSetup('existing_post')}
                                                >Use existing post</button>
                                                <button
                                                    className={`pb-2 -mb-2.5 border-b-2 transition-colors ${adSetup === 'mockup' ? 'text-[#1877F2] border-[#1877F2]' : 'border-transparent hover:text-gray-700'}`}
                                                    onClick={() => setAdSetup('mockup')}
                                                >Use Creative Hub mockup</button>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="font-bold text-[12px] text-gray-500 uppercase">Format</div>
                                                <label className="flex items-start cursor-pointer group">
                                                    <input type="radio" name="format" checked={format === 'single'} onChange={() => setFormat('single')} className="mt-1" />
                                                    <div className="ml-2">
                                                        <span className="block text-[14px] font-semibold text-[#1C1E21]">Single image or video</span>
                                                        <span className="text-[12px] text-gray-500">One image or video, or a slideshow with multiple images.</span>
                                                    </div>
                                                </label>
                                                <label className="flex items-start cursor-pointer group">
                                                    <input type="radio" name="format" checked={format === 'carousel'} onChange={() => setFormat('carousel')} className="mt-1" />
                                                    <div className="ml-2">
                                                        <span className="block text-[14px] font-semibold text-[#1C1E21]">Carousel</span>
                                                        <span className="text-[12px] text-gray-500">Two or more scrollable images or videos.</span>
                                                    </div>
                                                </label>
                                                <label className="flex items-start cursor-pointer group">
                                                    <input type="radio" name="format" checked={format === 'collection'} onChange={() => setFormat('collection')} className="mt-1" />
                                                    <div className="ml-2">
                                                        <span className="block text-[14px] font-semibold text-[#1C1E21]">Collection</span>
                                                        <span className="text-[12px] text-gray-500">Group of items that opens into a fullscreen mobile experience.</span>
                                                    </div>
                                                </label>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <div className="flex items-start">
                                                    <input type="checkbox" checked={multiAdvertiser} onChange={() => setMultiAdvertiser(!multiAdvertiser)} className="mt-1" />
                                                    <div className="ml-2">
                                                        <span className="block text-[14px] font-semibold text-[#1C1E21]">Multi-advertiser ads</span>
                                                        <span className="text-[12px] text-gray-500 max-w-md block">Enabling this may increase your ad's exposure to people in a shopping mindset.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card title="Ad creative">
                                        <div className="space-y-4">
                                            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg flex flex-col items-center justify-center min-h-[160px] border-dashed">
                                                <div className="bg-gray-200 p-3 rounded-full mb-3">
                                                    <ImageIcon size={24} className="text-gray-500" />
                                                </div>
                                                <div className="flex gap-3">
                                                    <button onClick={() => handleOpenMediaLibrary('image')} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-[14px] font-bold shadow-sm hover:bg-gray-50 text-gray-700">Add Image</button>
                                                    <button onClick={() => handleOpenMediaLibrary('video')} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-[14px] font-bold shadow-sm hover:bg-gray-50 text-gray-700">Add Video</button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[12px] font-bold text-gray-500 mb-1">Primary Text</label>
                                                <div className="relative">
                                                    <textarea
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none min-h-[100px]"
                                                        value={primaryText}
                                                        onChange={e => setPrimaryText(e.target.value)}
                                                        placeholder="Tell people what your ad is about"
                                                    ></textarea>
                                                    <div className="absolute bottom-2 right-2 flex gap-1">
                                                        <button className="p-1 hover:bg-gray-100 rounded text-gray-400"><Plus size={16} /></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[12px] font-bold text-gray-500 mb-1">Headline</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none"
                                                    value={headline}
                                                    onChange={e => setHeadline(e.target.value)}
                                                    placeholder="Write a short headline"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[12px] font-bold text-gray-500 mb-1">Website URL</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:border-[#1877F2] outline-none"
                                                    value={websiteUrl}
                                                    onChange={e => setWebsiteUrl(e.target.value)}
                                                    placeholder="https://example.com"
                                                />
                                            </div>
                                        </div>
                                    </Card>
                                </>
                            )}
                        </div>

                        {/* Right Column (Helper / Charts / Preview placeholder) */}
                        <div className="w-full lg:w-[320px] shrink-0 space-y-4">
                            {currentStep === 2 && (
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                    <div className="flex items-center mb-2">
                                        <div className="relative w-12 h-12 mr-3 shrink-0">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="24" cy="24" r="20" stroke="#E4E6EB" strokeWidth="4" fill="none" />
                                                <circle cx="24" cy="24" r="20" stroke="#31A24C" strokeWidth="4" fill="none" strokeDasharray="125" strokeDashoffset="0" />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center text-[12px] font-bold text-[#31A24C]">100</div>
                                        </div>
                                        <div>
                                            <div className="text-[14px] font-bold text-[#1C1E21] flex items-center">Campaign score <Info size={12} className="ml-1 text-gray-400" /></div>
                                            <div className="text-[12px] text-gray-500">You're using our recommended setup.</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 sticky top-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-[14px] font-bold text-[#1C1E21] flex items-center">Audience definition <Info size={12} className="ml-1 text-gray-400" /></h3>
                                    </div>
                                    <p className="text-[13px] text-gray-600 mb-4 font-medium">Your audience is broad.</p>

                                    {/* Gauge Chart Simulation */}
                                    <div className="relative h-2 bg-gray-200 rounded-full mb-2 overflow-hidden flex">
                                        <div className="w-1/4 bg-red-400 h-full"></div>
                                        <div className="w-1/4 bg-yellow-400 h-full"></div>
                                        <div className="w-1/2 bg-green-500 h-full"></div>
                                        {/* Indicator */}
                                        <div className="absolute top-0 bottom-0 w-1 bg-black left-[85%] border-l border-white"></div>
                                    </div>
                                    <div className="flex justify-between text-[11px] text-gray-500 mb-4 font-medium">
                                        <span>Narrow</span>
                                        <span>Broad</span>
                                    </div>

                                    <div className="space-y-3 pt-3 border-t border-gray-100">
                                        <div>
                                            <div className="text-[12px] text-gray-500 mb-1 flex items-center">Estimated audience size <Info size={12} className="ml-1" /></div>
                                            <div className="text-[18px] font-bold text-[#1C1E21]">30,500,000 - 35,900,000</div>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-3 bg-blue-50 rounded-md flex items-start border border-blue-100">
                                        <Zap size={16} className="text-[#1877F2] mt-0.5 mr-2 shrink-0" fill="currentColor" />
                                        <p className="text-[11px] text-gray-600 leading-snug">Estimates do not include Advantage+ audience options and may vary significantly over time based on your targeting selections and available data.</p>
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="bg-white p-0 rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-4">
                                    <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                                        <span className="text-[12px] font-bold text-gray-500">Ad Preview</span>
                                        <div className="flex space-x-2">
                                            <button className="p-1 hover:bg-gray-200 rounded"><Share2Icon size={14} /></button>
                                            <button className="p-1 hover:bg-gray-200 rounded"><ExternalLinkIcon size={14} /></button>
                                        </div>
                                    </div>
                                    <div className="p-4 flex flex-col items-center">
                                        {/* Mobile Feed Preview Stub */}
                                        <div className="w-[280px] border border-gray-200 bg-white rounded-md shadow-sm overflow-hidden">
                                            <div className="p-2 flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                                                <div>
                                                    <div className="w-20 h-2 bg-gray-200 rounded mb-1"></div>
                                                    <div className="w-10 h-2 bg-gray-100 rounded"></div>
                                                </div>
                                            </div>
                                            <div className="px-2 pb-2 space-y-1">
                                                <div className="w-full h-2 bg-gray-100 rounded"></div>
                                                <div className="w-3/4 h-2 bg-gray-100 rounded"></div>
                                            </div>
                                            <div className="h-40 bg-gray-100 w-full flex items-center justify-center text-gray-300">
                                                <ImageIcon size={32} />
                                            </div>
                                            <div className="p-2 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                                <div className="space-y-1">
                                                    <div className="w-16 h-2 bg-gray-200 rounded"></div>
                                                    <div className="w-24 h-2 bg-gray-300 rounded"></div>
                                                </div>
                                                <div className="px-3 py-1 bg-gray-200 rounded text-[10px] font-bold text-gray-500">LEARN MORE</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="px-6 py-4 border-t border-gray-300 bg-white flex justify-between items-center shrink-0 z-20">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-[14px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">Close</button>
                    <div className="flex space-x-3">
                        {currentStep > 2 && <button onClick={() => setCurrentStep(currentStep - 1)} className="px-4 py-2 border border-gray-300 rounded-md text-[14px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">Back</button>}
                        <button
                            onClick={() => currentStep < 4 ? setCurrentStep(currentStep + 1) : handleContinue()}
                            className="px-8 py-2 bg-[#1877F2] hover:bg-[#166fe5] rounded-md text-[14px] font-bold text-white shadow-sm transition-colors"
                        >
                            {initialData ? 'Update' : (currentStep === 4 ? 'Publish' : 'Next')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300`}>
            {currentStep === 1 ? renderInitialModal() : renderMainEditor()}
        </div>
    );
};

// Reusable Card Component for Main Editor
const Card = ({ title, children, toggle, checked, onToggle, icon }: any) => {
    return (
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 group hover:border-gray-300 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                    <Check size={16} className="text-green-600 mr-2" />
                    <h3 className="text-[16px] font-bold text-[#1C1E21] flex items-center">
                        {title} {icon}
                    </h3>
                </div>
                {toggle && (
                    <div className="relative inline-block w-10 align-middle select-none">
                        <input type="checkbox" checked={checked} onChange={onToggle} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-[#1877F2] checked:bg-[#1877F2] transition-all" />
                        <div className={`block overflow-hidden h-5 rounded-full cursor-pointer transition-colors ${checked ? 'bg-[#1877F2] opacity-50' : 'bg-gray-300'}`}></div>
                    </div>
                )}
            </div>
            <div className={`transition-opacity duration-200 ${toggle && !checked ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                {children}
            </div>
        </div>
    )
}

// Helpers
const FolderOpenIcon = ({ className, size }: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
);
const Share2Icon = ({ size }: any) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>);
const ExternalLinkIcon = ({ size }: any) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>);

export default CreateModal;
