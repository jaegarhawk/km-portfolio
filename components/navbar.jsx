'use client';

import { Socials } from '@/components/socials';
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation"; // 🚀 Hook used to track active link highlights

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/works", label: "Works" },
    { href: "/commercial-work", label: "Clients" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" }
];

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname(); // Reads current browser route (e.g. "/blog")

    return (
        // 💡 Thick solid bottom ink outline line locks the navbar safely above your scrolling canvas
        <header className="fixed top-0 left-0 right-0 bg-black border-b-3 border-white py-4 z-50 font-mono text-xs font-black select-none">
            <nav className="container mx-auto max-w-5xl h-full px-6 flex items-center justify-between">
                
                {/* Branding Identity Logo */}
                <a href="/" className="text-sm font-black tracking-tighter uppercase text-white hover:text-slate-300 transition-colors">
                    [ KENDAL MITCHELL ]
                </a>
            
                {/* Desktop Navigation Row */}
                <div className="hidden md:flex items-center">
                    {/* Reshaped container into a flat, connected grid system instead of a pill pill bubble */}
                    <div className="border-2 border-white bg-black p-0.5 flex items-center shadow-[3px_3px_0px_0px_#ffffff]">
                        {navLinks.map((link, index) => {
                            // Perfect route match checking
                            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                            
                            return (
                                <a 
                                    key={index} 
                                    href={link.href}
                                    className={`px-4 py-1.5 uppercase font-black transition-all tracking-tight ${
                                        isActive 
                                            ? "bg-white text-black" // 🚀 Active link completely inverses like a solid ink block
                                            : "text-white hover:bg-white hover:text-black"
                                    }`}
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                    </div>
                </div>
                
                {/* Desktop Social Channels Wrapper */}
                <div className="hidden md:block text-white">
                    <Socials />
                </div>

                {/* Mobile Hamburger Layout Action Trigger Block shadow Button */}
                <button 
                    className="md:hidden border-2 border-white bg-black text-white p-2 rounded-xs cursor-pointer shadow-[2px_2px_0px_0px_#ffffff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none" 
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                >
                    {isMobileMenuOpen ? <X size={16} className="stroke-[3]" /> : <Menu size={16} className="stroke-[3]" />}
                </button>
            </nav>

            {/* ========================================== */}
            {/* 📱 MOBILE NAVIGATION SLIDEOUT PANEL        */}
            {/* ========================================== */}
            {isMobileMenuOpen && (
                // Replaced glass blur wrappers with a high-contrast ink frame overlay block
                <div className="md:hidden border-b-3 border-white bg-black mt-4 animate-fade-in shadow-[0px_6px_0px_0px_#000000]">
                    <div className="container mx-auto px-6 py-6 flex flex-col gap-4 border-t-2 border-slate-800 border-dashed">
                        {navLinks.map((link, index) => {
                            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                            
                            return (
                                <a 
                                    key={index} 
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)} // Auto-closes frame on menu routing
                                    className={`text-sm font-black uppercase tracking-wider py-2 px-4 border-2 border-black rounded-xs transition-all ${
                                        isActive
                                            ? "bg-white text-black border-white"
                                            : "text-slate-400 hover:text-white border-transparent hover:border-white"
                                    }`}
                                >
                                    // {link.label}
                                </a>
                            );
                        })}
                        
                        {/* Mobile Socials Divider Line Area */}
                        <div className="pt-4 border-t border-slate-800 border-dashed text-white flex justify-center">
                            <Socials />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
