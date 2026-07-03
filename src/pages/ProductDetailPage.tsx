import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Plus, Minus, ShoppingCart, Heart } from "lucide-react";
import { mockProducts } from "@/data/products";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "motion/react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = mockProducts.find((p) => p.id === parseInt(id || "0"));

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Product not found
            </h1>
            <Button onClick={() => navigate("/products")}>
              Back to Products
            </Button>
          </div>
        </main>
      </>
    );
  }

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select color and size");
      return;
    }

    setIsAdding(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });

    setIsAdding(false);
    navigate("/cart");
  };

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock < 5 && product.stock > 0;

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ChevronLeft size={20} />
            Back to Products
          </button>

          {/* Product Detail */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center border border-border">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center border border-border cursor-pointer hover:border-primary"
                  >
                    <img
                      src={product.image}
                      alt={`View ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Details Section */}
            <ScrollReveal direction="right" delay={0.2}>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                      {product.title}
                    </h1>
                    <p className="text-muted-foreground mt-2">
                      {product.category}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 hover:bg-muted rounded-lg transition"
                  >
                    <Heart
                      size={24}
                      className={
                        isFavorite
                          ? "fill-destructive text-destructive"
                          : "text-muted-foreground"
                      }
                    />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(product.rating.rate)
                            ? "text-accent"
                            : "text-muted"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              </div>

              {/* Price and Stock */}
              <div className="mb-8 pb-8 border-b border-border">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-4xl font-bold text-foreground">
                    ${product.price}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                </div>

                {isOutOfStock && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
                {isLowStock && (
                  <Badge
                    variant="outline"
                    className="border-amber-500 text-amber-600"
                  >
                    Only {product.stock} left in stock
                  </Badge>
                )}
                {!isOutOfStock && !isLowStock && (
                  <Badge
                    variant="outline"
                    className="border-green-500 text-green-600"
                  >
                    In Stock
                  </Badge>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Description
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Color Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Color
                </label>
                <div className="flex gap-3">
                  {(product.colors ?? []).map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition ${
                        selectedColor === color
                          ? "border-primary"
                          : "border-muted hover:border-muted-foreground"
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                {selectedColor && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {selectedColor}
                  </p>
                )}
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Size
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(product.sizes ?? []).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-4 rounded border-2 transition text-sm font-medium ${
                        selectedSize === size
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-muted hover:border-muted-foreground text-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity === 1 || isOutOfStock}
                    className="p-2 rounded border border-border hover:bg-muted transition disabled:opacity-50"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-2xl font-semibold text-foreground w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock ?? 99, quantity + 1))
                    }
                    disabled={quantity >= (product.stock ?? 99) || isOutOfStock}
                    className="p-2 rounded border border-border hover:bg-muted transition disabled:opacity-50"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAdding}
                size="lg"
                className="w-full gap-2"
              >
                <ShoppingCart size={20} />
                {isAdding
                  ? "Adding..."
                  : isOutOfStock
                    ? "Out of Stock"
                    : "Add to Cart"}
              </Button>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Free Shipping</p>
                    <p className="font-medium text-foreground">
                      Orders over $100
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">30-Day Returns</p>
                    <p className="font-medium text-foreground">Easy returns</p>
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
