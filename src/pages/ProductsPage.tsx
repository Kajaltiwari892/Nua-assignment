import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { ProductGrid } from "@/components/product-grid";
import { useProducts } from "@/hooks/useProducts";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "motion/react";
import BlurText from "@/components/BlurText";

export default function ProductsPage() {
  const { products, isLoading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Header */}
          <div className="mb-12">
            <BlurText
              text="Our Products"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-4xl sm:text-5xl font-black text-foreground mb-4"
              stepDuration={0.4}
            />
            <ScrollReveal delay={0.3} direction="up">
              <p className="text-lg text-muted-foreground">
                Browse our complete collection of premium products
              </p>
            </ScrollReveal>
          </div>

          {/* Search Bar */}
          <ScrollReveal delay={0.2} direction="up">
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 font-medium"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Product Grid */}
          <ScrollReveal delay={0.3} direction="up">
            <div>
              {filteredProducts.length > 0 ? (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6"
                  >
                    <p className="text-sm text-muted-foreground font-medium">
                      Showing {filteredProducts.length} of {products.length} products
                    </p>
                  </motion.div>
                  <ProductGrid products={filteredProducts} isLoading={isLoading} />
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    {searchTerm
                      ? "No products found matching your search"
                      : "No products available"}
                  </p>
                </div>
              )}
            </div>
          </ScrollReveal>

        </div>
      </main>
    </>
  );
}
