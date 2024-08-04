import type { ApiResponse, Meta } from "./apiResponse.interface";

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

export interface TrademarksResponse extends ApiResponse {
  data: Trademark[],
  meta: Meta;
}