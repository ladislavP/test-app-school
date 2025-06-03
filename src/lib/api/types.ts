// src/lib/api/types.ts
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export interface School {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface Device {
  id: string;
  name: string;
  status: 'green' | 'yellow' | 'red';
  lastUpdated: string;
}

export interface QRScanResponse {
  success: boolean;
  message: string;
  deviceId?: string;
}

export interface ApiError {
  message: string;
  code: string;
}
