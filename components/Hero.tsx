"use client";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { imageOriginal, image500 } from '@/TMDB/config';
import { Play, Info, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  release_date?: string;
  first_air_date?: string;
}

export default function Hero({ movies }: { movies: Movie[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter valid movies
  const validMovies = movies.filter(movie => movie.poster_path && movie.backdrop_path).slice(0, 10);
  
  if (!validMovies || validMovies.length === 0) return null;

  const activeMovie = validMovies[activeIndex];

  return (
    <section className="relative h-screen min-h-[750px] w-full overflow-hidden bg-black font-sans">
      {/* Dynamic Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMovie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={imageOriginal(activeMovie.backdrop_path) || ""}
            alt={activeMovie.title || activeMovie.name || "Backdrop"}
            fill
            priority
            className="object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content & Slider Wrapper */}
      <div className="relative z-10 h-full w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col pt-32 pb-12">
        {/* Top Section: Movie Details */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <motion.div
            key={`content-${activeMovie.id}`}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <span className="bg-primary px-3 py-1 rounded-md text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
                Trending Now
              </span>
              <div className="flex items-center gap-1.5 text-yellow-500">
                <Star className="w-4 h-4 fill-yellow-500" />
                <span className="font-bold text-sm text-white">
                  {activeMovie.vote_average.toFixed(1)}
                </span>
              </div>
              <span className="text-zinc-400 text-sm font-bold tracking-widest border-l border-white/20 pl-4">
                {(activeMovie.release_date || activeMovie.first_air_date || "").split("-")[0]}
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase drop-shadow-2xl">
              {activeMovie.title || activeMovie.name}
            </h1>
            
            <p className="text-lg text-zinc-300 line-clamp-3 md:line-clamp-4 leading-relaxed max-w-xl font-medium">
              {activeMovie.overview}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={`/movie/${activeMovie.id}`}
                className="group flex items-center gap-3 bg-white text-black px-10 py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all hover:bg-primary hover:text-white transform hover:scale-105 shadow-xl"
              >
                <Play className="w-5 h-5 fill-current" />
                Watch Now
              </Link>
              <Link
                href={`/movie/${activeMovie.id}`}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all transform hover:scale-105 border border-white/10"
              >
                <Info className="w-5 h-5" />
                Details
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Side-aligned Mini Slider */}
        <div className="mt-auto flex justify-end">
          <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] group/slider">
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-50 flex items-center gap-4">
              Up Next <span className="h-px bg-white/20 flex-1" />
            </h3>
            
            <div className="relative">
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={false}
                slidesPerView={'auto'}
                spaceBetween={15}
                loop={validMovies.length > 3}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 0,
                  modifier: 1,
                  slideShadows: false,
                }}
                modules={[EffectCoverflow, Autoplay]}
                className="heroMiniSwiper !overflow-visible"
              >
                {validMovies.map((movie, index) => (
                  <SwiperSlide key={movie.id} className="!w-[110px] md:!w-[140px]">
                    <div 
                      onClick={() => setActiveIndex(index)}
                      className={`relative aspect-[2/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-500 border-2 ${
                        activeIndex === index 
                        ? 'border-primary ring-4 ring-primary/20 scale-105 shadow-2xl z-20' 
                        : 'border-white/5 opacity-40 hover:opacity-100 grayscale hover:grayscale-0 scale-100 z-10'
                      }`}
                    >
                      <Image
                        src={image500(movie.poster_path) || ""}
                        alt={movie.title || movie.name || "Poster"}
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                      {activeIndex === index && (
                        <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Shadow Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
