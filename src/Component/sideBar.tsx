import { Home, Search, Film, Tv, Play } from 'lucide-react';

export default function SideBar(){
 return (
    <aside className="fixed bottom-0 left-0 w-full h-16 bg-black/90 backdrop-blur-md border-t border-white/10 flex flex-row items-center justify-around px-4 z-50 
                       md:top-0 md:left-0 md:h-screen md:w-20 md:flex-col md:border-t-0 md:border-r md:py-8">
      
      {/* Logo - Hidden on mobile */}
      <div className="hidden md:block text-red-600 mb-12">
        <Play size={32} fill="currentColor" />
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-row md:flex-col gap-4 sm:gap-8 justify-around w-full md:w-auto items-center">
        <button className="text-gray-400 hover:text-white p-2">
          <Search size={24} />
        </button>
        <button className="text-white bg-red-600/20 md:bg-white/10 p-2 sm:p-3 rounded-xl border border-red-500/50 md:border-white/20">
          <Home size={24} />
        </button>
        <button className="text-gray-400 hover:text-white p-2">
          <Film size={24} />
        </button>
        <button className="text-gray-400 hover:text-white p-2">
          <Tv size={24} />
        </button>
      </nav>
    </aside>
  );
};