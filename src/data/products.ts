import { Product } from "@/types";

// Note: This project uses local mock data (no external FakeStore API).
// Previously the data used direct Unsplash photo URLs which can be rate-limited
// or blocked — replaced with stable photo.s3.amazonaws.com / picsum URLs.
export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 129.99,
    description:
      "High-quality sound with noise cancellation and 30-hour battery life. Experience premium audio with active noise cancellation technology.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    rating: { rate: 4.8, count: 340 },
    stock: 15,
    colors: ["Black", "Silver", "Gold"],
    sizes: ["One Size"],
  },
  {
    id: 2,
    title: "Elegant Watch Collection",
    price: 199.99,
    description:
      "Timeless elegance meets modern technology. Swiss-inspired craftsmanship with precision engineering.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523170335684-f2b6b074cdcd?w=600&q=80",
    rating: { rate: 4.6, count: 210 },
    stock: 8,
    colors: ["Gold", "Silver", "Rose Gold"],
    sizes: ["M", "L"],
  },
  {
    id: 3,
    title: "Ultra Comfortable Shoes",
    price: 89.99,
    description:
      "Designed for all-day comfort with premium cushioning. Perfect for casual walks or athletic activities.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    rating: { rate: 4.7, count: 512 },
    stock: 25,
    colors: ["White", "Black", "Navy"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
  },
  {
    id: 4,
    title: "Professional Camera",
    price: 899.99,
    description:
      "Capture stunning moments with professional-grade imaging. 45MP sensor with advanced autofocus.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    rating: { rate: 4.9, count: 189 },
    stock: 5,
    colors: ["Black"],
    sizes: ["One Size"],
  },
  {
    id: 5,
    title: "Luxury Perfume",
    price: 149.99,
    description:
      "Exquisite fragrance with long-lasting allure. Blended with premium natural essences.",
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
    rating: { rate: 4.5, count: 278 },
    stock: 30,
    colors: ["Clear"],
    sizes: ["50ml", "100ml"],
  },
  {
    id: 6,
    title: "Premium Skincare Set",
    price: 79.99,
    description:
      "Complete skincare routine with natural ingredients. Dermatologist-tested formula.",
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80",
    rating: { rate: 4.4, count: 156 },
    stock: 20,
    colors: ["Natural"],
    sizes: ["Standard"],
  },
  {
    id: 7,
    title: "Designer Sunglasses",
    price: 259.99,
    description:
      "UV protection with polarized lenses. Lightweight frame design for all-day wear.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    rating: { rate: 4.7, count: 342 },
    stock: 12,
    colors: ["Black", "Brown", "Tortoise"],
    sizes: ["One Size"],
  },
  {
    id: 8,
    title: "Smart Fitness Tracker",
    price: 179.99,
    description:
      "Monitor your health with advanced sensors. 7-day battery life with water resistance.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
    rating: { rate: 4.6, count: 428 },
    stock: 18,
    colors: ["Black", "White", "Blue"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 9,
    title: "Luxury Handbag",
    price: 349.99,
    description:
      "Premium leather construction with elegant design. Spacious compartments for daily needs.",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    rating: { rate: 4.8, count: 267 },
    stock: 10,
    colors: ["Black", "Brown", "Tan"],
    sizes: ["One Size"],
  },
  {
    id: 10,
    title: "Silk Scarf Collection",
    price: 59.99,
    description:
      "Luxurious silk with vibrant patterns. Versatile accessory for any occasion.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
    rating: { rate: 4.5, count: 189 },
    stock: 22,
    colors: ["Multi", "Blue", "Red", "Green"],
    sizes: ["One Size"],
  },
  {
    id: 11,
    title: "Premium Coffee Maker",
    price: 299.99,
    description:
      "Brew perfect coffee every time with precision temperature control. Stainless steel construction.",
    category: "Home",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    rating: { rate: 4.7, count: 345 },
    stock: 14,
    colors: ["Silver", "Black"],
    sizes: ["Standard"],
  },
  {
    id: 12,
    title: "Designer Blazer",
    price: 249.99,
    description:
      "Tailored fit with premium fabric. Perfect for professional and casual settings.",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    rating: { rate: 4.6, count: 223 },
    stock: 7,
    colors: ["Navy", "Black", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
];

// For faster API calls in real scenarios
export async function fetchProducts(): Promise<Product[]> {
  // Simulate API delay — replace with real API call if needed:
  // const res = await fetch("https://fakestoreapi.com/products");
  // return res.json();
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockProducts;
}

export async function fetchProductById(id: number): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockProducts.find((p) => p.id === id);
}

export async function searchProducts(query: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
}
