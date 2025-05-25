"use client";
import Link from "next/link";
import {useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {Menu, X} from "lucide-react"; // Install lucide-react if not already

export default function Header() {
    const {user, logout} = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-b-3xl border border-zinc-700/60 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
                    Privacy Policy Analyzer
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8 text-lg font-semibold text-gray-300">
                    <Link href="/" className="hover:text-indigo-400 cursor-pointer">Home</Link>
                    <Link href="#about" className="hover:text-indigo-400 cursor-pointer">About</Link>
                    <Link href="#docs" className="hover:text-indigo-400 cursor-pointer">Docs</Link>
                    {user && <Link href="/training" className="hover:text-indigo-400 cursor-pointer">Training</Link>}
                    {user && (
                        <button onClick={logout} className="hover:text-red-400 ml-4 cursor-pointer">
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
                <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
                    {menuOpen ? <X size={28}/> : <Menu size={28}/>}
                </button>
            </div>

            {/* Mobile Nav Dropdown */}
            {menuOpen && (
                <nav className="flex flex-col mt-4 space-y-4 text-lg font-semibold text-gray-300 md:hidden">
                    <Link href="/" className="hover:text-indigo-400 cursor-pointer" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link href="#about" className="hover:text-indigo-400 cursor-pointer" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link href="#docs" className="hover:text-indigo-400 cursor-pointer" onClick={() => setMenuOpen(false)}>Docs</Link>
                    {user && <Link href="/training" className="hover:text-indigo-400 cursor-pointer" onClick={() => setMenuOpen(false)}>Training</Link>}
                    {user && (
                        <button onClick={() => { logout(); setMenuOpen(false); }} className="hover:text-red-400 cursor-pointer">
                            Logout
                        </button>
                    )}
                    {!user && (
                        <Link href="/auth" className="hover:text-green-400 cursor-pointer" onClick={() => setMenuOpen(false)}>
                            Login
                        </Link>
                    )}
                </nav>
            )}
        </header>
    );
}