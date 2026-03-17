import  { useState, useEffect } from "react";
import axios from "axios";
import { Play } from "lucide-react";

export default function HomeBanner() {
  const [movies, setMovies] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const API_KEY = "a189e8cf6bbef5b777e34a66fc3cd75b";
  // جلب الأفلام من TMDB
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const moviesWithImages = res.data.results.filter(
          (movie: any) => movie.backdrop_path
        );
        setMovies(moviesWithImages);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, []);
  // تغيير الصورة كل 5 ثواني
  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  return (
    <div className="relative w-full h-[60vh] lg:h-[110vh] overflow-hidden ">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000`}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: index === current ? 1 : 0,
          }}
        >
          {/* Overlay داكن لتوضيح النص */}
  {/* Content Section */}
      <div className="relative z-30 pt-32 sm:pt-40 md:pt-48 px-4 sm:px-6 md:pl-16 max-w-full md:max-w-4xl">
        {/* Trending Tag */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className="bg-red-600 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <span className="animate-pulse">●</span> TRENDING
          </span>
          <span className="text-gray-400 tracking-widest text-[10px] sm:text-xs font-bold">MOVIE</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-3 sm:mb-4 tracking-tight italic text-white">
          {movie.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
          <span className="text-yellow-500 font-bold flex items-center gap-1">
            ★ {movie.vote_average?.toFixed(1)} <span className="text-gray-500 font-normal text-[10px] sm:text-xs">({movie.vote_count})</span>
          </span>
          <span className="text-gray-400">{movie.release_date?.split("-")[0]}</span>

        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-full md:max-w-md line-clamp-3 md:line-clamp-none">
          {movie.overview}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-10">
          <button className="bg-red-600 hover:bg-red-700 w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold flex items-center justify-center gap-2 transition-all text-sm sm:text-base">
            <Play size={20} fill="white" /> Play Now
          </button>
          <button className="bg-white/10 hover:bg-white/20 w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold flex items-center justify-center gap-2 backdrop-blur-md border border-white/10 transition-all text-sm sm:text-base">
            <div className="border border-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-serif italic">i</div>
            More Info
          </button>
        </div>
      </div>
  </div>  
      ))}
    </div>
  );
}