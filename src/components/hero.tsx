import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ScrollReveal";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDGegXtKqOpQw7AqMc9sIvsdt91CG4BKYzF-EA8grbuE5Vt-l-zcty1tmVmCuY6EZx50rhEZhjYtxmsMiyfZfK8DllVD73CKS24qmU54tadbEPV-QsJ_UudTivuXSeviyd4vXiB8-1_Xq8ML1vS0INLOdBEFbBwqfJ3BB8QFarS2Cbgp-9QJ5EyetgjYcDHyql3FCLHR0U21L0Xh47gHr4vbVnV8k5E4vR4z3xNRA8ZXSdeICu4BIc7aA";

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-56px)] flex items-center bg-background px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left — Text */}
        <div className="space-y-8">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-[2px] bg-primary flex-shrink-0" />
            <span className="font-display text-xs tracking-[0.25em] uppercase text-primary font-medium">
              Collection 001
            </span>
          </motion.div>

          {/* Heading */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black leading-none tracking-tight"
            >
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-foreground mb-2">
                Discover Your
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-foreground mb-2">
                Next{" "}
                <span className="text-stroke-coral">Obsession</span>
              </span>
            </motion.h1>
          </div>

          {/* Body */}
          <ScrollReveal delay={0.35} direction="up">
            <p className="text-muted-foreground font-normal text-base leading-relaxed max-w-md">
              Resistance is futile. You've already convinced yourself this is a
              necessity. We're just here to facilitate your elegant surrender to
              consumerism.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={0.45} direction="up">
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-primary text-primary-foreground font-display font-medium tracking-widest uppercase text-sm px-7 py-3 hover:bg-primary/90 transition-colors"
                >
                  Surrender Now
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-foreground text-foreground font-display font-medium tracking-widest uppercase text-sm px-7 py-3 hover:bg-foreground hover:text-background transition-colors"
                >
                  View Archives
                </motion.button>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Right — Product Card */}
        <ScrollReveal direction="right" delay={0.3}>
          <div className="relative">
            {/* Card */}
            <div className="border border-border bg-card overflow-hidden relative">
              {/* Label top right */}
              <div className="absolute top-3 right-3 z-10">
                <span className="font-mono text-xs text-muted-foreground tracking-widest">
                  #LMR_001
                </span>
              </div>

              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={HERO_IMAGE}
                  alt="Featured Collection Piece"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom overlay */}
              <div className="bg-card/90 backdrop-blur-sm border-t border-border px-4 py-3">
                <p className="font-display text-xs tracking-widest uppercase text-muted-foreground font-medium">
                  The "Void" Lounge
                </p>
                <p className="font-display text-xs tracking-widest text-primary font-medium mt-0.5">
                  Jetbrains Mono Output: $12,400.00
                </p>
              </div>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r border-b border-primary/30" />
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
