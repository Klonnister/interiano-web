export interface Trademark {
  id: number,
  image: string | null,
  name: string,
}

export interface TrademarkResponse {
  id: number,
  name: string,
  image?: string,
  statusCode?: number,
}