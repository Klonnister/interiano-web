import type { ApiResponse } from "./apiResponse.interface";

export interface ProfileInfo extends ApiResponse {
  username: string,
  image: string | null,
}