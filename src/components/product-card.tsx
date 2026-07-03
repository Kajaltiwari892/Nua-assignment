import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const isOutOfStock = product.stock === 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isOutOfStock) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
        color: product.colors?.[0] ?? "",
        size: product.sizes?.[0] ?? "",
      });
    }
  };

  return (
    <Link to={`/products/${product.id}`}>
      <motion.div
        className="group cursor-pointer"
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          {/* Title */}
          <h3 className="font-semibold text-foreground group-hover:text-primary transition truncate">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.floor(product.rating.rate)
                      ? "fill-accent text-accent"
                      : "fill-muted text-muted-foreground"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.rating.count})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              ${product.price}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
          </div>

          {/* Stock Status */}
          {isOutOfStock ? (
            <p className="text-sm text-destructive font-medium">Out of Stock</p>
          ) : product.stock < 5 ? (
            <p className="text-sm text-amber-600 font-medium">
              Only {product.stock} left
            </p>
          ) : (
            <p className="text-sm text-green-600 font-medium">In Stock</p>
          )}

          {/* Quick Add Button */}
          <Button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            size="sm"
            className="w-full gap-2 mt-4"
            variant="outline"
          >
            <ShoppingCart size={16} />
            {isOutOfStock ? "Out of Stock" : "Quick Add"}
          </Button>
        </div>
      </motion.div>
    </Link>
  );
}
