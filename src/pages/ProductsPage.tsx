import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { useProducts } from "@/hooks/useProducts";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Search } from "lucide-react";

const CATEGORIES = ["All", "electronics", "jewelery", "men's clothing", "women's clothing"];

export default function ProductsPage() {
  const { products, isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = products.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Header */}
          <ScrollReveal direction="up">
            <div className="mb-12 border-b border-border pb-8">
              <p className="font-display text-[10px] tracking-[0.3em] uppercase text-primary font-medium mb-3">
                By Popular Demand, Regrettably.
              </p>
              <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-foreground uppercase leading-none">
                The Crowd<br />Favorites
              </h1>
              <p className="text-muted-foreground font-normal text-sm mt-4 max-w-xl leading-relaxed">
                A curated selection of what everyone else is buying. Apparently, originality
                is overrated. If you're looking to blend into the premium masses, you've
                arrived at the correct destination.
              </p>
            </div>
          </ScrollReveal>

          {/* Filters row */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search the void..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent border border-border pl-9 pr-4 py-2.5 font-display text-xs tracking-widest uppercase text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`font-display text-[10px] tracking-[0.2em] uppercase font-medium px-3 py-2 border transition-colors ${
                      activeCategory === cat
                        ? "border-primary text-primary bg-primary/10"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Count */}
          <ScrollReveal direction="up" delay={0.15}>
            <p className="font-display text-[10px] tracking-widest uppercase text-muted-foreground font-medium mb-6">
              {filtered.length} items in the collection
            </p>
          </ScrollReveal>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card border border-border aspect-[3/4] animate-pulse" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((product, i) => (
                <ScrollReveal key={product.id} direction="up" delay={Math.min(i * 0.04, 0.4)}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-border">
              <p className="font-display font-bold text-xl text-foreground uppercase">
                Nothing here.
              </p>
              <p className="text-muted-foreground font-normal text-sm mt-2">
                Even the void couldn't find a match.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
