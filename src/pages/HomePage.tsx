import { Link } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProductGrid } from "@/components/product-grid";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerReveal } from "@/components/ScrollReveal";
import { motion } from "motion/react";

const features = [
  {
    icon: "🚚",
    title: "Fast Delivery",
    desc: "Free shipping on orders over $100. Quick and reliable delivery to your doorstep.",
  },
  {
    icon: "✨",
    title: "Premium Quality",
    desc: "All products are carefully selected to ensure premium quality and durability.",
  },
  {
    icon: "🛡️",
    title: "Secure Shopping",
    desc: "Your data is protected with industry-leading security and encryption.",
  },
];

export default function HomePage() {
  const { products, isLoading } = useProducts();
  const featuredProducts = products.slice(0, 8);

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <Hero />

        {/* Featured Products Section */}
        <section id="features" className="py-16 sm:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <ScrollReveal direction="up">
              <div className="mb-12">
                <div className="inline-block mb-4">
                  <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold tracking-widest uppercase">
                    Featured Collection
                  </div>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
                  Best Sellers
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Discover our most popular and highly-rated products loved by
                  thousands of customers worldwide.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.15}>
              <ProductGrid products={featuredProducts} isLoading={isLoading} />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              <div className="mt-12 text-center">
                <Link to="/products">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
                    <Button size="lg" variant="outline" className="font-semibold px-10 tracking-wide">
                      View All Products
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <ScrollReveal direction="up">
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-12 text-center">
                Why Choose Us
              </h2>
            </ScrollReveal>

            <StaggerReveal
              className="grid md:grid-cols-3 gap-8"
              staggerDelay={0.15}
              direction="up"
            >
              {features.map((f) => (
                <motion.div
                  key={f.title}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                  transition={{ duration: 0.25 }}
                  className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">{f.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-muted-foreground">{f.desc}</p>
                </motion.div>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-muted/50 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="up">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h4 className="font-bold text-foreground mb-4">StoreFront</h4>
                  <p className="text-sm text-muted-foreground">
                    Your destination for premium products and exceptional shopping experience.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link to="/products" className="hover:text-primary transition">Shop</Link></li>
                    <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
                    <li><Link to="/" className="hover:text-primary transition">About</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-4">Support</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link to="/" className="hover:text-primary transition">Contact</Link></li>
                    <li><Link to="/" className="hover:text-primary transition">FAQ</Link></li>
                    <li><Link to="/" className="hover:text-primary transition">Returns</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link to="/" className="hover:text-primary transition">Privacy</Link></li>
                    <li><Link to="/" className="hover:text-primary transition">Terms</Link></li>
                    <li><Link to="/" className="hover:text-primary transition">Cookies</Link></li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
            <div className="border-t border-border pt-8 flex justify-between items-center text-sm text-muted-foreground">
              <p>&copy; 2024 StoreFront. All rights reserved.</p>
              <div className="flex gap-4">
                <span>Facebook</span>
                <span>Twitter</span>
                <span>Instagram</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
