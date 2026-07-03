import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Lock } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "motion/react";
import BlurText from "@/components/BlurText";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [step, setStep] = useState("contact");
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    // Contact
    email: "",
    phone: "",
    // Shipping
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    // Payment
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal - discount + tax + shipping;

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Your cart is empty
            </h1>
            <Button onClick={() => navigate("/products")}>
              Continue Shopping
            </Button>
          </div>
        </main>
      </>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscountApplied(true);
    } else {
      alert("Invalid promo code");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === "contact") {
      if (!formData.email || !formData.phone) {
        alert("Please fill in all contact fields");
        return;
      }
      setStep("shipping");
    } else if (step === "shipping") {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.address ||
        !formData.city ||
        !formData.state ||
        !formData.zip
      ) {
        alert("Please fill in all shipping fields");
        return;
      }
      setStep("payment");
    } else if (step === "payment") {
      if (
        !formData.cardName ||
        !formData.cardNumber ||
        !formData.cardExpiry ||
        !formData.cardCVC
      ) {
        alert("Please fill in all payment fields");
        return;
      }

      setIsProcessing(true);
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart and navigate to success
      clearCart();
      navigate("/checkout/success", {
        state: {
          orderTotal: total,
          items: items.length,
          email: formData.email,
        },
      });
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BlurText
            text="Checkout"
            delay={100}
            animateBy="words"
            direction="top"
            className="text-4xl font-black text-foreground mb-8"
            stepDuration={0.4}
          />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <ScrollReveal direction="left" delay={0.15} className="lg:col-span-2">
              {/* Steps */}
              <div className="mb-8 flex items-center gap-4">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                    step === "contact" || ["shipping", "payment"].includes(step)
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  1
                </div>
                <span className="font-medium">Contact</span>

                <ChevronRight size={20} className="text-muted-foreground" />

                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                    step === "shipping" || step === "payment"
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  2
                </div>
                <span className="font-medium">Shipping</span>

                <ChevronRight size={20} className="text-muted-foreground" />

                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                    step === "payment"
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  3
                </div>
                <span className="font-medium">Payment</span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Step */}
                {step === "contact" && (
                  <div className="space-y-4 p-6 rounded-lg border border-border bg-card">
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      Contact Information
                    </h2>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

                {/* Shipping Step */}
                {step === "shipping" && (
                  <div className="space-y-4 p-6 rounded-lg border border-border bg-card">
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      Shipping Address
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Input
                      name="address"
                      placeholder="Street address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="state"
                        placeholder="State/Province"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        name="zip"
                        placeholder="ZIP/Postal code"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                      />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="rounded border border-input bg-background px-3 py-2"
                        required
                      >
                        <option value="">Select country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Payment Step */}
                {step === "payment" && (
                  <div className="space-y-4 p-6 rounded-lg border border-border bg-card">
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      Payment Information
                    </h2>
                    <div className="flex items-center gap-2 p-3 bg-accent/10 border border-accent/20 rounded text-accent text-sm">
                      <Lock size={16} />
                      Your payment is secure and encrypted
                    </div>
                    <Input
                      name="cardName"
                      placeholder="Cardholder name"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="cardNumber"
                      placeholder="Card number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength={16}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        name="cardCVC"
                        placeholder="CVC"
                        value={formData.cardCVC}
                        onChange={handleInputChange}
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  {step !== "contact" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (step === "shipping") setStep("contact");
                        else if (step === "payment") setStep("shipping");
                      }}
                      className="flex-grow"
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-grow"
                  >
                    {step === "payment"
                      ? isProcessing
                        ? "Processing..."
                        : `Pay $${total.toFixed(2)}`
                      : "Continue"}
                  </Button>
                </div>
              </form>
            </ScrollReveal>

            {/* Order Summary */}
            <ScrollReveal direction="right" delay={0.25} className="lg:col-span-1">
              <div className="rounded-lg border border-border bg-card p-6 sticky top-20">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-2 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.title} x{item.quantity}
                      </span>
                      <span className="text-foreground font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code */}
                {step === "payment" && (
                  <div className="mb-6">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={discountApplied}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleApplyPromo}
                        disabled={discountApplied}
                      >
                        Apply
                      </Button>
                    </div>
                    {discountApplied && (
                      <p className="text-xs text-green-600 mt-2">
                        Promo code applied!
                      </p>
                    )}
                  </div>
                )}

                {/* Pricing */}
                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
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
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-accent">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </>
  );
}
