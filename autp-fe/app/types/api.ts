export interface PaginatedMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginatedMeta;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface LoginResponse {
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      username: string;
      name: string;
    };
  };
}
