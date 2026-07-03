import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { useCartStore } from "@/lib/store";
import { useProductById } from "@/hooks/useProducts";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "motion/react";
import { ChevronLeft, Plus, Minus } from "lucide-react";

const BADGES = ["OVER-HYPED","STATUS SYMBOL","LAST 5 UNITS","BEST SELLERS","CULT CLASSIC","LIMITED RELEASE","CURATOR'S PICK","NEW ARRIVAL","SOLD OUT SOON","MUST-HAVE"];
const VARIANTS = ["JETBLACK / CORAL","BRUSHED STEEL","GREY SCALE","OBSIDIAN / CORAL","MATTE BLACK","CHROME / VOID","SHADOW EDITION","MONO","RAW CARBON","VOID EDITION"];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { product, isLoading } = useProductById(Number(id));
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="font-display font-black text-2xl tracking-widest text-foreground/30">LUMORA</div>
            <div className="w-8 h-[2px] bg-primary animate-pulse mx-auto" />
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center border border-border p-12">
            <p className="font-display font-black text-2xl text-foreground uppercase">Object Not Found</p>
            <p className="text-muted-foreground font-normal text-sm mt-2">It has been removed from existence.</p>
            <button
              onClick={() => navigate("/products")}
              className="mt-6 border border-foreground text-foreground font-display font-medium tracking-widest uppercase text-xs px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
            >
              Return to Collection
            </button>
          </div>
        </div>
      </>
    );
  }

  const badge = BADGES[product.id % BADGES.length];
  const variant = VARIANTS[product.id % VARIANTS.length];
  const stars = Math.round(product.rating.rate);

  function handleAdd() {
    addItem({
      id: product!.id,
      title: product!.title,
      price: product!.price,
      image: product!.image,
      quantity,
      color: "",
      size: "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Back */}
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 font-display text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors font-medium mb-10"
          >
            <ChevronLeft size={14} /> Back to Collection
          </button>

          {/* Product */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Image */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="relative">
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm border border-border px-2 py-1">
                  <span className="font-display text-[10px] tracking-widest uppercase text-foreground font-medium">
                    {badge}
                  </span>
                </div>
                <div className="aspect-square bg-white border border-border overflow-hidden flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-8"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Details */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="space-y-6">
                {/* Category */}
                <p className="font-display text-[10px] tracking-[0.3em] uppercase text-primary font-medium">
                  {product.category}
                </p>

                {/* Title */}
                <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground uppercase leading-tight">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < stars ? "text-primary" : "text-muted"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="font-display text-xs text-muted-foreground font-medium">
                    {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4 border-t border-b border-border py-4">
                  <span className="font-display font-black text-4xl text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="font-display text-[10px] tracking-widest uppercase text-muted-foreground font-medium">
                    {variant}
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground font-normal text-sm leading-relaxed">
                  {product.description}
                </p>

                {/* Quantity */}
                <div>
                  <p className="font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium mb-3">
                    Quantity
                  </p>
                  <div className="flex items-center gap-0 border border-border w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors border-r border-border"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-display font-medium text-sm w-10 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors border-l border-border"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Add to cart */}
                <motion.button
                  onClick={handleAdd}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-4 font-display font-medium tracking-widest uppercase text-sm transition-colors ${
                    added
                      ? "bg-green-700 text-white"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {added ? "✓ Added to Collection" : "Acquire Item"}
                </motion.button>

                {/* Specs */}
                <div className="border border-border p-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium mb-1">Material</p>
                    <p className="font-display text-sm font-medium text-foreground capitalize">{product.category}</p>
                  </div>
                  <div>
                    <p className="font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium mb-1">Status</p>
                    <p className="font-display text-sm font-medium text-primary">In Stock</p>
                  </div>
                  <div>
                    <p className="font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium mb-1">Shipping</p>
                    <p className="font-display text-sm font-medium text-foreground">Free over $100</p>
                  </div>
                  <div>
                    <p className="font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium mb-1">Returns</p>
                    <p className="font-display text-sm font-medium text-foreground">30 Days</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </>
  );
}
