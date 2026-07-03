import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

interface FilterSidebarProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function FilterSidebar({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  onReset,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-background border-r border-border p-6 transform transition-transform md:transform-none ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-bold text-foreground">Filters</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="w-full mb-6"
          >
            Reset Filters
          </Button>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center justify-between w-full py-2 font-semibold text-foreground hover:text-primary transition"
          >
            Category
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                isCategoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isCategoryOpen && (
            <div className="space-y-2 mt-4">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm text-foreground">{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="mb-8">
          <button
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="flex items-center justify-between w-full py-2 font-semibold text-foreground hover:text-primary transition"
          >
            Price
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                isPriceOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isPriceOpen && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  Min Price
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[0]}
                  onChange={(e) =>
                    onPriceChange([parseInt(e.target.value), priceRange[1]])
                  }
                  className="w-full"
                />
                <div className="text-sm text-foreground font-semibold">
                  ${priceRange[0]}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  Max Price
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    onPriceChange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
                <div className="text-sm text-foreground font-semibold">
                  ${priceRange[1]}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div>
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center justify-between w-full py-2 font-semibold text-foreground hover:text-primary transition"
          >
            Rating
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                isCategoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isCategoryOpen && (
            <div className="space-y-2 mt-4">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm text-foreground">
                    {"★".repeat(rating)}
                    {"☆".repeat(5 - rating)} & up
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
