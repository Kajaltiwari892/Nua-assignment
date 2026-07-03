import useSWR from "swr";
import { Product } from "@/types";
import { fetchProducts, searchProducts } from "@/data/products";

const fetcher = async () => fetchProducts();

export function useProducts() {
  const { data, error, isLoading } = useSWR<Product[]>("products", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  return {
    products: data || [],
    isLoading,
    isError: !!error,
  };
}

export function useProductSearch(query: string) {
  const { data, error, isLoading } = useSWR<Product[]>(
    query ? ["search", query] : null,
    query ? () => searchProducts(query) : null,
    {
      revalidateOnFocus: false,
    },
  );

  return {
    results: data || [],
    isLoading,
    isError: !!error,
  };
}
