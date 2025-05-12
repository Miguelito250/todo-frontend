export interface ApiRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  body?: any;
  params?: Record<string, string>;
  headers?: Record<string, string>;
}
