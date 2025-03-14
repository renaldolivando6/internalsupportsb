import { useState, useEffect } from 'react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    
    // 🔥 Ambil state dropdown dari sessionStorage (jika ada)
    const getInitialState = () => {
        if (typeof window !== 'undefined') {
            const storedState = sessionStorage.getItem('openDropdowns');
            return storedState ? JSON.parse(storedState) : {};
        }
        return {};
    };

    const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(getInitialState);

    // 🔥 Toggle dropdown dan simpan ke sessionStorage, agar tidak auto collapsee
    const toggleDropdown = (title: string) => {
        setOpenDropdowns((prev) => {
            const newState = { ...prev, [title]: !prev[title] };
            sessionStorage.setItem('openDropdowns', JSON.stringify(newState));
            return newState;
        });
    };

    // 🔥 Saat halaman berubah, ambil state dari sessionStorage agar dropdown tetap terbuka
    useEffect(() => {
        const storedState = sessionStorage.getItem('openDropdowns');
        if (storedState) {
            setOpenDropdowns(JSON.parse(storedState));
        }
    }, [page.url]);

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
                    const isOpen = openDropdowns[item.title] || false;

                    return (
                        <div key={item.title}>
                            <SidebarMenuItem>
                                {hasChildren ? (
                                    <SidebarMenuButton
                                        onClick={() => toggleDropdown(item.title)}
                                        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium"
                                    >
                                        <span className="flex items-center gap-2">
                                            {item.icon && <item.icon size={16} className="text-gray-700" />}
                                            <span className="text-gray-800">{item.title}</span>
                                        </span>
                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                        />
                                    </SidebarMenuButton>
                                ) : (
                                    <SidebarMenuButton asChild isActive={item.url === page.url}>
                                        <Link
                                            href={item.url ?? '#'}
                                            prefetch
                                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium"
                                        >
                                            {item.icon && <item.icon size={16} className="text-gray-700" />}
                                            <span className="text-gray-800">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                )}
                            </SidebarMenuItem>

                            {hasChildren && isOpen && (
                                <div className="ml-6 border-l border-gray-300 pl-3">
                                    {item.children!.map((child) => (
                                        <SidebarMenuItem key={child.title}>
                                            <SidebarMenuButton asChild>
                                                <Link
                                                    href={child.url ?? '#'}
                                                    className="flex items-center gap-2 text-sm"
                                                >
                                                    {child.icon && <child.icon size={14} className="text-gray-600" />}
                                                    <span className="text-gray-700">{child.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}










/*  change 2

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    {item.url ? (
                        <SidebarMenuButton asChild isActive={item.url === page.url}>
                            <Link href={item.url} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    ) : (
                        <SidebarMenuButton>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </SidebarMenuButton>
                    )}
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
*/













/* change 1 */
/*<SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.url === page.url}>
                            <Link href={item.url ?? "#"} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    */
