import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import BlurText from "@/components/BlurText";
import { ScrollReveal, StaggerReveal } from "@/components/ScrollReveal";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted pt-20 pb-12 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-8">

        {/* Badge */}
        <ScrollReveal delay={0} direction="down">
          <div className="inline-block">
            <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium tracking-wide uppercase">
              Premium Online Shopping Experience
            </div>
          </div>
        </ScrollReveal>

        {/* Main Heading — BlurText */}
        <div className="space-y-2">
          <BlurText
            text="Discover Your Next"
            delay={120}
            animateBy="words"
            direction="top"
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight text-foreground justify-center font-sans"
            stepDuration={0.4}
          />
          <BlurText
            text="Favorite Product"
            delay={100}
            animateBy="words"
            direction="top"
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent justify-center"
            stepDuration={0.45}
          />
        </div>

        {/* Description */}
        <ScrollReveal delay={0.5} direction="up">
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Shop from our carefully curated collection of premium products.
            Experience seamless shopping with our modern, intuitive interface and
            exceptional customer service.
          </p>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal delay={0.7} direction="up">
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/products">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" className="gap-2 font-semibold px-8">
                  Shop Now
                  <ArrowRight size={20} />
                </Button>
              </motion.div>
            </Link>
            <Link to="/#features">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" variant="outline" className="font-semibold px-8">
                  Learn More
                </Button>
              </motion.div>
            </Link>
          </div>
        </ScrollReveal>

        {/* Trust Badges */}
        <ScrollReveal delay={0.9} direction="fade">
          <StaggerReveal
            className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12 text-sm text-muted-foreground"
            staggerDelay={0.15}
            direction="up"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg text-green-500">✓</span>
              <span className="font-medium">10,000+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg text-green-500">✓</span>
              <span className="font-medium">30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg text-green-500">✓</span>
              <span className="font-medium">Secure Checkout</span>
            </div>
          </StaggerReveal>
        </ScrollReveal>

      </div>
    </section>
  );
}
