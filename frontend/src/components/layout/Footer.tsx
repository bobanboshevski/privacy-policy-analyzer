export default function Footer() {
    return (
      <footer className="bg-zinc-900 text-gray-400 text-center py-6 mt-12 border-t border-zinc-700/60">
        <div className="max-w-7xl mx-auto">
          &copy; {new Date().getFullYear()} Privacy Policy Analyzer. All rights reserved.
        </div>
      </footer>
    );
  }
  