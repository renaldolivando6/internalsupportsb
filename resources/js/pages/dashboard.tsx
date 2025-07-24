import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/internalsupportsb/public/dashboard',
    },
];

export default function Dashboard() {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    const currentDate = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard">
                <link rel="icon" type="image/png" href="/internalsupportsb/public/images/logo_internalsb.png" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
                {/* Subtle background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-40 w-96 h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 container mx-auto px-6 py-8">
                    
                    {/* Welcome Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl mb-6 shadow-xl">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
                            Internal Support Dashboard
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                            Welcome to the internal support system. Manage operations, monitor performance, and streamline workflows with elegant simplicity.
                        </p>
                    </div>

                    {/* Time & Date Display */}
                    <div className="mb-12">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl text-center max-w-2xl mx-auto">
                            <div className="text-6xl font-light text-gray-900 mb-2 tracking-tight">
                                {currentTime}
                            </div>
                            <div className="text-gray-600 text-lg font-light">
                                {currentDate}
                            </div>
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        
                        {/* System Status */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-2xl mb-4">
                                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">System Status</h3>
                                <p className="text-gray-600 text-sm">All systems operational</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Database</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm text-gray-600">Online</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">API Services</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm text-gray-600">Active</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">File Storage</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm text-gray-600">Ready</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Access */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-2xl mb-4">
                                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Quick Actions</h3>
                                <p className="text-gray-600 text-sm">Essential operations</p>
                            </div>
                            <div className="space-y-3">
                                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 transform hover:scale-[1.02]">
                                    <div className="font-medium text-gray-900">Process Documents</div>
                                    <div className="text-sm text-gray-600">Manage and process files</div>
                                </button>
                                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 transform hover:scale-[1.02]">
                                    <div className="font-medium text-gray-900">User Management</div>
                                    <div className="text-sm text-gray-600">Manage system access</div>
                                </button>
                                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 transform hover:scale-[1.02]">
                                    <div className="font-medium text-gray-900">System Reports</div>
                                    <div className="text-sm text-gray-600">Generate analytics</div>
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-2xl mb-4">
                                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Activity Feed</h3>
                                <p className="text-gray-600 text-sm">Recent system events</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                                    <div>
                                        <div className="text-sm text-gray-900">System backup completed</div>
                                        <div className="text-xs text-gray-500">2 minutes ago</div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                                    <div>
                                        <div className="text-sm text-gray-900">Database optimization finished</div>
                                        <div className="text-xs text-gray-500">15 minutes ago</div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                                    <div>
                                        <div className="text-sm text-gray-900">Security scan completed</div>
                                        <div className="text-xs text-gray-500">1 hour ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Panel */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Performance Overview */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-medium text-gray-900 mb-2">Performance</h3>
                                <p className="text-gray-600">System efficiency metrics</p>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-700">CPU Usage</span>
                                        <span className="text-gray-600">23%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-gray-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-700">Memory</span>
                                        <span className="text-gray-600">45%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-gray-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-700">Storage</span>
                                        <span className="text-gray-600">67%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-gray-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* System Information */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-medium text-gray-900 mb-2">System Info</h3>
                                <p className="text-gray-600">Environment details</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="text-gray-700">Version</span>
                                    <span className="text-gray-900 font-medium">2.1.4</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="text-gray-700">Environment</span>
                                    <span className="text-gray-900 font-medium">Production</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="text-gray-700">Last Update</span>
                                    <span className="text-gray-900 font-medium">Today</span>
                                </div>
                                <div className="flex justify-between items-center py-3">
                                    <span className="text-gray-700">Uptime</span>
                                    <span className="text-gray-900 font-medium">99.9%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Message */}
                    <div className="text-center mt-16">
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg max-w-4xl mx-auto">
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Designed for efficiency. Built for reliability. Crafted for professionals who value simplicity and performance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                    .animation-delay-2000 {
                        animation-delay: 2s;
                    }
                    .animation-delay-4000 {
                        animation-delay: 4s;
                    }
                `
            }} />
        </AppLayout>
    );
}