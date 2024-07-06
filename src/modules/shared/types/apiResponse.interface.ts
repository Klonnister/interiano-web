export interface ApiResponse {
  statusCode?: number,
  message: string,
}

export interface Meta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

export interface MetaInfo {
  total: number | undefined;
  perPage: number | undefined;
  lastPage: number | undefined;
}