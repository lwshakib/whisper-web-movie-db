"use client";

import Link from "next/link";
import { Search, X, Home, TrendingUp, Film, Tv } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setSearchActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchActive(false);
    }
  };

  const toggleSearch = () => {
    if (searchActive) {
      setSearchActive(false);
    } else {
      setSearchActive(true);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const handleBlur = () => {
    // Small delay to allow clicking the clear button if needed
    setTimeout(() => {
      if (document.activeElement !== searchInputRef.current) {
        setSearchActive(false);
      }
    }, 200);
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 py-5",
        scrolled ? "bg-black/90 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="w-10 h-10 relative">
            <Image 
              src="/logo.svg" 
              alt="Whisper Logo" 
              fill 
              className="object-contain transition-transform group-hover:scale-110" 
            />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            WHISPER
          </span>
        </Link>

        {/* Navigation Links */}
        <div className={cn(
          "hidden lg:flex items-center gap-10 transition-all duration-300",
          searchActive ? "opacity-0 invisible scale-95" : "opacity-100 visible scale-100"
        )}>
          <NavLink href="/" icon={<Home className="w-4 h-4" />} label="Home" />
          <NavLink href="/trending" icon={<TrendingUp className="w-4 h-4" />} label="Trending" />
          <NavLink href="/movies" icon={<Film className="w-4 h-4" />} label="Movies" />
          <NavLink href="/tv" icon={<Tv className="w-4 h-4" />} label="TV Shows" />
        </div>

        {/* Search Section */}
        <div className="flex items-center justify-end gap-4 relative">
          <div className="flex items-center justify-end">
            <AnimatePresence>
              {searchActive && (
                <motion.form
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 320, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onSubmit={handleSearchSubmit}
                  className="relative flex items-center overflow-hidden"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={handleBlur}
                    className="w-full bg-zinc-900 border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-primary/50"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 text-zinc-500 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </motion.form>
              )}
            </AnimatePresence>

            <button
              onClick={toggleSearch}
              className={cn(
                "p-2.5 transition-all rounded-full flex items-center justify-center",
                searchActive ? "text-primary" : "text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10"
              )}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-all group"
    >
      <span className="group-hover:text-primary transition-colors">
        {icon}
      </span>
      {label}
    </Link>
  );
}
