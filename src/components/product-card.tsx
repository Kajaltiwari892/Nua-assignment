import { Link } from "react-router-dom";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
}

const BADGES = [
  "OVER-HYPED",
  "STATUS SYMBOL",
  "LAST 5 UNITS",
  "BEST SELLERS",
  "CULT CLASSIC",
  "LIMITED RELEASE",
  "CURATOR'S PICK",
  "NEW ARRIVAL",
  "SOLD OUT SOON",
  "MUST-HAVE",
];

const VARIANTS = [
  "JETBLACK / CORAL",
  "BRUSHED STEEL",
  "GREY SCALE",
  "OBSIDIAN / CORAL",
  "MATTE BLACK",
  "CHROME / VOID",
  "SHADOW EDITION",
  "MONO",
  "RAW CARBON",
  "VOID EDITION",
];

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const badge = BADGES[product.id % BADGES.length];
  const variant = VARIANTS[product.id % VARIANTS.length];
  const stars = Math.round(product.rating.rate);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
      color: "",
      size: "",
    });
  }

  return (
    <Link to={`/products/${product.id}`}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group bg-card border border-border card-hover flex flex-col cursor-pointer"
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-white aspect-[4/4.5]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
          {/* Badge */}
          <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm border border-border px-2 py-0.5">
            <span className="font-display text-[10px] tracking-widest uppercase text-foreground font-medium">
              {badge}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          {/* Name + rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold text-sm uppercase tracking-wide text-foreground leading-tight line-clamp-2">
              {product.title}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
              <span className="text-primary text-xs">★</span>
              <span className="font-display text-xs text-muted-foreground font-medium">
                {product.rating.rate.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-xs font-normal leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
            <span className="font-display font-bold text-base text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <span className="font-display text-[10px] tracking-widest uppercase text-muted-foreground font-medium">
              {variant}
            </span>
          </div>

          {/* Add to cart */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            className="w-full mt-1 py-2 border border-border text-foreground hover:border-primary hover:text-primary font-display text-xs tracking-widest uppercase font-medium transition-colors"
          >
            Acquire Item
          </motion.button>
        </div>
      </motion.article>
    </Link>
  );
}
