import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "../components/ProductCard";
import { BRANDS, CATEGORIES, HERO_SLIDES, PRODUCTS } from "../data/mockData";

function useCountdown(target: Date) {
  const calc = useCallback(() => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  }, [target]);
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);
  return time;
}

export function HomePage() {
  const [slide, setSlide] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const id = setInterval(
      () => setSlide((s) => (s + 1) % HERO_SLIDES.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  const dealDeadline = new Date(Date.now() + 8 * 3600000 + 23 * 60000 + 45000);
  const countdown = useCountdown(dealDeadline);

  const trending = PRODUCTS.filter((p) => p.isTrending).slice(0, 8);
  const featured = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
  const deals = PRODUCTS.filter((p) => p.originalPrice > p.price).slice(0, 4);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("🎉 Subscribed! Get ready for exclusive deals.");
      setEmail("");
    }
  };

  return (
    <main>
      {/* Hero Slider */}
      <section className="relative overflow-hidden h-[420px] md:h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-r ${HERO_SLIDES[slide].bg} flex items-center`}
          >
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-lg">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-accent text-sm font-semibold uppercase tracking-widest mb-2"
                >
                  {HERO_SLIDES[slide].subtitle}
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl font-display font-bold text-white mb-4"
                >
                  {HERO_SLIDES[slide].title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/80 text-base mb-6"
                >
                  {HERO_SLIDES[slide].description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to="/product/$id"
                    params={{ id: HERO_SLIDES[slide].productId }}
                  >
                    <Button
                      size="lg"
                      data-ocid={`home.hero_button.${slide + 1}`}
                      className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 h-12"
                    >
                      {HERO_SLIDES[slide].cta}{" "}
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() =>
            setSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => setSlide((s) => (s + 1) % HERO_SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight size={20} />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((hs, i) => (
            <button
              type="button"
              key={hs.id}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === slide ? "w-8 bg-accent" : "w-2 bg-white/40"}`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              to="/category/$slug"
              params={{ slug: cat.slug }}
              data-ocid={`home.category_link.${i + 1}`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 p-3 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="text-3xl">{cat.icon}</div>
                <span className="text-xs font-medium text-center text-foreground leading-tight">
                  {cat.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            🔥 Trending Now
          </h2>
          <Link to="/search" search={{ q: "trending" }}>
            <Button variant="ghost" size="sm" className="text-primary">
              View All <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {trending.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i + 1} />
          ))}
        </div>
      </section>

      {/* Deals of the Day */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-white">
                ⚡ Deals of the Day
              </h2>
              <p className="text-white/70 text-sm">
                Limited time offers — grab them before they're gone!
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
              <Clock size={18} className="text-accent" />
              <div className="flex gap-2">
                {[
                  { v: String(countdown.h).padStart(2, "0"), label: "HRS" },
                  { v: String(countdown.m).padStart(2, "0"), label: "MIN" },
                  { v: String(countdown.s).padStart(2, "0"), label: "SEC" },
                ].map(({ v, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl font-bold text-white font-display">
                      {v}
                    </div>
                    <div className="text-white/50 text-[10px]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {deals.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i + 1} />
          ))}
        </div>
      </section>

      {/* Popular Brands */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">
          Popular Brands
        </h2>
        <div className="flex flex-wrap gap-3">
          {BRANDS.map((brand) => (
            <Link key={brand} to="/search" search={{ q: brand }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-card border border-border rounded-xl text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary hover:shadow-md transition-all"
              >
                {brand}
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            ⭐ Featured Products
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i + 1} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-accent rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-2">
            Get Exclusive Deals
          </h2>
          <p className="text-white/80 mb-6">
            Subscribe and be the first to know about flash sales and new
            arrivals.
          </p>
          <form
            onSubmit={handleNewsletter}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-white text-foreground border-0 flex-1"
              required
            />
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-6"
            >
              Subscribe
            </Button>
          </form>
          <p className="text-white/60 text-xs mt-3">
            No spam, unsubscribe anytime.
          </p>
        </div>
      </section>
    </main>
  );
}
