import apiClient from './apiClient';

export interface LicenseApplication {
  id: string;
  citizen_id: string;
  category: string;
  application_type: 'NEW' | 'RENEWAL' | 'REPLACEMENT';
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'DOCUMENTS_REQUESTED' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  notes?: string;
  supporting_documents?: string[];
  created_at: string;
  updated_at: string;
}

export interface ApplicationFormData {
  citizen_id: string;
  category: string;
  application_type: 'NEW' | 'RENEWAL' | 'REPLACEMENT';
  notes?: string;
  supporting_documents?: File[];
}

const applicationService = {
  getApplications: async (page = 1, limit = 10): Promise<{ data: LicenseApplication[], total: number }> => {
    const response = await apiClient.get('/api/v1/applications/', {
      params: { page, limit }
    });
    return response.data;
  },
  
  getApplication: async (applicationId: string): Promise<LicenseApplication> => {
    const response = await apiClient.get(`/api/v1/applications/${applicationId}`);
    return response.data;
  },
  
  getPendingApplications: async (page = 1, limit = 10): Promise<{ data: LicenseApplication[], total: number }> => {
    const response = await apiClient.get('/api/v1/applications/pending', {
      params: { page, limit }
    });
    return response.data;
  },
  
  createApplication: async (applicationData: ApplicationFormData): Promise<LicenseApplication> => {
    // Handle file uploads if any
    if (applicationData.supporting_documents && applicationData.supporting_documents.length > 0) {
      const formData = new FormData();
      
      // Add non-file fields to the form data
      Object.keys(applicationData).forEach(key => {
        if (key !== 'supporting_documents') {
          formData.append(key, (applicationData as any)[key]);
        }
      });
      
      // Add the files
      applicationData.supporting_documents.forEach(file => {
        formData.append('files', file);
      });
      
      const response = await apiClient.post('/api/v1/applications/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    }
    
    // If no files, just send JSON
    const response = await apiClient.post('/api/v1/applications/', applicationData);
    return response.data;
  },
  
  updateApplication: async (applicationId: string, applicationData: Partial<ApplicationFormData>): Promise<LicenseApplication> => {
    // Handle file uploads if any
    if (applicationData.supporting_documents && applicationData.supporting_documents.length > 0) {
      const formData = new FormData();
      
      // Add non-file fields to the form data
      Object.keys(applicationData).forEach(key => {
        if (key !== 'supporting_documents') {
          formData.append(key, (applicationData as any)[key]);
        }
      });
      
      // Add the files
      applicationData.supporting_documents.forEach(file => {
        formData.append('files', file);
      });
      
      const response = await apiClient.put(`/api/v1/applications/${applicationId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    }
    
    // If no files, just send JSON
    const response = await apiClient.put(`/api/v1/applications/${applicationId}`, applicationData);
    return response.data;
  },
  
  deleteApplication: async (applicationId: string): Promise<void> => {
    await apiClient.delete(`/api/v1/applications/${applicationId}`);
  },
  
  approveApplication: async (applicationId: string, notes?: string): Promise<any> => {
    const response = await apiClient.post(`/api/v1/applications/${applicationId}/approve`, { notes });
    return response.data;
  },
  
  rejectApplication: async (applicationId: string, reason: string): Promise<any> => {
    const response = await apiClient.post(`/api/v1/applications/${applicationId}/reject`, { reason });
    return response.data;
  },
  
  requestDocuments: async (applicationId: string, documentList: string[]): Promise<any> => {
    const response = await apiClient.post(`/api/v1/applications/${applicationId}/request-documents`, { documentList });
    return response.data;
  },
  
  getCitizenApplications: async (citizenId: string): Promise<LicenseApplication[]> => {
    const response = await apiClient.get(`/api/v1/applications/citizen/${citizenId}`);
    return response.data;
  }
};

export default applicationService; 