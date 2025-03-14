import React, { useState } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    // Mock data for demonstration
    const ticketData = {
        total: 127,
        open: 42,
        pending: 23,
        resolved: 62,
        byPriority: {
            high: 15,
            medium: 27,
            low: 24
        }
    };

    const timeMetrics = {
        firstResponse: '28m',
        avgResponse: '1h 12m',
        avgResolution: '4h 35m',
        ticketLifecycle: '2.3 days'
    };

    const agentPerformance = [
        { name: 'Renaldo', resolved: 28, responseTime: '24m', satisfaction: 97 },
        { name: 'Steven', resolved: 24, responseTime: '32m', satisfaction: 92 },
        { name: 'Yonathan', resolved: 31, responseTime: '18m', satisfaction: 98 },
        { name: 'Gerald', resolved: 22, responseTime: '40m', satisfaction: 93 }
    ];

    const channelDistribution = {
        email: 45,
        chat: 32,
        phone: 28,
        social: 22
    };

    // State for active tab in agent leaderboard
    const [activeTab, setActiveTab] = useState('resolved');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard">
            <link rel="icon" type="image/png" href="/images/logo_internalsb.png" />
            </Head>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Top row - Key metrics */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Ticket Overview Card */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border bg-white dark:bg-gray-800 p-4 shadow-sm">
                        <div className="mb-2 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Ticket Overview</h2>
                            <span className="text-xs text-gray-500">Updated 5m ago</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3">
                                <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                                <div className="text-2xl font-bold">{ticketData.total}</div>
                            </div>
                            <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 p-3">
                                <div className="text-xs text-gray-500 dark:text-gray-400">Open</div>
                                <div className="text-2xl font-bold">{ticketData.open}</div>
                            </div>
                            <div className="rounded-lg bg-purple-50 dark:bg-purple-900/20 p-3">
                                <div className="text-xs text-gray-500 dark:text-gray-400">Pending</div>
                                <div className="text-2xl font-bold">{ticketData.pending}</div>
                            </div>
                            <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-3">
                                <div className="text-xs text-gray-500 dark:text-gray-400">Resolved</div>
                                <div className="text-2xl font-bold">{ticketData.resolved}</div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs text-gray-500 mb-2">By Priority:</p>
                            <div className="flex items-center gap-1">
                                <div className="h-2 bg-red-500 rounded" style={{ width: `${(ticketData.byPriority.high/ticketData.open)*100}%` }}></div>
                                <div className="h-2 bg-yellow-500 rounded" style={{ width: `${(ticketData.byPriority.medium/ticketData.open)*100}%` }}></div>
                                <div className="h-2 bg-blue-500 rounded" style={{ width: `${(ticketData.byPriority.low/ticketData.open)*100}%` }}></div>
                            </div>
                            <div className="flex text-xs mt-1 justify-between">
                                <span>High: {ticketData.byPriority.high}</span>
                                <span>Medium: {ticketData.byPriority.medium}</span>
                                <span>Low: {ticketData.byPriority.low}</span>
                            </div>
                        </div>
                    </div>

                    {/* Time-based Reports Card */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border bg-white dark:bg-gray-800 p-4 shadow-sm">
                        <div className="mb-2 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Response Time Metrics</h2>
                            <span className="text-xs text-gray-500">Today</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">First Response Time</span>
                                <span className="font-semibold text-blue-600 dark:text-blue-400">{timeMetrics.firstResponse}</span>
                            </div>
                            <div className="h-1 w-full bg-gray-100 dark:bg-gray-700 rounded">
                                <div className="h-1 bg-blue-500 rounded" style={{ width: '70%' }}></div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Avg Response Time</span>
                                <span className="font-semibold text-blue-600 dark:text-blue-400">{timeMetrics.avgResponse}</span>
                            </div>
                            <div className="h-1 w-full bg-gray-100 dark:bg-gray-700 rounded">
                                <div className="h-1 bg-blue-500 rounded" style={{ width: '65%' }}></div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Avg Resolution Time</span>
                                <span className="font-semibold text-blue-600 dark:text-blue-400">{timeMetrics.avgResolution}</span>
                            </div>
                            <div className="h-1 w-full bg-gray-100 dark:bg-gray-700 rounded">
                                <div className="h-1 bg-blue-500 rounded" style={{ width: '80%' }}></div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Ticket Lifecycle</span>
                                <span className="font-semibold text-blue-600 dark:text-blue-400">{timeMetrics.ticketLifecycle}</span>
                            </div>
                            <div className="h-1 w-full bg-gray-100 dark:bg-gray-700 rounded">
                                <div className="h-1 bg-blue-500 rounded" style={{ width: '55%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Channel Distribution Card */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border bg-white dark:bg-gray-800 p-4 shadow-sm">
                        <div className="mb-2 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Channel Distribution</h2>
                            <span className="text-xs text-gray-500">This Week</span>
                        </div>
                        <div className="mt-2 space-y-3">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Email</span>
                                    <span>{channelDistribution.email}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded">
                                    <div className="h-2 bg-blue-500 rounded" style={{ width: `${channelDistribution.email}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Live Chat</span>
                                    <span>{channelDistribution.chat}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded">
                                    <div className="h-2 bg-green-500 rounded" style={{ width: `${channelDistribution.chat}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Phone</span>
                                    <span>{channelDistribution.phone}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded">
                                    <div className="h-2 bg-purple-500 rounded" style={{ width: `${channelDistribution.phone}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Social Media</span>
                                    <span>{channelDistribution.social}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded">
                                    <div className="h-2 bg-yellow-500 rounded" style={{ width: `${channelDistribution.social}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom row - Agent Leaderboard with Gamification */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border bg-white dark:bg-gray-800 p-4 shadow-sm">
                    <div className="mb-4 flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Agent Leaderboard</h2>
                        <div className="flex space-x-2 text-sm">
                            <button 
                                className={`px-3 py-1 rounded ${activeTab === 'resolved' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}
                                onClick={() => setActiveTab('resolved')}
                            >
                                Tickets Resolved
                            </button>
                            <button 
                                className={`px-3 py-1 rounded ${activeTab === 'response' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}
                                onClick={() => setActiveTab('response')}
                            >
                                Response Time
                            </button>
                            <button 
                                className={`px-3 py-1 rounded ${activeTab === 'satisfaction' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}
                                onClick={() => setActiveTab('satisfaction')}
                            >
                                Satisfaction Score
                            </button>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Agent</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        {activeTab === 'resolved' ? 'Tickets Resolved' : activeTab === 'response' ? 'Avg Response Time' : 'Satisfaction Score'}
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Achievement</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {agentPerformance
                                    .sort((a, b) => {
                                        if (activeTab === 'resolved') return b.resolved - a.resolved;
                                        if (activeTab === 'response') {
                                            // Convert to minutes for sorting
                                            const aTime = parseInt(a.responseTime.replace('m', ''));
                                            const bTime = parseInt(b.responseTime.replace('m', ''));
                                            return aTime - bTime; // Lower is better
                                        }
                                        return b.satisfaction - a.satisfaction;
                                    })
                                    .map((agent, index) => (
                                        <tr key={agent.name}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                                                    <span className="text-sm font-medium">{index + 1}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                                        <span className="text-lg">{agent.name.charAt(0)}</span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{agent.name}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">Support Agent</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 dark:text-gray-100">
                                                    {activeTab === 'resolved' ? (
                                                        <span>{agent.resolved} tickets</span>
                                                    ) : activeTab === 'response' ? (
                                                        <span>{agent.responseTime}</span>
                                                    ) : (
                                                        <span>{agent.satisfaction}%</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {index === 0 ? (
                                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                        🏆 Top Performer
                                                    </span>
                                                ) : index === 1 ? (
                                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                        ⭐ Rising Star
                                                    </span>
                                                ) : index === 2 ? (
                                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                                                        👍 Consistent
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                        🔄 Improving
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}