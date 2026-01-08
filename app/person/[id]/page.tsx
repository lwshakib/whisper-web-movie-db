import { fetchPersonDetails, fetchPersonMovies, image500, fallbackPersonImage } from "@/TMDB/config";
import Image from "next/image";
import MovieCard from "@/components/MovieCard";

export default async function PersonPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [person, movies] = await Promise.all([
    fetchPersonDetails(id),
    fetchPersonMovies(id)
  ]);

  const profile = image500(person.profile_path) || fallbackPersonImage;
  const sortedMovies = movies.cast?.sort((a: any, b: any) => b.vote_average - a.vote_average).slice(0, 12);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1">
            <div className="relative aspect-square md:aspect-[2/3] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
              <Image
                src={profile}
                alt={person.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-3 space-y-8">
            <div>
              <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">
                {person.name}
              </h1>
              <p className="text-primary font-bold mt-2">{person.known_for_department}</p>
            </div>

            <div className="flex flex-wrap gap-8 text-sm uppercase tracking-widest font-bold text-zinc-500">
              <div>
                <p className="text-white mb-1">Born</p>
                <p>{person.birthday} {!person.deathday && `(Age ${new Date().getFullYear() - new Date(person.birthday).getFullYear()})`}</p>
              </div>
              <div>
                <p className="text-white mb-1">Place of Birth</p>
                <p>{person.place_of_birth}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Biography</h3>
              <p className="text-zinc-400 leading-relaxed text-lg whitespace-pre-wrap">
                {person.biography || "No biography available."}
              </p>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
             <span className="w-1.5 h-6 bg-primary rounded-full" />
             Best Known For
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {sortedMovies?.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

