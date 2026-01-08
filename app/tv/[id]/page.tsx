import { 
  fetchTVDetails, 
  fetchTVCredits, 
  fetchSimilarTV,
  imageOriginal,
  image500,
  fallbackMoviePoster
} from "@/TMDB/config";
import Image from "next/image";
import { Star, Calendar, Play, List, Heart, Layers } from "lucide-react";
import MovieRow from "@/components/MovieRow";
import Link from "next/link";

export default async function TVDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const [show, credits, similar] = await Promise.all([
    fetchTVDetails(id),
    fetchTVCredits(id),
    fetchSimilarTV(id)
  ]);

  // Handle missing show data
  if (!show || !show.id) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Show Not Found</h1>
          <p className="text-zinc-500">The TV show you're looking for doesn't exist or couldn't be loaded.</p>
          <Link href="/" className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-hover transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const backdrop = imageOriginal(show.backdrop_path || show.poster_path);
  const poster = image500(show.poster_path) || fallbackMoviePoster;
  const title = show.name || "Untitled Show";
  const rating = show.vote_average?.toFixed(1) || "N/A";
  const year = (show.first_air_date || "").split("-")[0] || "TBA";
  const seasons = show.number_of_seasons 
    ? `${show.number_of_seasons} Season${show.number_of_seasons > 1 ? 's' : ''}` 
    : "Unknown";

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Backdrop */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {backdrop ? (
          <Image
            src={backdrop}
            alt={`${title} backdrop`}
            fill
            priority
            className="object-cover opacity-60"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 flex items-end px-6 md:px-12 pb-20">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            {/* Poster */}
            <div className="hidden md:block col-span-3">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 group">
                <Image
                  src={poster}
                  alt={`${title} poster`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="col-span-1 md:col-span-9 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                {show.genres?.map((genre: any) => (
                  <span key={genre.id} className="glass px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                    {genre.name}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-zinc-300 font-medium">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-white font-bold">{rating}</span>
                  <span className="text-zinc-500 text-sm">Rating</span>
                </div>
                <div className="flex items-center gap-2 border-l border-white/20 pl-6">
                  <Layers className="w-5 h-5 text-primary" />
                  <span>{seasons}</span>
                </div>
                <div className="flex items-center gap-2 border-l border-white/20 pl-6">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{year}</span>
                </div>
              </div>

              <p className="max-w-2xl text-lg text-zinc-400 leading-relaxed md:line-clamp-3">
                {show.overview || "No overview available."}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button className="flex items-center gap-3 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-primary/30">
                  <Play className="w-6 h-6 fill-white" />
                  Watch Now
                </button>
                <div className="flex items-center gap-3">
                  <div className="glass p-4 rounded-2xl hover:bg-white/10 cursor-pointer">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div className="glass p-4 rounded-2xl hover:bg-white/10 cursor-pointer">
                    <List className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-7xl mx-auto py-20 divide-y divide-white/5">
        {credits?.cast && credits.cast.length > 0 && (
          <section className="px-6 md:px-12 py-12">
            <h2 className="text-white text-2xl font-bold mb-8">Cast</h2>
            <div className="flex gap-6 overflow-x-auto pb-8 gradient-mask no-scrollbar">
              {credits.cast.slice(0, 10).map((person: any) => (
                <Link href={`/person/${person.id}`} key={person.id} className="flex-shrink-0 w-32 md:w-40 text-center space-y-3 group">
                  <div className="relative aspect-square rounded-full overflow-hidden border-2 border-white/5 group-hover:border-primary">
                    {person.profile_path ? (
                      <Image
                        src={image500(person.profile_path)!}
                        alt={person.name || "Cast member"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-2xl font-bold">
                        {person.name?.charAt(0) || "?"}
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-primary">{person.name}</h4>
                  <p className="text-xs text-zinc-500">{person.character}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {similar?.results && similar.results.length > 0 && (
          <section className="py-12">
            <MovieRow title="Similar Shows" type="tv" movies={similar.results} />
          </section>
        )}
      </div>
    </div>
  );
}
