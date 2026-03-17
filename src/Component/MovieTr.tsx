import  { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  movieId: number;
}

export default function MovieTrailer({ movieId }: Props) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "a189e8cf6bbef5b777e34a66fc3cd75b";

  useEffect(() => {
    const fetchTrailer = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
        );
        const trailer = res.data.results.find(
          (v: any) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error("Failed to fetch trailer:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId]);

  if (loading) return <p className="text-white">Loading trailer...</p>;

  if (!trailerKey) return <p className="text-white">No trailer available.</p>;

  return (
    <div className="w-full h-64 md:h-96 mt-4">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title="Movie Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}