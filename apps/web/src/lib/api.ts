const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

class ApiClient {
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }

  private setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {} } = options;
    const token = this.getToken();

    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}/${endpoint}`, config);

    if (response.status === 401) {
      // Try refresh
      const refreshed = await this.tryRefresh();
      if (refreshed) {
        return this.request<T>(endpoint, options);
      }
      this.clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('Session expired');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  private async tryRefresh(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      this.setTokens(data.accessToken, data.refreshToken);
      return true;
    } catch {
      return false;
    }
  }

  async uploadFile<T>(endpoint: string, file: File, fieldName = 'file'): Promise<T> {
    const token = this.getToken();
    const formData = new FormData();
    formData.append(fieldName, file);

    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Upload failed' }));
      throw new Error(error.message || 'Upload failed');
    }

    return response.json();
  }

  // Auth
  async register(data: { name: string; email: string; password: string }) {
    const result = await this.request<{ user: any; accessToken: string; refreshToken: string }>('auth/register', { method: 'POST', body: data });
    this.setTokens(result.accessToken, result.refreshToken);
    return result;
  }

  async login(data: { email: string; password: string }) {
    const result = await this.request<{ user: any; accessToken: string; refreshToken: string }>('auth/login', { method: 'POST', body: data });
    this.setTokens(result.accessToken, result.refreshToken);
    return result;
  }

  async getMe() {
    return this.request<any>('auth/me');
  }

  logout() {
    this.clearTokens();
  }

  // Resumes
  async getResumes() { return this.request<any[]>('resumes'); }
  async getResume(id: string) { return this.request<any>(`resumes/${id}`); }
  async createResume(data: any) { return this.request<any>('resumes', { method: 'POST', body: data }); }
  async updateResume(id: string, data: any) { return this.request<any>(`resumes/${id}`, { method: 'PUT', body: data }); }
  async deleteResume(id: string) { return this.request<any>(`resumes/${id}`, { method: 'DELETE' }); }
  async uploadResume(file: File) { return this.uploadFile<any>('resumes/upload', file); }

  // AI
  async getAiProviders() { return this.request<any[]>('ai/providers'); }
  async addAiProvider(data: any) { return this.request<any>('ai/providers', { method: 'POST', body: data }); }
  async testAiProvider(id: string) { return this.request<any>(`ai/providers/${id}/test`, { method: 'POST' }); }
  async aiOptimize(data: { resumeId: string; action: string }) { return this.request<any>('ai/optimize', { method: 'POST', body: data }); }

  // Health
  async health() { return this.request<any>('health'); }
}

export const api = new ApiClient();
