import { fetchPersonDetails, fetchPersonMovies, image500, fallbackPersonImage } from "@/TMDB/config";
import Image from "next/image";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";
import { User, MapPin, Calendar, Star } from "lucide-react";

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [person, movies] = await Promise.all([
    fetchPersonDetails(id),
    fetchPersonMovies(id)
  ]);

  if (!person || !person.id) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Person Not Found</h1>
          <p className="text-zinc-500">We couldn't find the requested profile.</p>
          <Link href="/" className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-hover transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const profile = image500(person.profile_path) || fallbackPersonImage;
  const sortedMovies = movies.cast?.sort((a: any, b: any) => b.vote_average - a.vote_average).slice(0, 18);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-black font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          {/* Profile Sidebar */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3">
            <div className="sticky top-32 space-y-8">
              <div className="relative aspect-[2/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 bg-zinc-900 group">
                <Image
                  src={profile}
                  alt={person.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-zinc-900/50 rounded-3xl border border-white/5 space-y-4">
                  <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] opacity-50">Personal Info</h4>
                  
                  <div className="space-y-4">
                    <InfoItem icon={<User className="w-4 h-4" />} label="Known For" value={person.known_for_department} />
                    {person.birthday && (
                      <InfoItem 
                        icon={<Calendar className="w-4 h-4" />} 
                        label="Birthday" 
                        value={`${person.birthday} ${!person.deathday ? `(Age ${new Date().getFullYear() - new Date(person.birthday).getFullYear()})` : ''}`} 
                      />
                    )}
                    {person.place_of_birth && (
                      <InfoItem icon={<MapPin className="w-4 h-4" />} label="Birthplace" value={person.place_of_birth} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="col-span-1 md:col-span-8 lg:col-span-9 space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary text-sm font-black uppercase tracking-[0.3em]">
                <div className="w-8 h-px bg-primary" />
                Celebrity Profile
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none drop-shadow-2xl">
                {person.name}
              </h1>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                <span className="w-1.5 h-8 bg-primary rounded-full" />
                Biography
              </h3>
              <p className="text-zinc-400 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                {person.biography || `${person.name} is a renowned ${person.known_for_department?.toLowerCase() || 'artist'} in the cinematic world.`}
              </p>
            </div>

            {sortedMovies && sortedMovies.length > 0 && (
              <section className="pt-12">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-10 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-primary rounded-full" />
                  Best Known For
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {sortedMovies.map((movie: any) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
        {icon}
        {label}
      </p>
      <p className="text-white text-sm font-bold">{value}</p>
    </div>
  );
}
