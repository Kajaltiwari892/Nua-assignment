import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { useCartStore } from "@/lib/store";
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "motion/react";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen flex items-center justify-center">
          <div className="text-center border border-border p-16">
            <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-6 opacity-30" />
            <h1 className="font-display font-black text-3xl text-foreground uppercase mb-3">
              The Void is Empty
            </h1>
            <p className="text-muted-foreground font-normal text-sm mb-8">
              Your collection awaits. You simply haven't acquired anything yet.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-primary text-primary-foreground font-display font-medium tracking-widest uppercase text-xs px-8 py-3 hover:bg-primary/90 transition-colors"
            >
              Browse Collections
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Header */}
          <ScrollReveal direction="up">
            <div className="border-b border-border pb-8 mb-8">
              <p className="font-display text-[10px] tracking-[0.3em] uppercase text-primary font-medium mb-2">
                Your Acquisitions
              </p>
              <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground uppercase">
                Shopping Cart
              </h1>
              <p className="text-muted-foreground font-normal text-sm mt-2">
                {items.length} {items.length === 1 ? "item" : "items"} awaiting commitment.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Cart items */}
            <ScrollReveal direction="left" delay={0.1} className="lg:col-span-2">
              <div className="space-y-0">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.color}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-4 p-4 border border-border hover:border-primary/40 transition-colors bg-card mb-2"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 bg-white flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-sm text-foreground uppercase leading-tight line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="font-display text-[10px] tracking-widest uppercase text-primary font-medium mt-1">
                          ${item.price.toFixed(2)} each
                        </p>

                        {/* Qty stepper */}
                        <div className="flex items-center gap-0 border border-border w-fit mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.color, item.size)}
                            className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors border-r border-border"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-display text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                            className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors border-l border-border"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Right: total + remove */}
                      <div className="flex flex-col items-end justify-between flex-shrink-0">
                        <span className="font-display font-bold text-base text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id, item.color, item.size)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <button
                onClick={() => navigate("/products")}
                className="w-full mt-4 border border-border text-foreground font-display font-medium tracking-widest uppercase text-xs py-3 hover:border-primary hover:text-primary transition-colors"
              >
                Continue Acquiring
              </button>
            </ScrollReveal>

            {/* Order Summary */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="border border-border bg-card p-5 lg:sticky lg:top-20">
                <h2 className="font-display font-bold text-lg text-foreground uppercase mb-6 border-b border-border pb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  {[
                    { label: "Subtotal", value: `$${subtotal.toFixed(2)}` },
                    { label: "Tax (10%)", value: `$${tax.toFixed(2)}` },
                    {
                      label: subtotal > 100 ? "Shipping (Free)" : "Shipping",
                      value: subtotal > 100 ? "$0.00" : `$${shipping.toFixed(2)}`,
                      highlight: subtotal > 100,
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-normal">{row.label}</span>
                      <span className={`font-medium font-display ${row.highlight ? "text-primary" : "text-foreground"}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="font-display font-medium text-sm text-foreground uppercase tracking-widest">Total</span>
                    <span className="font-display font-black text-3xl text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/checkout")}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-display font-medium tracking-widest uppercase text-sm py-4 hover:bg-primary/90 transition-colors mb-3"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </motion.button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full border border-border text-foreground font-display font-medium tracking-widest uppercase text-xs py-3 hover:border-primary hover:text-primary transition-colors"
                >
                  Back to Home
                </button>

                <p className="font-display text-[10px] tracking-widest uppercase text-muted-foreground text-center mt-6">
                  Secured Transmission · Encrypted
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </>
  );
}
