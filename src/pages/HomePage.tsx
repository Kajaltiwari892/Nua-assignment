import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { useProducts } from "@/hooks/useProducts";
import { ScrollReveal, StaggerReveal } from "@/components/ScrollReveal";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

/* ─── Image constants ─── */
const IMG_KEYBOARD =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCEIMm9C7y1LcvAjD2vILRCcvZVt99cfgydBgpJDWEVBGPgh-kveIFdWHWd4AZ5vb1Sy4y7e27IL4croNg4LHr5sUm0GmACsliH9Gj7Zl43NIcSBMvIXpAp9sf0dNBulnWlvZeFvPKjhzrzrmwsWYVKfW8M0Xxse79jtBTYDi9PdwwWkZmldSNIxS5Qb7X4jPSF5LMCkuaYZ1iWhhKgvv18DdZWGRnik7j7FmDKL6SlFz5ycBuDKuhr9A";
const IMG_VASE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCFj_yQTp7NJLbDK2DrqmXr-dXS52fSu2ddse_CZyKL3lp6_69Bpx7KFhDS0dR_uMXlVRDxX4YclLp1mVP5TlEcFFf0T-09PX9qAh2uKuMLvPWRurF5V0j4_1GaBI72GSNowMC1pMxySWg3EXcUTfsneL4yCHZt4Vvg9Tl3aAoNu0St5R2cP_puCpXro84FA8yAY6ur-AGKLwl-CDFfinC6et_RhnKzC3rIcnY7aZgXnv4VPGdD5cD22g";
const IMG_STATEMENT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCuLJLKla1-iyM_6tgrkH884TUmlC2Iu487z2mlgCV4_8brtP1QvvUsJ_YvOVv71ZxR0Gbmdwkntax7IHgh9YalNw2H-GlPqPXYw7iuv33oBg4BZICxwr4reE9F8N2g83sUx_a8mkYl_Hn8w7l3gIgyFY4JzvwWsPoKw_HVNvFX6yVPwVO2Scls2r5GMgdb60wOQKH5Tlr8kIEnbwcU0wJBEiHQbTJ5OeI7LUGryq6ButRNSscsKA-Hgg";
const IMG_MONOLITH =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC-_xcezSgLQLpB6WTRNHJpHr63ucHlqWZ8ch4LiLnO4cV1VmmrCBsy-9ISh6a9E-MAisVWOUWYR6-wPiNiatPXm2Vw_mLpFX2JhZZSHlgEoWPMpd-czf2aPElucHCe-D5BDNTFj_Ryj8ulM95zSwAHr3dzg05Foj1zIp7jdgLeh9SwITBXSogm-Fhgio3kIOsOHF3H6qyhavnor-hhccok2fxWf_YwLIEeVId3lzHGLheZINZUPaqbSg";

