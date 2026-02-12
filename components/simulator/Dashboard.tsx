
import React, { useState, useMemo, useEffect } from 'react';
import {
    Plus,
    Copy,
    Edit3,
    Trash2,
    Search,
    X,
    Filter,
    Layout,
    MoreHorizontal,
    ChevronDown,
    FolderOpen,
    LayoutGrid,
    FileText,
    Calendar,
    Settings,
    Download,
    CheckCircle,
    EyeOff,
    Columns
} from 'lucide-react';
import CampaignTable from './CampaignTable';
import PerformanceChart from './PerformanceChart';
import CreateModal from './CreateModal';
import AdDetailsPanel from './AdDetailsPanel';
import TopNavigation from './TopNavigation';
import { campaigns as initialCampaigns, adSets as initialAdSets, ads as initialAds, Campaign, AdSet, Ad } from '../../utils/simulator/mockData';

type TabType = 'Campaigns' | 'Ad Sets' | 'Ads';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<TabType>('Campaigns');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
    const [editData, setEditData] = useState<any | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // -- Toolbar States --
    const [dateRange, setDateRange] = useState('This month');
    const [showDateMenu, setShowDateMenu] = useState(false);
    const [showColumnMenu, setShowColumnMenu] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        budget: true,
        bidStrategy: true,
        qualityRanking: true,
        results: true,
        reach: true,
        impressions: true,
        costPerResult: true,
        amountSpent: true,
        ends: true
    });

    // Data States
    const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
    const [adSets, setAdSets] = useState<AdSet[]>(initialAdSets);
    const [ads, setAds] = useState<Ad[]>(initialAds);

    // Selection State
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // Derived state for "Drafts" (simulated by checking if items exceed initial count or modified)
    // For simulation, let's track a count of "unsaved changes" action
    const [draftCount, setDraftCount] = useState(0);

    const currentData = useMemo(() => {
        switch (activeTab) {
            case 'Campaigns': return campaigns;
            case 'Ad Sets': return adSets;
            case 'Ads': return ads;
            default: return campaigns;
        }
    }, [activeTab, campaigns, adSets, ads]);

    const filteredData = useMemo(() => {
        return currentData.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.id.includes(searchQuery)
        );
    }, [currentData, searchQuery]);

    // --- Actions ---

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
        setSelectedIds(new Set());
        setSearchQuery('');
        setSelectedAd(null);
        setEditData(null);
    };

    const handleSelectionChange = (id: string) => {
        const newSelection = new Set(selectedIds);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedIds(newSelection);
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(new Set(filteredData.map(item => item.id)));
        } else {
            setSelectedIds(new Set());
        }
    };

    const handleStatusToggle = (id: string) => {
        const toggleItem = (items: any[], setItems: any) => {
            setItems(items.map((item: any) => {
                if (item.id === id) {
                    setDraftCount(prev => prev + 1);
                    const newStatus = item.delivery === 'Active' ? 'Off' : 'Active';
                    return { ...item, delivery: newStatus };
                }
                return item;
            }));
        };

        if (activeTab === 'Campaigns') toggleItem(campaigns, setCampaigns);
        if (activeTab === 'Ad Sets') toggleItem(adSets, setAdSets);
        if (activeTab === 'Ads') toggleItem(ads, setAds);
    };

    const handleDeleteClick = () => {
        if (selectedIds.size > 0) {
            setShowDeleteConfirm(true);
        }
    };

    const confirmDelete = () => {
        const idsToDelete = new Set(selectedIds);
        const filterFunc = (item: any) => !idsToDelete.has(item.id);

        if (activeTab === 'Campaigns') setCampaigns(prev => prev.filter(filterFunc));
        else if (activeTab === 'Ad Sets') setAdSets(prev => prev.filter(filterFunc));
        else setAds(prev => prev.filter(filterFunc));

        setSelectedIds(new Set());
        if (selectedAd && idsToDelete.has(selectedAd.id)) setSelectedAd(null);
        setDraftCount(prev => prev + 1);
        setShowDeleteConfirm(false);
    };

    const handleDuplicate = () => {
        const idsToDup = Array.from(selectedIds);
        if (idsToDup.length === 0) return;

        const dupItem = (items: any[], setItems: any) => {
            const newItems: any[] = [];
            items.forEach((item: any) => {
                if (selectedIds.has(item.id)) {
                    const copy = {
                        ...item,
                        id: Math.random().toString(36).substr(2, 9),
                        name: `${item.name} - Copy`,
                        delivery: 'In Draft'
                    };
                    newItems.push(copy);
                }
            });
            if (newItems.length > 0) {
                setItems([...newItems, ...items]);
                setDraftCount(prev => prev + newItems.length);
                alert(`Duplicated ${newItems.length} items.`);
            }
        };

        if (activeTab === 'Campaigns') dupItem(campaigns, setCampaigns);
        else if (activeTab === 'Ad Sets') dupItem(adSets, setAdSets);
        else dupItem(ads, setAds);

        setSelectedIds(new Set());
    };

    const handleExport = () => {
        if (filteredData.length === 0) {
            alert("No data to export");
            return;
        }

        // Simple CSV generation
        const headers = Object.keys(filteredData[0]).join(',');
        const rows = filteredData.map(obj =>
            Object.values(obj).map(val =>
                typeof val === 'string' && val.includes(',') ? `"${val}"` : val
            ).join(',')
        ).join('\n');

        const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${activeTab.toLowerCase()}_export_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDateSelect = (range: string) => {
        setDateRange(range);
        setShowDateMenu(false);
        // Simulate data refresh visual
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 600);
    };

    const handleEdit = () => {
        if (selectedIds.size !== 1) return;
        const id = Array.from(selectedIds)[0];
        const item = currentData.find(i => i.id === id);
        if (item) {
            setEditData(item);
            setIsCreateModalOpen(true);
        }
    };

    const handleSave = (result: any) => {
        if (editData) {
            // Update
            const updater = (item: any) => {
                if (item.id === editData.id) {
                    return { ...item, ...result, id: item.id };
                }
                return item;
            };

            if (activeTab === 'Campaigns') setCampaigns(prev => prev.map(updater));
            else if (activeTab === 'Ad Sets') setAdSets(prev => prev.map(updater));
            else setAds(prev => prev.map(updater));
        } else {
            // Create
            const newItem = {
                ...result,
                id: Math.random().toString(36).substr(2, 9),
                delivery: 'In Draft',
                results: '0',
                reach: '0',
                impressions: '0',
                costPerResult: '-',
                amountSpent: '$0.00',
                ends: 'Ongoing'
            };

            if (activeTab === 'Campaigns') setCampaigns([newItem as Campaign, ...campaigns]);
            else if (activeTab === 'Ad Sets') setAdSets([{ ...newItem, schedule: 'Ongoing' } as AdSet, ...adSets]);
            else setAds([{ ...newItem, qualityRanking: '-' } as Ad, ...ads]);
        }
        setDraftCount(prev => prev + 1);
        setIsCreateModalOpen(false);
        setEditData(null);
    };

    const handleCloseModal = () => {
        setIsCreateModalOpen(false);
        setEditData(null);
    };

    // -- Top Nav Handlers --
    const handleDiscard = () => {
        if (confirm("Discard all draft changes? This will revert the data to its original state.")) {
            setCampaigns(initialCampaigns);
            setAdSets(initialAdSets);
            setAds(initialAds);
            setDraftCount(0);
        }
    };

    const handlePublish = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            setDraftCount(0);

            // Set all 'In Draft' to 'Active'
            const activator = (items: any[]) => items.map(i => i.delivery === 'In Draft' ? { ...i, delivery: 'Active' } : i);
            setCampaigns(prev => activator(prev) as Campaign[]);
            setAdSets(prev => activator(prev) as AdSet[]);
            setAds(prev => activator(prev) as Ad[]);

            alert("Items published successfully!");
        }, 1500);
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    return (
        <div className="flex flex-col h-full bg-[#F0F2F5]">

            <TopNavigation
                draftCount={draftCount}
                onDiscard={handleDiscard}
                onPublish={handlePublish}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
            />

            {/* 1. Search & Filter Bar */}
            <div className="bg-white border-b border-gray-300 px-4 py-2 flex items-center space-x-2 shadow-[0_1px_2px_rgba(0,0,0,0.05)] z-20">
                <div className="flex items-center space-x-2">
                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600">
                        <Search size={16} />
                    </button>
                    <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-[14px] font-semibold text-gray-700">
                        <FolderOpen size={16} className="mr-2 text-[#1877F2]" /> All ads
                    </button>
                    <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-[14px] font-semibold text-gray-700">
                        <Filter size={16} className="mr-2" /> Actions
                    </button>
                </div>

                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search to filter by name, ID or metrics"
                        className="w-full pl-9 pr-4 py-2 text-[14px] border-none bg-transparent focus:ring-0 placeholder-gray-400 outline-none"
                    />
                </div>

                <div className="flex items-center">
                    <button className="text-[14px] font-medium text-gray-500 hover:text-gray-700 flex items-center">
                        <Plus size={14} className="mr-1" /> See more
                    </button>
                </div>
            </div>

            {/* 2. Tabs & Date Range */}
            <div className="flex flex-col md:flex-row items-end md:items-center justify-between px-2 pt-2 border-b border-gray-200 bg-[#F0F2F5]">
                <div className="flex items-end space-x-1 pl-2">
                    <TabButton
                        label="Campaigns"
                        icon={<FolderOpen size={16} />}
                        isActive={activeTab === 'Campaigns'}
                        onClick={() => handleTabChange('Campaigns')}
                    />
                    <TabButton
                        label="Ad sets"
                        icon={<LayoutGrid size={16} />}
                        isActive={activeTab === 'Ad Sets'}
                        onClick={() => handleTabChange('Ad Sets')}
                    />
                    <TabButton
                        label="Ads"
                        icon={<FileText size={16} />}
                        isActive={activeTab === 'Ads'}
                        onClick={() => handleTabChange('Ads')}
                    />
                </div>

                <div className="mb-1 mr-2 relative">
                    <button
                        className="flex items-center bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-[13px] font-medium hover:bg-gray-50 shadow-sm min-w-[200px] justify-between"
                        onClick={() => setShowDateMenu(!showDateMenu)}
                    >
                        <div className="flex items-center">
                            <Calendar size={14} className="mr-2 text-gray-500" />
                            {dateRange === 'This month' ? 'This month: Feb 1 – Feb 28' : dateRange}
                        </div>
                        <ChevronDown size={14} className="ml-2 text-gray-500" />
                    </button>

                    {showDateMenu && (
                        <div className="absolute right-0 top-full mt-1 w-[200px] bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 text-[13px]">
                            <div className="px-3 py-1.5 text-gray-400 font-bold uppercase text-[11px]">Presets</div>
                            {['Today', 'Yesterday', 'Last 7 days', 'Last 14 days', 'This month', 'Last month', 'Lifetime'].map(range => (
                                <div
                                    key={range}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                    onClick={() => handleDateSelect(range)}
                                >
                                    {range}
                                    {dateRange === range && <CheckCircle size={14} className="text-[#1877F2]" />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 3. Action Toolbar */}
            <div className="bg-white border-b border-gray-300 p-2 flex items-center justify-between shadow-sm z-10 sticky top-0 overflow-x-auto">
                <div className="flex items-center space-x-2 shrink-0">
                    <button
                        className="bg-[#31A24C] hover:bg-[#2b8a42] text-white px-4 py-1.5 rounded-[4px] text-[14px] font-bold flex items-center transition-colors shadow-sm"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Plus size={18} className="mr-1.5 stroke-[3]" /> Create
                    </button>

                    <div className="h-6 w-px bg-gray-300 mx-1"></div>

                    <div className="flex space-x-1">
                        <ActionButton
                            icon={<Copy size={16} />}
                            label="Duplicate"
                            disabled={selectedIds.size === 0}
                            onClick={handleDuplicate}
                        />
                        <ActionButton
                            icon={<Edit3 size={16} />}
                            label="Edit"
                            disabled={selectedIds.size !== 1}
                            onClick={handleEdit}
                        />
                    </div>

                    <div className="h-6 w-px bg-gray-300 mx-1"></div>

                    <button className="px-3 py-1.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-[4px] text-[14px] font-bold flex items-center transition-colors">
                        <Layout size={16} className="mr-2" /> A/B test
                    </button>

                    <div className="flex items-center space-x-1">
                        <button className="px-2 py-1.5 text-gray-600 hover:bg-gray-100 rounded flex items-center font-semibold text-[13px]">
                            More <ChevronDown size={14} className="ml-1" />
                        </button>
                    </div>

                    <button
                        className={`p-1.5 text-gray-600 rounded hover:bg-gray-100 transition-colors ${selectedIds.size > 0 ? 'hover:text-red-600' : 'opacity-50 cursor-not-allowed'}`}
                        disabled={selectedIds.size === 0}
                        onClick={handleDeleteClick}
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                    <div className="relative">
                        <button
                            className="px-3 py-1.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-[4px] text-[13px] font-bold flex items-center"
                            onClick={() => setShowColumnMenu(!showColumnMenu)}
                        >
                            <span className="mr-2"><LayoutGrid size={14} /></span> Columns <ChevronDown size={12} className="ml-1" />
                        </button>
                        {showColumnMenu && (
                            <div className="absolute right-0 top-full mt-1 w-[220px] bg-white border border-gray-200 rounded-md shadow-lg z-50 py-2 text-[13px]">
                                <div className="px-3 py-1.5 font-bold text-gray-500 border-b border-gray-100 mb-1">Customize Columns</div>
                                {Object.keys(visibleColumns).map((key) => (
                                    <div
                                        key={key}
                                        className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer flex items-center"
                                        onClick={() => setVisibleColumns({ ...visibleColumns, [key]: !visibleColumns[key as keyof typeof visibleColumns] })}
                                    >
                                        <input type="checkbox" checked={visibleColumns[key as keyof typeof visibleColumns]} readOnly className="mr-2" />
                                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button className="px-3 py-1.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-[4px] text-[13px] font-bold flex items-center">
                        <span className="mr-2"><Layout size={14} /></span> Breakdown <ChevronDown size={12} className="ml-1" />
                    </button>

                    <div className="flex border border-gray-300 rounded-[4px] overflow-hidden">
                        <button className="p-1.5 bg-white hover:bg-gray-50 border-r border-gray-300" title="Reports"><FileText size={14} /></button>
                        <button
                            className="p-1.5 bg-white hover:bg-gray-50 border-r border-gray-300"
                            title="Export CSV"
                            onClick={handleExport}
                        >
                            <Download size={14} />
                        </button>
                        <button className="p-1.5 bg-white hover:bg-gray-50"><MoreHorizontal size={14} /></button>
                    </div>
                </div>
            </div>

            {/* 4. Table Container */}
            <div className={`flex-1 bg-white flex flex-col overflow-hidden relative ${isRefreshing ? 'opacity-50 pointer-events-none' : 'opacity-100 transition-opacity'}`}>
                <CampaignTable
                    data={filteredData}
                    activeTab={activeTab}
                    selectedIds={selectedIds}
                    visibleColumns={visibleColumns}
                    onToggleSelect={handleSelectionChange}
                    onToggleSelectAll={handleSelectAll}
                    onStatusChange={handleStatusToggle}
                    onAdClick={setSelectedAd}
                />
                {isRefreshing && (
                    <div className="absolute inset-0 flex items-center justify-center z-30">
                        <div className="w-8 h-8 border-4 border-[#1877F2] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

            <CreateModal
                isOpen={isCreateModalOpen}
                onClose={handleCloseModal}
                onCreate={handleSave}
                initialData={editData}
                context={activeTab}
            />

            <AdDetailsPanel
                isOpen={!!selectedAd}
                ad={selectedAd}
                onClose={() => setSelectedAd(null)}
            />

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-[440px] overflow-hidden animate-scale-up border border-gray-200">
                        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-[#F0F2F5]">
                            <h3 className="text-[16px] font-bold text-[#1C1E21]">Delete {selectedIds.size} {selectedIds.size === 1 ? 'item' : 'items'}?</h3>
                            <button onClick={() => setShowDeleteConfirm(false)} className="text-gray-500 hover:bg-gray-200 rounded-full p-1 transition-colors"><X size={20} /></button>
                        </div>
                        <div className="p-4 bg-white">
                            <p className="text-[14px] text-gray-700 leading-relaxed">
                                Are you sure you want to delete the selected {activeTab.toLowerCase()}? This action cannot be undone.
                            </p>
                        </div>
                        <div className="px-4 py-3 border-t border-gray-200 flex justify-end space-x-3 bg-white">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 rounded-md font-bold text-[#1C1E21] hover:bg-[#F0F2F5] text-[14px] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-6 py-2 rounded-md font-bold text-white bg-[#E60023] hover:bg-[#ad0c20] text-[14px] transition-colors shadow-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Sub-components for cleaner code
const TabButton = ({ label, icon, isActive, onClick }: any) => (
    <div
        onClick={onClick}
        className={`
            px-4 py-2 cursor-pointer flex items-center space-x-2 rounded-t-md border-t border-l border-r
            ${isActive
                ? 'bg-white border-gray-300 border-b-white text-[#1877F2]'
                : 'bg-transparent border-transparent text-[#65676B] hover:bg-gray-200/50'
            }
        `}
        style={{ marginBottom: '-1px', zIndex: isActive ? 10 : 0 }}
    >
        {icon}
        <span className={`text-[14px] font-bold ${isActive ? 'text-[#1C1E21]' : 'text-[#65676B]'}`}>{label}</span>
    </div>
);

const ActionButton = ({ icon, label, disabled, onClick }: any) => (
    <button
        className={`
            px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded-[4px] text-[14px] font-bold flex items-center transition-colors
            ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-50'}
        `}
        disabled={disabled}
        onClick={onClick}
    >
        {React.cloneElement(icon, { size: 16, className: "mr-1.5" })} {label}
    </button>
);

export default Dashboard;
