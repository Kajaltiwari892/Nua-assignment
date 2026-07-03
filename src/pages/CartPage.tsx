import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "motion/react";
import BlurText from "@/components/BlurText";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-24">
              <ShoppingBag
                size={64}
                className="mx-auto text-muted-foreground mb-6 opacity-50"
              />
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Your cart is empty
              </h1>
              <p className="text-muted-foreground mb-8">
                Discover amazing products and add them to your cart
              </p>
              <Button onClick={() => navigate("/products")} size="lg">
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BlurText
            text="Shopping Cart"
            delay={100}
            animateBy="words"
            direction="top"
            className="text-4xl font-black text-foreground mb-8"
            stepDuration={0.4}
          />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <ScrollReveal direction="left" delay={0.15} className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.color}-${item.size}`}
                    className="flex gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-grow">
                      <h3 className="font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        <span>Color: {item.color}</span>
                        <span>Size: {item.size}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 bg-muted rounded">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                                item.color,
                                item.size,
                              )
                            }
                            className="p-1 hover:text-primary"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1,
                                item.color,
                                item.size,
                              )
                            }
                            className="p-1 hover:text-primary"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-semibold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id, item.color, item.size)}
                      className="p-2 hover:bg-destructive/10 rounded text-destructive transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <Button
                variant="outline"
                onClick={() => navigate("/products")}
                className="w-full mt-8"
              >
                Continue Shopping
              </Button>
            </ScrollReveal>

            {/* Order Summary */}
            <ScrollReveal direction="right" delay={0.25} className="lg:col-span-1">
              <div className="rounded-lg border border-border bg-card p-6 sticky top-20">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <Input placeholder="Promo code" className="flex-grow" />
                    <Button variant="outline">Apply</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Try "SAVE10" for 10% off
                  </p>
                </div>

                {/* Pricing */}
                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="text-foreground">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Shipping{" "}
                      {subtotal > 100 && (
                        <span className="text-green-600">(Free)</span>
                      )}
                    </span>
                    <span
                      className={
                        subtotal > 100
                          ? "text-green-600 font-medium"
                          : "text-foreground"
                      }
                    >
                      ${shipping.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-accent">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <Button
                  onClick={() => navigate("/checkout")}
                  size="lg"
                  className="w-full gap-2 mb-3"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="w-full"
                >
                  Back to Home
                </Button>

                {/* Security Info */}
                <p className="text-xs text-muted-foreground text-center mt-6">
                  Your payment information is secure and encrypted
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </>
  );
}
