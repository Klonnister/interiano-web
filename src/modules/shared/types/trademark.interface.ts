import type { ApiResponse } from "./apiResponse.interface";

export interface Trademark {
  id: number,
  image: string | null,
  name: string,
}

export interface TrademarkResponse extends ApiResponse {
  id: number,
  name: string,
  image?: string,
}