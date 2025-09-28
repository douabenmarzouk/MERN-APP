import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 shadow-lg border-b-4 border-green-400">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl animate-bounce">📝</div>
            <h1 className="text-3xl font-bold text-white font-mono tracking-tight drop-shadow-md hover:scale-105 transition-transform duration-200">
              NotesMe
            </h1>
            <div className="text-2xl">✨</div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-white/90 text-sm font-medium">
              <span className="text-lg">💡</span>
              <span>Capture your ideas!</span>
            </div>
            
            <Link 
              to={"/create"} 
              className="btn bg-white text-green-600 border-white hover:bg-green-50 hover:text-green-700 hover:border-green-200 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 font-semibold"
            >
              <PlusIcon className="size-5" />
              <span className="flex items-center gap-1">
                New Note 
                <span className="text-lg">🚀</span>
              </span>
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-green-300 to-blue-400 opacity-60"></div>
        
        {/* Floating emojis for extra attraction */}
        <div className="absolute top-2 right-20 text-2xl animate-pulse opacity-70">🌟</div>
        <div className="absolute top-6 left-32 text-xl animate-bounce opacity-60" style={{animationDelay: '0.5s'}}>💚</div>
        <div className="absolute top-3 right-52 text-lg animate-pulse opacity-50" style={{animationDelay: '1s'}}>✨</div>
      </div>
    </header>
  );
};

export default Navbar;