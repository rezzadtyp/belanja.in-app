"use client";

import { axiosInstance } from "@/lib/axios";
import { Product } from "@/types/product.type";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const getProducts = async () => {
    try {
      const { data } = await axiosInstance.get<Product[]>("/products");
      setProducts(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching product:", error.message);
      }
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return { products, refetch: getProducts };
};

export default useGetProducts;