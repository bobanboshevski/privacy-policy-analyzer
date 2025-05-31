const TeamCard = ({
                      member,
                  }: {
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
                         className={`w-2 h-2 rounded-full bg-purple-400 ${i < 3 ? 'opacity-100' : 'opacity-30'}`}/>
                ))}
            </div>
        </div>
    </div>
);

export default TeamCard;
