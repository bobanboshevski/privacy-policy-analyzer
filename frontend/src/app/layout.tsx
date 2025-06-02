import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {AuthProvider} from "@/context/AuthContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Privacy Policy Analyzer",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
            <div className="grid bg-gradient-to-br from-black via-gray-900 to-black text-white">
                <Header/>
                <main
                    className="w-full flex flex-col px-2 sm:px-4 lg:px-8 items-center min-h-screen justify-items-center">{children}</main>
                <Footer/>
            </div>
        </AuthProvider>
        </body>
        </html>
    );
}
