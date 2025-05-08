import apiClient from './apiClient';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/login', credentials);
    
    // Store tokens
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('refreshToken', response.data.refresh_token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
  
  refreshToken: async (refreshToken: string): Promise<string> => {
    const response = await apiClient.post<{ access_token: string }>('/api/v1/auth/token', {
      refresh_token: refreshToken
    });
    
    localStorage.setItem('token', response.data.access_token);
    return response.data.access_token;
  },
  
  getCurrentUser: async (): Promise<User> => {
    const storedUser = localStorage.getItem('user');
    
    // If we have user data in localStorage, use that to avoid an extra API call
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // If the stored user data has the required fields, return it
      if (parsedUser.id && parsedUser.email && parsedUser.role) {
        return parsedUser as User;
      }
    }
    
    // Otherwise, get it from the API
    const response = await apiClient.get<User>('/api/v1/auth/me');
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
  
  getUserRole: (): string | null => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).role;
    }
    return null;
  },
  
  hasPermission: (requiredRole: string): boolean => {
    const userRole = authService.getUserRole();
    if (!userRole) return false;
    
    // Role hierarchy: admin > manager > officer > clerk
    const roles = ['clerk', 'officer', 'manager', 'admin'];
    const userRoleIndex = roles.indexOf(userRole);
    const requiredRoleIndex = roles.indexOf(requiredRole);
    
    // User has permission if their role is equal to or higher than the required role
    return userRoleIndex >= requiredRoleIndex;
  }
};

export default authService; 