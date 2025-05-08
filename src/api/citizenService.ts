import apiClient from './apiClient';

export interface Citizen {
  id: string;
  id_number: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  address: string;
  phone_number: string;
  email?: string;
  nationality: string;
  created_at: string;
  updated_at: string;
}

export interface CitizenFormData {
  id_number: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  address: string;
  phone_number: string;
  email?: string;
  nationality: string;
}

const citizenService = {
  getCitizens: async (page = 1, limit = 10): Promise<{ data: Citizen[], total: number }> => {
    const response = await apiClient.get('/api/v1/citizens/', {
      params: { page, limit }
    });
    return response.data;
  },
  
  getCitizen: async (citizenId: string): Promise<Citizen> => {
    const response = await apiClient.get(`/api/v1/citizens/${citizenId}`);
    return response.data;
  },
  
  createCitizen: async (citizenData: CitizenFormData): Promise<Citizen> => {
    const response = await apiClient.post('/api/v1/citizens/', citizenData);
    return response.data;
  },
  
  updateCitizen: async (citizenId: string, citizenData: Partial<CitizenFormData>): Promise<Citizen> => {
    const response = await apiClient.put(`/api/v1/citizens/${citizenId}`, citizenData);
    return response.data;
  },
  
  deleteCitizen: async (citizenId: string): Promise<void> => {
    await apiClient.delete(`/api/v1/citizens/${citizenId}`);
  },
  
  searchCitizens: async (query: string): Promise<Citizen[]> => {
    const response = await apiClient.get('/api/v1/citizens/search', {
      params: { query }
    });
    return response.data;
  },
  
  getCitizenLicenses: async (citizenId: string): Promise<any[]> => {
    const response = await apiClient.get(`/api/v1/citizens/${citizenId}/licenses`);
    return response.data;
  },
  
  getExternalCitizenData: async (idNumber: string): Promise<any> => {
    const response = await apiClient.get(`/api/v1/external/citizen/${idNumber}`);
    return response.data;
  }
};

export default citizenService; 