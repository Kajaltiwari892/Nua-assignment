import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { motion } from "motion/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">S</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg text-foreground">
              StoreFront
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/products"
              className="text-foreground hover:text-primary transition"
            >
              Products
            </Link>
            <a
              href="#"
              className="text-foreground hover:text-primary transition"
            >
              About
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition"
            >
              Contact
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-2">
            <Link
              to="/products"
              className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition"
            >
              Products
            </Link>
            <a
              href="#"
              className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition"
            >
              About
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
