"use client";
import React, {useState, useEffect} from "react";
import {FaShieldAlt, FaBrain, FaUsers, FaRocket, FaEye, FaHeart} from "react-icons/fa";

const AboutPage = () => {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
            setMousePosition({x: e.clientX, y: e.clientY});
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16 px-4 md:px-8 relative overflow-hidden rounded-2xl">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
                    style={{animationDelay: '2s'}}></div>
                <div
                    className="absolute top-40 left-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
                    style={{animationDelay: '4s'}}></div>
            </div>

            {/* Interactive Cursor Effect */}
            <div
                className="fixed w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference opacity-75"
                style={{
                    left: mousePosition.x - 8,
                    top: mousePosition.y - 8,
                    transition: 'all 0.1s ease-out'
                }}
            />

            {/* Hero Section */}
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
                    <div
                        className="w-20 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                    <div
                        className="w-20 h-1 bg-gradient-to-l from-blue-500 to-transparent rounded-full animate-pulse"></div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
                    <StatCard number="100%" label="Privacy Focused"/>
                    <StatCard number="AI" label="Powered Analysis"/>
                    <StatCard number="2025" label="Innovation"/>
                </div>
            </section>

            {/* Highlights Section */}
            <section
                className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <HighlightCard
                    icon={<FaShieldAlt className="text-emerald-400 text-6xl mb-6"/>}
                    title="Compliance First"
                    description="Automatically check for GDPR and CCPA compliance using advanced legal keyword detection and comprehensive coverage analysis."
                    gradient="from-emerald-500/20 to-green-500/20"
                    delay="0s"
                />
                <HighlightCard
                    icon={<FaBrain className="text-purple-400 text-6xl mb-6"/>}
                    title="AI-Powered Insights"
                    description="Harness cutting-edge NLP to break down policy readability, complexity, sentiment analysis, and user-focused recommendations."
                    gradient="from-purple-500/20 to-pink-500/20"
                    delay="0.2s"
                />
                <HighlightCard
                    icon={<FaUsers className="text-blue-400 text-6xl mb-6"/>}
                    title="Built by Students"
                    description="Created by passionate students dedicated to bringing privacy clarity and transparency to users and companies worldwide."
                    gradient="from-blue-500/20 to-cyan-500/20"
                    delay="0.4s"
                />
            </section>

            {/* Vision Section */}
            <section
                className={`max-w-4xl mx-auto text-center mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <VisionCard icon={<FaRocket/>} title="Innovation"
                                    description="Pushing boundaries in privacy tech"/>
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

            {/* Team Section */}
            <section
                className={`max-w-5xl mx-auto text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl font-bold text-white mb-4">Meet the Team</h2>
                <p className="text-slate-300 mb-12 text-lg max-w-2xl mx-auto">
                    A passionate team of developers, designers, and privacy advocates working to make
                    digital privacy accessible and understandable for everyone.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    {[
                        {name: "Boban Boshevski", role: "Student & Developer", color: "from-purple-500 to-blue-500"},
                        {name: "Andrej Bokonjic", role: "Student & Developer", color: "from-blue-500 to-emerald-500"}
                    ].map((member, i) => (
                        <TeamCard key={member.name} member={member}/>
                    ))}
                </div>
            </section>
        </div>
    );
};

const StatCard = ({number, label}: { number: string; label: string }) => (
    <div className="text-center">
        <div className="text-2xl font-bold text-purple-400 mb-1">{number}</div>
        <div className="text-sm text-slate-400">{label}</div>
    </div>
);

const HighlightCard = ({icon, title, description, gradient, delay}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
    delay: string
}) => (
    <div
        className={`bg-white/5 backdrop-blur-xl shadow-2xl rounded-2xl p-8 hover:bg-white/10 hover:scale-105 transition-all duration-500 border border-white/10 group relative overflow-hidden`}
        style={{animationDelay: delay}}
    >
        <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        <div className="relative z-10">
            <div className="transform group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="font-bold text-2xl mb-4 text-white">{title}</h3>
            <p className="text-slate-300 leading-relaxed">{description}</p>
        </div>
    </div>
);

const VisionCard = ({icon, title, description}: {
    icon: React.ReactNode;
    title: string;
    description: string
}) => (
    <div className="text-center group">
        <div
            className="text-3xl text-purple-400 mb-3 transform group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
    </div>
);

const TeamCard = ({member}: {
    member: { name: string; role: string; color: string };
}) => (
    <div
        className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl hover:shadow-purple-500/20 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 border border-white/10 group relative overflow-hidden">
        <div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
            <div
                className={`w-28 h-28 mx-auto rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mb-6 text-white font-bold text-3xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                {member.name[0]}
            </div>
            <h3 className="font-bold text-xl text-white mb-2">{member.name}</h3>
            <p className="text-purple-300 font-medium mb-2">{member.role}</p>
            <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                    <div key={i}
                         className={`w-2 h-2 rounded-full bg-purple-400 ${i < 3 ? 'opacity-100' : 'opacity-30'}`}></div>
                ))}
            </div>
        </div>
    </div>
);

export default AboutPage;