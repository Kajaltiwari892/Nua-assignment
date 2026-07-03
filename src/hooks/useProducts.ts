import useSWR from 'swr';
import { Product } from '@/types';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useProducts() {
  const { data, error, isLoading } = useSWR<Product[]>(
    'https://fakestoreapi.com/products',
    fetcher,
    { revalidateOnFocus: false }
  );
  return {
    products: data || [],
    isLoading,
    isError: !!error,
  };
}

export function useProductById(id: number) {
  const { data, error, isLoading } = useSWR<Product>(
    id ? `https://fakestoreapi.com/products/${id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );
  return { product: data, isLoading, isError: !!error };
}

export function useProductsByCategory(category: string) {
  const encodedCategory = encodeURIComponent(category);
  const { data, error, isLoading } = useSWR<Product[]>(
    category ? `https://fakestoreapi.com/products/category/${encodedCategory}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );
  return { products: data || [], isLoading, isError: !!error };
}
