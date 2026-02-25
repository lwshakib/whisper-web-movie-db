import { Github, Twitter, Instagram, Youtube, Mail, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/5 bg-zinc-950/20 pt-20 pb-10 px-6 md:px-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 relative">
                <Image src="/logo.svg" alt="Whisper Logo" fill className="object-contain" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white">WHISPER</span>
            </Link>
            <p className="text-zinc-500 max-w-sm text-lg leading-relaxed font-medium">
              The world&apos;s most popular and authoritative source for movie, TV and celebrity
              content. Explore cinematic excellence with Whisper.
            </p>
            <div className="flex items-center gap-5">
              <SocialIcon icon={<Twitter className="w-5 h-5" />} href="#" />
              <SocialIcon icon={<Instagram className="w-5 h-5" />} href="#" />
              <SocialIcon icon={<Youtube className="w-5 h-5" />} href="#" />
              <SocialIcon icon={<Github className="w-5 h-5" />} href="#" />
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs">Navigation</h4>
            <ul className="space-y-4">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/trending" label="Trending" />
              <FooterLink href="/movies" label="Movies" />
              <FooterLink href="/tv" label="TV Shows" />
              <FooterLink href="/search" label="Search" />
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs">Categories</h4>
            <ul className="space-y-4">
              <FooterLink href="/top-rated" label="Top Rated" />
              <FooterLink href="/upcoming" label="Upcoming" />
              <FooterLink href="#" label="Action" />
              <FooterLink href="#" label="Comedy" />
              <FooterLink href="#" label="Drama" />
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-zinc-500 text-sm font-medium">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@whisper.cinema</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-500 text-sm font-medium">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Hollywood, Los Angeles, CA</span>
              </li>
              <li className="flex items-center gap-3 border border-white/5 bg-white/5 rounded-xl p-4 mt-6">
                <div>
                  <p className="text-white text-xs font-bold uppercase tracking-wider mb-1">
                    Newsletter
                  </p>
                  <p className="text-zinc-500 text-[10px] leading-tight">
                    Get the latest movie updates directly in your inbox.
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 ml-auto" />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.35em]">
            &copy; {new Date().getFullYear()} WHISPER CINÉMA. POWERED BY TMDB.
          </div>
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-zinc-500 hover:text-white transition-all text-sm font-bold flex items-center group gap-2"
      >
        <span className="w-1.5 h-1.5 bg-primary rounded-full scale-0 group-hover:scale-100 transition-transform" />
        {label}
      </Link>
    </li>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-white transition-all transform hover:scale-110 active:scale-95 border border-white/5 shadow-lg"
    >
      {icon}
    </Link>
  );
}
