import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { UserCog,Fingerprint, AppWindow, Code,Database,Server, BookOpen, Globe, LayoutGrid, Banknote, FileText, ChevronDown, Monitor, RefreshCcw, Unlock, Landmark, Home,CreditCard } from 'lucide-react';
import AppLogo from './app-logo';
import { useState } from 'react';

// State untuk mengontrol dropdown "Tax"
export function AppSidebar() {
    const [isTaxOpen, setIsTaxOpen] = useState(false); //jika pake dropdown langsung di sidebarcontent 

    const mainNavItems: NavItem[] = [
        {
            title: 'Home',
            url: '/',
            icon: Home, // Menggunakan ikon globe untuk Home
        },
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Tax',
            icon: Landmark,
            children: [
                { title: 'Open RD', url: '/job/tax/openrd', icon: Unlock },
                { title: 'Refresh NPWP', url: '/job/tax/refresh-npwp', icon: RefreshCcw },
            ],
        },
        {
            title: 'AR',
            icon: CreditCard,
            children: [
                { title: 'Buka SJ / Suspend', url: '/buka-sj', icon: Unlock },
                { title: 'Buka LP', url: '/buka-lp', icon: Unlock },
                { title: 'RPS Bulanan', url: '', icon: FileText },
            ],
        },
        {
            title: 'IT',
            icon: Code,
            children: [
                { title: 'COP', url: '', icon: AppWindow },
                { title: 'IM', url: '', icon: AppWindow },
                { title: 'Database', url: '', icon: Database },
                { title: 'Authorization', url: '', icon: Fingerprint },
            ],
        },
        {
            title: 'Administrator',
            url: '',
            icon: UserCog,
        },
    ];

    const footerNavItems: NavItem[] = [
        
        {
            title: 'Website Rosebrand',
            url: 'https://rosebrand.sungaibudigroup.com/',
            icon: Globe,
        },
        {
            title: 'Webservice VPN',
            url: 'http://m-sales.sungaibudigroup.com:1026/webservice/',
            icon: Monitor,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />

                
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}




{/* Jika Tax dropdown nya sebagai content
{/* Tax (Dropdown) 
<SidebarMenu>
<SidebarMenuItem>
    <SidebarMenuButton onClick={() => setIsTaxOpen(!isTaxOpen)} className="flex justify-between">
        <span className="flex items-center gap-2">
            <Landmark size={18} /> Tax
        </span>
        <ChevronDown className={`transition-transform ${isTaxOpen ? 'rotate-180' : ''}`} />
    </SidebarMenuButton>
</SidebarMenuItem>

{isTaxOpen && (
    <div className="pl-6">
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Link href="/job/tax/openrd" className="flex gap-2">
                    <Unlock size={16} /> Open RD
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Link href="/job/tax/refresh-npwp" className="flex gap-2">
                    <RefreshCcw size={16} /> Refresh NPWP
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    </div>

)}
</SidebarMenu>
*/}