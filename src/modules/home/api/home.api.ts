import http from "@/shared/http/client";
import type { ApiResponse } from "@/shared/http/types";
import type { ProductItem } from "../types";

export function getHomeProducts(){
  return http.get<ApiResponse<ProductItem[]>>('/home/products')
}
