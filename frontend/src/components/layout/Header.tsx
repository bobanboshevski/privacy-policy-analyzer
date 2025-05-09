export default function Header() {
    return (
      <header className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-b-3xl border border-zinc-700/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
            Privacy Policy Analyzer
          </h1>
          <nav className="space-x-8 text-lg font-semibold text-gray-300">
            <a
              href="/"
              className="relative hover:text-indigo-400 transition duration-300"
            >
              <span className="hover-underline">Home</span>
            </a>
            <a
              href="#about"
              className="relative hover:text-indigo-400 transition duration-300"
            >
              <span className="hover-underline">About</span>
            </a>
            <a
              href="#docs"
              className="relative hover:text-indigo-400 transition duration-300"
            >
              <span className="hover-underline">Docs</span>
            </a>
            <a
              href="#profile"
              className="relative hover:text-indigo-400 transition duration-300"
            >
              <span className="hover-underline">Profile</span>
            </a>
          </nav>
        </div>
      </header>
    );
  }
  