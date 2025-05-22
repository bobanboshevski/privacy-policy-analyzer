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

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <AuthProvider>
            <div className="grid bg-gradient-to-br from-black via-gray-900 to-black text-white">
                <Header/>
                <main
                    className="flex flex-col gap-4 items-center justify-items-center min-h-screen mt-12">{children}</main>
                <Footer/>
            </div>
        </AuthProvider>
        </body>
        </html>
    );
}