/* Category images */
const CATEGORIES = [
  {
    label: "Electronics",
    slug: "electronics",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdCGB0H8e1M8USEAeiygZa7G6hubTmvydc43LLng26FoU38ArkyqyYSJCGPn-1aNI52BbymU7f9TQfcBeTWW8FT9qXCtLfW7A6hrOrxs_RiMHyRFR0_FeAxWG9QXRHkItVgthrKdYKRYwYmd8kPrWAg0-D7iQ_la8oja0H7QggNV-f04D4Jl4SzkoIvEvr2Wnu-4VLeF3_zk9cgf1kRy_Ny_i6X0pV5vwK6wZeL7uYflUuS96rHdOKgw",
  },
  {
    label: "Men's Clothing",
    slug: "men's clothing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAqEq-A38jZg8tQ8rVk4tULRe_83YasvwPrFDa5jkdaWCfSxhGtsSkdBK9a8rDCr-xJ8WGbS-p_aHd0dNmvARIPMd7tRV7S1YtbVjh5fH7PSE-Kp5HvjNt3ppkHTYT1w2TW4_D_Yha1kuQ_UC7WaRkxYp7Ak0g0hDpnXaav4TR4nVbRwqUDQNIHLvdvp8F3Pe2GVwLgogctb3F8dTffXkGgze4MNrgJVz-MHkfkHsx2XgZTH4hDo1g8w",
  },
  {
    label: "Women's Clothing",
    slug: "women's clothing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTNi-6BDnYXTFCrh2lpmFZnWvHR580TB808aFkVcz0txxHh7ybXDztsy_wW8wHW591_v7IPfpBHHNOzRJNZQGu-uefFfuZkHzyfnBe9WsRNt-fTVqbQq8QPheqKnya-SNvhKrBekoaW1T-13xMWfiyyTeL58PY2dPW6EtDc47mbXZP5RK4mB8iEOwdlwjAvjfhL_NxKUFHf_VhrzBgGGS_wK0wHbxhx2oAbPNEtNUnkWwVjUmMXg72CA",
  },
  {
    label: "Beauty",
    slug: "women's clothing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnRmG--xDyuibY6LoJ-tN0p3I9DUV1PihRDN1zRtes_epycVJE15BHRAo6KF8g-nYc68HujNs9fb47n9lPiMKiu0gdiRy6CQSBUR3o8_rKtIao3-Y2FeLo62AVJZigG9BWJDR7KI6CdI_PrbypfKsymK-BYWELy6CoSepkQbo780iXaCNXqE2MD40I1RGFFDStVQP4C04Tr4DTHlFzogzQlNfjcrYZd2-Mw_VdCmaIOV36PsMdF6_Q5A",
  },
  {
    label: "Accessories",
    slug: "jewelery",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3XajvhKHP6hl-EYJX_rfpJXJzMJVrosxgwyC1cI0dAShrBpxkKRAwZSCkuGwZtKx4W0WAVIPP9r2KhC472PlK7LDPlrandPO326a5gAH1mZugjLXklCVRVSjQLGX-Ajz1pRlg-GGy3MObUwhfqTE5NpUFKkCWqM56q-H5Mu_Sf3Am4EL5yxSpbu6-s9Pg34cORBtOJN9AhzCN2oHGexx88fpnARwfkW36t0mKFpzdtLGJZ5FEfewFhQ",
  },
  {
    label: "The Collection",
    slug: "electronics",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmOE7NYXgCgnbbfc3qNKGWgTZD0w6RUqifWAXy9RdCoil5v28Z0g2BqpD73-jvmExsP__cQuu9yMX7b236Q1tBiHhdot_5R-Zt9ogrLUw4bIBe-fQqDLMC2I5HbNeTVL1RIGOS-C3zg4nDf4oDxD9W4kXoqjEuaLNin-sofv5jZdsw4G3Su80tM9vDc3r5ATYY18ya7cD1z6EUCjwMFDyafqYeqXqim7aY6WlbWTXnaJtWdrOvmJ71Pw",
  },
];

