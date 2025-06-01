"use client";
import Link from "next/link";
import {useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {Menu, X} from "lucide-react"; // Install lucide-react if not already

export default function Header() {
    const {user, logout} = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header
            className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-b-3xl border border-zinc-700/60 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
                    Privacy Policy Analyzer
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex space-x-8 text-lg font-semibold text-gray-300">
                    <Link href="/" className="hover:text-indigo-400 cursor-pointer">Home</Link>
                    {user && (
                        <div className="relative group">
                            <button
                                className="inline-flex items-center gap-1 text-gray-300 hover:text-indigo-400 transition
                                duration-150 ease-in-out">
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
                                      className="px-5 py-2 text-gray-300 hover:bg-zinc-700 hover:text-white transition-colors
                                      duration-150">
                                    GDPR
                                </Link>
                                <Link href="/ccpa"
                                      className="px-5 py-2 text-gray-300 hover:bg-zinc-700 hover:text-white transition-colors
                                       duration-150">
                                    CCPA
                                </Link>
                            </div>
                        </div>

                    )}
                    {user && <Link href="/rankings" className="hover:text-indigo-400 cursor-pointer">Rankings</Link>}
                    {user && <Link href="/education" className="hover:text-indigo-400 cursor-pointer">Education</Link>}
                    <Link href="/about-us" className="hover:text-indigo-400 cursor-pointer">About us</Link>
                    {user && (
                        <button onClick={logout} className="hover:text-red-40=0 ml-4 cursor-pointer">
                            Logout
                        </button>
                    )}
                    {!user && (
                        <Link href="/auth" className="hover:text-green-400 cursor-pointer">
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
                <nav className="flex flex-col mt-4 space-y-4 text-lg font-semibold text-gray-300 lg:hidden">
                    <Link href="/" className="hover:text-indigo-400 cursor-pointer"
                          onClick={() => setMenuOpen(false)}>Home</Link>
                    {user && <Link href="/gdpr" className="hover:text-indigo-400 cursor-pointer"
                                   onClick={() => setMenuOpen(false)}>GDPR</Link>}
                    {user && <Link href="/ccpa" className="hover:text-indigo-400 cursor-pointer">CCPA</Link>}
                    {user && <Link href="/rankings" className="hover:text-indigo-400 cursor-pointer">Rankings</Link>}
                    {user && <Link href="/education" className="hover:text-indigo-400 cursor-pointer"
                                   onClick={() => setMenuOpen(false)}>Education</Link>}
                    <Link href="/about-us" className="hover:text-indigo-400 cursor-pointer"
                          onClick={() => setMenuOpen(false)}>About us</Link>
                    {user && (
                        <button onClick={() => {
                            logout();
                            setMenuOpen(false);
                        }} className="hover:text-red-400 cursor-pointer">
                            Logout
                        </button>
                    )}
                    {!user && (
                        <Link href="/auth" className="hover:text-green-400 cursor-pointer"
                              onClick={() => setMenuOpen(false)}>
                            Login
                        </Link>
                    )}
                </nav>
            )}
        </header>
    );
}