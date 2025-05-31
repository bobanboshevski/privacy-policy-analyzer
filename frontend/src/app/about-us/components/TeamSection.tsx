import React from "react";
import TeamCard from "@/app/about-us/components/TeamCard";

const TeamSection = ({isVisible}: { isVisible: boolean }) => {
    const teamMembers = [
        {name: "Boban Boshevski", role: "Student & Developer", color: "from-purple-500 to-blue-500"},
        {name: "Andrej Bokonjic", role: "Student & Developer", color: "from-blue-500 to-emerald-500"}
    ];

    return (
        <section
            className={`max-w-5xl mx-auto text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-white mb-4">Meet the Team</h2>
            <p className="text-slate-300 mb-12 text-lg max-w-2xl mx-auto">
                A passionate team of developers, designers, and privacy advocates working to make
                digital privacy accessible and understandable for everyone.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {teamMembers.map((member) => (
                    <TeamCard key={member.name} member={member}/>
                ))}
            </div>
        </section>
    );
};

export default TeamSection;