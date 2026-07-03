import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "motion/react";
import BlurText from "@/components/BlurText";

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const deliveryDate = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString();

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* Confetti */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="fixed animate-pulse"
                style={{
                  left: Math.random() * 100 + "%",
                  top: -10 + "px",
                  animation: `fall ${2 + Math.random() * 1}s linear forwards`,
                  opacity: Math.random() * 0.7 + 0.3,
                }}
              >
                {["🎉", "🎊", "✨", "🎈"][Math.floor(Math.random() * 4)]}
              </div>
            ))}
            <style>{`
              @keyframes fall {
                to {
                  transform: translateY(100vh) rotate(360deg);
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        )}

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6"
            >
              <CheckCircle2 size={48} />
            </motion.div>

            <BlurText
              text="Order Confirmed!"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-4xl sm:text-5xl font-black text-foreground mb-4 justify-center"
              stepDuration={0.4}
            />
            <ScrollReveal delay={0.5} direction="up">
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
            </ScrollReveal>
          </div>

          {/* Order Details */}
          <ScrollReveal direction="up" delay={0.3}>
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Order Info */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4">
                  Order Number
                </h3>
                <p className="text-2xl font-bold text-foreground mb-6">
                  {orderNumber}
                </p>

                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4">
                  Order Date
                </h3>
                <p className="text-foreground mb-6">
                  {new Date().toLocaleDateString()}
                </p>
              </div>

              {/* Delivery Info */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4">
                  Estimated Delivery
                </h3>
                <p className="text-2xl font-bold text-accent mb-6">
                  {deliveryDate}
                </p>

                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4">
                  Shipping Method
                </h3>
                <p className="text-foreground">
                  Standard Shipping (5-7 business days)
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t border-border pt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">
                    $
                    {location.state?.orderTotal
                      ? (location.state.orderTotal * 0.85).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span className="text-foreground">
                    $
                    {location.state?.orderTotal
                      ? (location.state.orderTotal * 0.1).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-3xl font-bold text-accent">
                  ${location.state?.orderTotal?.toFixed(2) || "0.00"}
                </span>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Email Confirmation */}
          <ScrollReveal delay={0.4} direction="up">
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 mb-8">
            <p className="text-foreground">
              A confirmation email has been sent to{" "}
              <span className="font-semibold">
                {location.state?.email || "your email"}
              </span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Check your email for tracking information and updates about your
              order.
            </p>
          </div>
          </ScrollReveal>

          {/* Next Steps */}
          <div className="bg-muted/30 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-foreground mb-4">What's Next?</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent font-bold">1.</span>
                <span>
                  You will receive a shipping confirmation email with tracking
                  details
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">2.</span>
                <span>
                  Your order will be packaged and shipped within 1-2 business
                  days
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">3.</span>
                <span>
                  Track your package in real-time using the tracking link
                  provided
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <ScrollReveal delay={0.5} direction="up">
          <div className="space-y-4">
            <Button
              onClick={() => navigate("/products")}
              size="lg"
              className="w-full"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Back to Home
            </Button>
          </div>
          </ScrollReveal>
          <div className="mt-12 p-6 rounded-lg border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you have any questions about your order, please don't hesitate
              to contact our customer support team.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">
                <span className="font-medium">Email:</span>{" "}
                support@storefront.com
              </p>
              <p className="text-foreground">
                <span className="font-medium">Phone:</span> 1-800-STORE-01
              </p>
              <p className="text-foreground">
                <span className="font-medium">Hours:</span> Monday - Friday, 9AM
                - 6PM EST
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
