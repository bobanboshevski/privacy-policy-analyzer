"use client";
import Link from "next/link";
import {useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {usePathname} from "next/navigation";
import {Menu, X} from "lucide-react";

export default function Header() {
    const {user, logout} = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    // Helper function to check if a link is active
    const isActive = (path: string): boolean => pathname === path;

    // Helper function to get link classes with active state
    const getLinkClasses = (path: string): string => {
        const baseClasses = "cursor-pointer transition-colors duration-150";
        const activeClasses = "text-indigo-400 border-b-2 border-indigo-400 pb-1";
        const inactiveClasses = "text-gray-300 hover:text-indigo-400";
        
        return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
    };

    // Helper function for mobile link classes
    const getMobileLinkClasses = (path: string): string => {
        const baseClasses = "cursor-pointer transition-colors duration-150";
        const activeClasses = "text-indigo-400 font-bold";
        const inactiveClasses = "text-gray-300 hover:text-indigo-400";
        
        return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
    };

    return (
        <header
            className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-b-3xl border border-zinc-700/60 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
                    Privacy Policy Analyzer
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex space-x-8 text-lg font-semibold">
                    <Link href="/" className={getLinkClasses("/")}>Home</Link>
                    {user && (
                        <div className="relative group">
                            <button
                                className={`inline-flex items-center gap-1 transition duration-150 ease-in-out cursor-pointer ${
                                    (isActive("/gdpr") || isActive("/ccpa")) 
                                        ? "text-indigo-400 border-b-2 border-indigo-400 pb-1" 
                                        : "text-gray-300 hover:text-indigo-400"
                                }`}>
                                Policies
                                <svg
                                    className="w-4 h-4 transition-transform duration-200 transform group-hover:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>
                            <div className="absolute left-0 mt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100
                            transition-all duration-200 flex flex-col bg-zinc-800 border border-zinc-600 text-sm rounded-xl
                            shadow-xl py-2 w-32 z-50">
                                <Link href="/gdpr"
                                      className={`px-5 py-2 transition-colors duration-150 ${
                                          isActive("/gdpr") 
                                              ? "bg-zinc-700 text-indigo-400 font-semibold" 
                                              : "text-gray-300 hover:bg-zinc-700 hover:text-white"
                                      }`}>
                                    GDPR
                                </Link>
                                <Link href="/ccpa"
                                      className={`px-5 py-2 transition-colors duration-150 ${
                                          isActive("/ccpa") 
                                              ? "bg-zinc-700 text-indigo-400 font-semibold" 
                                              : "text-gray-300 hover:bg-zinc-700 hover:text-white"
                                      }`}>
                                    CCPA
                                </Link>
                            </div>
                        </div>
                    )}
                    {user && <Link href="/rankings" className={getLinkClasses("/rankings")}>Rankings</Link>}
                    {user && <Link href="/education" className={getLinkClasses("/education")}>Education</Link>}
                    <Link href="/about-us" className={getLinkClasses("/about-us")}>About us</Link>
                    {user && (
                        <button onClick={logout} className="hover:text-red-400 ml-4 cursor-pointer text-gray-300">
                            Logout
                        </button>
                    )}
                    {!user && (
                        <Link href="/auth" className={getLinkClasses("/auth")}>
                            Login
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white">
                    {menuOpen ? <X size={28}/> : <Menu size={28}/>}
                </button>
            </div>

            {/* Mobile Nav Dropdown */}
            {menuOpen && (
                <nav className="flex flex-col mt-4 space-y-4 text-lg font-semibold lg:hidden">
                    <Link href="/" className={getMobileLinkClasses("/")}
                          onClick={() => setMenuOpen(false)}>Home</Link>
                    {user && <Link href="/gdpr" className={getMobileLinkClasses("/gdpr")}
                                   onClick={() => setMenuOpen(false)}>GDPR</Link>}
                    {user && <Link href="/ccpa" className={getMobileLinkClasses("/ccpa")}
                                   onClick={() => setMenuOpen(false)}>CCPA</Link>}
                    {user && <Link href="/rankings" className={getMobileLinkClasses("/rankings")}
                                   onClick={() => setMenuOpen(false)}>Rankings</Link>}
                    {user && <Link href="/education" className={getMobileLinkClasses("/education")}
                                   onClick={() => setMenuOpen(false)}>Education</Link>}
                    <Link href="/about-us" className={getMobileLinkClasses("/about-us")}
                          onClick={() => setMenuOpen(false)}>About us</Link>
                    {user && (
                        <button onClick={() => {
                            logout();
                            setMenuOpen(false);
                        }} className="hover:text-red-400 cursor-pointer text-gray-300 text-left">
                            Logout
                        </button>
                    )}
                    {!user && (
                        <Link href="/auth" className={getMobileLinkClasses("/auth")}
                              onClick={() => setMenuOpen(false)}>
                            Login
                        </Link>
                    )}
                </nav>
            )}
        </header>
    );
}