export default function HomePage() {
  const { products, isLoading } = useProducts();
  const [email, setEmail] = useState("");
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <Hero />

        {/* ── THE CROWD FAVORITES ── */}
        <section className="py-16 sm:py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <ScrollReveal direction="up">
                <div>
                  <p className="font-display text-xs tracking-[0.3em] uppercase text-primary font-medium mb-3">
                    By Popular Demand, Regrettably.
                  </p>
                  <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-foreground uppercase leading-none">
                    The Crowd<br />Favorites
                  </h2>
                  <p className="text-muted-foreground font-normal text-sm mt-4 max-w-lg leading-relaxed">
                    A curated selection of what everyone else is buying. Apparently, originality
                    is overrated. If you're looking to blend into the premium masses, you've
                    arrived at the correct destination.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.2}>
                <Link
                  to="/products"
                  className="flex items-center gap-2 border border-border px-4 py-2 hover:border-primary transition-colors group"
                >
                  <span className="font-display text-xs tracking-widest uppercase text-muted-foreground group-hover:text-primary font-medium transition-colors">
                    Sort By: Conformity
                  </span>
                </Link>
              </ScrollReveal>
            </div>

            {/* Products grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-card aspect-[3/4] animate-pulse" />
                ))}
              </div>
            ) : (
              <StaggerReveal
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                staggerDelay={0.1}
                direction="up"
              >
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </StaggerReveal>
            )}
          </div>
        </section>

        {/* ── CURATED RESTRAINT ── */}
        <section className="py-16 sm:py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <ScrollReveal direction="up">
              <div className="mb-10">
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
                  Curated Restraint
                </h2>
                <p className="text-muted-foreground font-normal text-sm mt-2">
                  Selected items for the discerning few.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-3 gap-4">
              {/* Left — large image */}
              <ScrollReveal direction="left" delay={0.1} className="lg:col-span-2">
                <div className="relative overflow-hidden bg-card border border-border group h-full min-h-[400px]">
                  <img
                    src={IMG_KEYBOARD}
                    alt="Titan Key_01"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <p className="font-display text-[10px] tracking-[0.3em] uppercase text-primary font-medium mb-2">
                      Limited Release
                    </p>
                    <h3 className="font-display font-black text-2xl text-foreground uppercase mb-2">
                      Titan Key_01
                    </h3>
                    <p className="text-muted-foreground font-normal text-sm max-w-sm leading-relaxed mb-4">
                      A tactile experience for those who communicate only what is absolutely necessary.
                    </p>
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-2 font-display text-xs tracking-widest uppercase text-foreground hover:text-primary transition-colors font-medium"
                    >
                      Acquire Item <span className="text-primary">→</span>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              {/* Right — stacked cards */}
              <ScrollReveal direction="right" delay={0.2} className="flex flex-col gap-4">
                {/* Top card */}
                <div className="flex-1 bg-card border border-border overflow-hidden relative group">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="font-display text-[10px] tracking-widest text-primary font-medium">
                      02 / 05
                    </span>
                  </div>
                  <div className="p-6 pt-10">
                    <h4 className="font-display font-bold text-lg uppercase text-foreground">
                      Obsidian Vase
                    </h4>
                    <p className="font-display text-sm text-primary font-medium mt-1">$856.00</p>
                  </div>
                  <div className="h-40 overflow-hidden">
                    <img
                      src={IMG_VASE}
                      alt="Obsidian Vase"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Bottom — Archive card (coral) */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="bg-primary border border-primary p-6 flex flex-col justify-between min-h-[180px]"
                >
                  <div>
                    <h4 className="font-display font-black text-2xl text-primary-foreground uppercase">
                      The Archive
                    </h4>
                    <p className="text-primary-foreground/70 font-normal text-sm mt-2 leading-relaxed">
                      Explore our previous collections of refined excess.
                    </p>
                  </div>
                  <Link to="/products">
                    <div className="w-9 h-9 bg-primary-foreground/20 hover:bg-primary-foreground/40 flex items-center justify-center transition-colors mt-4">
                      <ArrowUpRight size={16} className="text-primary-foreground" />
                    </div>
                  </Link>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── STATEMENT PIECE ── */}
        <section className="py-16 sm:py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              <ScrollReveal direction="left" delay={0.1}>
                <div className="space-y-6">
                  <p className="font-display text-[10px] tracking-[0.3em] uppercase text-primary font-medium">
                    Statement Piece
                  </p>
                  <h2 className="font-display font-black text-4xl sm:text-5xl text-foreground leading-tight">
                    The Carbon<br />Monolith
                  </h2>
                  <p className="text-muted-foreground font-normal text-sm leading-relaxed max-w-md">
                    Designed to be uncomfortable enough to remind you of your mortality, but
                    beautiful enough that you won't care. Crafted from salvaged aerospace
                    composites and refined in our Obsidian lab.
                  </p>

                  <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
                    <div>
                      <p className="font-display text-[10px] tracking-[0.3em] uppercase text-primary font-medium mb-1">
                        Weight
                      </p>
                      <p className="font-display font-bold text-base text-foreground">2.4 KG</p>
                    </div>
                    <div>
                      <p className="font-display text-[10px] tracking-[0.3em] uppercase text-primary font-medium mb-1">
                        Tensile
                      </p>
                      <p className="font-display font-bold text-base text-foreground">UNMATCHED</p>
                    </div>
                  </div>

                  <Link to="/products">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="border border-foreground text-foreground font-display font-medium tracking-widest uppercase text-xs px-7 py-3 hover:bg-foreground hover:text-background transition-colors"
                    >
                      Secure Assignment
                    </motion.button>
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <div className="relative">
                  <div className="aspect-[4/5] overflow-hidden border border-border">
                    <img
                      src={IMG_STATEMENT}
                      alt="The Carbon Monolith"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border px-4 py-3">
                    <div className="grid grid-cols-2 gap-4 text-xs font-display">
                      <div>
                        <p className="text-muted-foreground tracking-widest uppercase font-medium">Material:</p>
                        <p className="text-foreground font-medium">Carbon Fiber / Obsidian</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground tracking-widest uppercase font-medium">Status:</p>
                        <p className="text-primary font-medium">Restricted Access</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── SHOP BY CATEGORY ── */}
        <section className="py-16 sm:py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <ScrollReveal direction="up">
              <div className="mb-10">
                <p className="font-display text-[10px] tracking-[0.3em] uppercase text-primary font-medium mb-3">
                  Navigate the Void
                </p>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground uppercase">
                  Shop by Category
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {CATEGORIES.map((cat, i) => (
                <ScrollReveal key={cat.label} direction="up" delay={i * 0.08}>
                  <Link to={`/products`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="group relative overflow-hidden border border-border aspect-[4/3]"
                    >
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="font-display font-bold text-base uppercase text-foreground">
                          {cat.label}
                        </h3>
                        <span className="font-display text-[10px] tracking-widest uppercase text-primary font-medium">
                          Shop Now →
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="py-16 sm:py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="border border-border p-10 sm:p-16 text-center max-w-2xl mx-auto">
                <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground uppercase leading-tight mb-4">
                  Want to be like<br />everyone else?
                </h2>
                <p className="text-muted-foreground font-normal text-sm leading-relaxed mb-8">
                  Join the 45,000+ others who enjoy receiving the same emails every Tuesday
                  morning. We promise they're exclusive.
                </p>
                <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Type your address here, if you must..."
                    className="flex-1 bg-transparent border border-border px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors font-normal"
                  />
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="bg-primary text-primary-foreground font-display font-medium tracking-widest uppercase text-xs px-6 py-3 hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    Sign Me Up
                  </motion.button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-border py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="up">
              <div className="grid md:grid-cols-4 gap-10 mb-12">
                {/* Brand */}
                <div className="md:col-span-1">
                  <Link to="/" className="block mb-4">
                    <span className="font-display font-black text-3xl text-foreground/30 tracking-tight">
                      LUMORA
                    </span>
                  </Link>
                  <p className="text-muted-foreground font-normal text-xs leading-relaxed max-w-xs">
                    Curating the exceptional for those who find the ordinary offensive.
                  </p>
                </div>

                {/* Explore */}
                <div>
                  <h4 className="font-display text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-4">
                    Explore
                  </h4>
                  <ul className="space-y-2">
                    {["Best Sellers", "New Arrivals", "Collaborations", "The Lab"].map((l) => (
                      <li key={l}>
                        <Link to="/products" className="text-foreground/70 hover:text-primary transition-colors text-sm font-normal">
                          {l}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Help */}
                <div>
                  <h4 className="font-display text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-4">
                    Help
                  </h4>
                  <ul className="space-y-2">
                    {["Privacy", "Terms of Service", "Shipping & Returns", "Contact Us"].map((l) => (
                      <li key={l}>
                        <Link to="/contact" className="text-foreground/70 hover:text-primary transition-colors text-sm font-normal">
                          {l}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social */}
                <div>
                  <h4 className="font-display text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-4">
                    Follow the Herd
                  </h4>
                  <div className="flex flex-col gap-2">
                    {["Instagram", "Twitter (X)", "Vimeo"].map((s) => (
                      <span key={s} className="text-foreground/70 hover:text-primary transition-colors text-sm font-normal cursor-pointer">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="font-display text-[10px] tracking-widest uppercase text-muted-foreground font-medium">
                  © 2024 LUMORA. Established for the Discerning Few.
                </p>
                <p className="font-display text-[10px] tracking-widest uppercase text-muted-foreground font-medium">
                  Built with Restraint
                </p>
              </div>
            </ScrollReveal>
          </div>
        </footer>
      </main>
    </>
  );
}
