import React, { useState } from 'react';
import Sidebar from './components/simulator/Sidebar';
import Dashboard from './components/simulator/Dashboard';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MetaAdsManagerPage = () => {
    const [activeTool, setActiveTool] = useState('Campaigns');

    return (
        // Enforcing LTR direction for the Simulator regardless of the app's language.
        // If you want to support RTL in the future, remove the dir="ltr" attribute below.
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900" dir="ltr">
            <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />

            <div className="flex-1 ml-[60px] flex flex-col min-w-0">
                <main className="flex-1 overflow-hidden h-screen relative">
                    {activeTool === 'Campaigns' ? (
                        <Dashboard />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-md">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Simulated Page</h2>
                                <p className="text-gray-600 mb-6">The <strong>{activeTool}</strong> tool is not fully implemented in this simulator demo. Please return to the Campaigns tab to explore the core functionality.</p>
                                <button
                                    onClick={() => setActiveTool('Campaigns')}
                                    className="px-6 py-2 bg-[#1877F2] text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
                                >
                                    Go to Campaigns
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MetaAdsManagerPage;
