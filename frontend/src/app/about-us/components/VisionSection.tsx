import React from "react";
import {FaRocket, FaEye, FaHeart} from "react-icons/fa";
import VisionCard from "@/app/about-us/components/VisionCard";

const VisionSection = ({isVisible}: { isVisible: boolean }) => (
    <section
        className={`max-w-4xl mx-auto text-center mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <VisionCard icon={<FaRocket/>} title="Innovation" description="Pushing boundaries in privacy tech"/>
                <VisionCard icon={<FaEye/>} title="Transparency" description="Making the complex simple"/>
                <VisionCard icon={<FaHeart/>} title="Impact" description="Privacy rights for everyone"/>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
                We envision a digital world where privacy policies are no longer obstacles but clear,
                accessible guides that empower users to make informed decisions about their data.
            </p>
        </div>
    </section>
);

export default VisionSection;