import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { useCartStore } from "@/lib/store";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

const inputClass =
  "w-full bg-transparent border border-border px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary transition-colors font-normal";
const labelClass =
  "block font-display text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium mb-2";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "US",
    cardNumber: "", cardName: "", expiry: "", cvv: "",
  });

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === "shipping") { setStep("payment"); return; }
    clearCart();
    navigate("/checkout/success");
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
                Finalizing Your Acquisition
              </p>
              <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground uppercase">
                Checkout
              </h1>
              {/* Step indicator */}
              <div className="flex items-center gap-3 mt-4">
                {["Shipping", "Payment"].map((s, i) => {
                  const isActive = (i === 0 && step === "shipping") || (i === 1 && step === "payment");
                  const isDone = i === 0 && step === "payment";
                  return (
                    <div key={s} className="flex items-center gap-3">
                      <div className={`flex items-center gap-2 ${isActive ? "text-foreground" : isDone ? "text-primary" : "text-muted-foreground"}`}>
                        <div className={`w-5 h-5 border flex items-center justify-center font-display text-[10px] font-bold ${isActive ? "border-foreground" : isDone ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                          {isDone ? "✓" : i + 1}
                        </div>
                        <span className="font-display text-xs tracking-widest uppercase font-medium">{s}</span>
                      </div>
                      {i < 1 && <ChevronRight size={12} className="text-muted-foreground" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {step === "shipping" ? (
                  <ScrollReveal direction="left" delay={0.1}>
                    <div className="space-y-6">
                      <h2 className="font-display font-bold text-lg text-foreground uppercase mb-4">
                        Shipping Information
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>First Name</label>
                          <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First" required className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Last Name</label>
                          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last" required className={inputClass} />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Email</label>
                          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@domain.com" required className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Phone</label>
                          <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 555 000 0000" className={inputClass} />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Address</label>
                        <input name="address" value={form.address} onChange={handleChange} placeholder="Street address" required className={inputClass} />
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className={labelClass}>City</label>
                          <input name="city" value={form.city} onChange={handleChange} placeholder="City" required className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>State</label>
                          <input name="state" value={form.state} onChange={handleChange} placeholder="State" required className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>ZIP</label>
                          <input name="zip" value={form.zip} onChange={handleChange} placeholder="00000" required className={inputClass} />
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ) : (
                  <ScrollReveal direction="left" delay={0.1}>
                    <div className="space-y-6">
                      <h2 className="font-display font-bold text-lg text-foreground uppercase mb-4">
                        Payment Details
                      </h2>
                      <div>
                        <label className={labelClass}>Card Number</label>
                        <input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" required maxLength={19} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Name on Card</label>
                        <input name="cardName" value={form.cardName} onChange={handleChange} placeholder="Full name" required className={inputClass} />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Expiry</label>
                          <input name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM / YY" required maxLength={7} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>CVV</label>
                          <input name="cvv" type="password" value={form.cvv} onChange={handleChange} placeholder="•••" required maxLength={4} className={inputClass} />
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                )}

                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 w-full bg-primary text-primary-foreground font-display font-medium tracking-widest uppercase text-sm py-4 hover:bg-primary/90 transition-colors"
                >
                  {step === "shipping" ? "Continue to Payment →" : "Complete Acquisition"}
                </motion.button>
              </form>
            </div>

            {/* Summary */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="border border-border bg-card p-6 sticky top-20">
                <h2 className="font-display font-bold text-base text-foreground uppercase mb-4 pb-4 border-b border-border">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3">
                      <div className="w-12 h-12 bg-white flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-xs text-foreground font-medium uppercase line-clamp-1">{item.title}</p>
                        <p className="font-display text-[10px] text-muted-foreground tracking-widest uppercase">×{item.quantity}</p>
                      </div>
                      <p className="font-display text-xs font-bold text-foreground flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 border-t border-border pt-4 mb-4">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground font-normal">Subtotal</span><span className="font-medium font-display">${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground font-normal">Tax</span><span className="font-medium font-display">${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground font-normal">Shipping</span><span className={`font-medium font-display ${subtotal > 100 ? "text-primary" : ""}`}>{subtotal > 100 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
                </div>
                <div className="border-t border-border pt-4 flex justify-between items-baseline">
                  <span className="font-display text-xs tracking-widest uppercase text-foreground font-medium">Total</span>
                  <span className="font-display font-black text-2xl text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </>
  );
}
