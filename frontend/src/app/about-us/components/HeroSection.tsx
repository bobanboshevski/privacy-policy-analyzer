import React from "react";
import StatCard from "@/app/about-us/components/StatCard";

const HeroSection = ({isVisible}: { isVisible: boolean }) => (
    <section
        className={`text-center max-w-5xl mx-auto mb-20 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative pb-8">
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-10 leading-relaxed">
                Empowering Privacy
                <span className="block text-5xl md:text-6xl mt-4 pb-4">with Intelligence</span>
            </h1>

            {/* Glowing accent */}
            <div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-sm opacity-60"></div>
        </div>

        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Our mission is to make privacy policies transparent, understandable, and compliant using
            <span className="text-purple-400 font-semibold"> smart technology</span>.
        </p>

        <div className="flex justify-center items-center gap-4 mb-8">
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-20 h-1 bg-gradient-to-l from-blue-500 to-transparent rounded-full animate-pulse"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <StatCard number="100%" label="Privacy Focused"/>
            <StatCard number="AI" label="Powered Analysis"/>
            <StatCard number="2024" label="Innovation"/>
        </div>
    </section>
);

export default HeroSection;