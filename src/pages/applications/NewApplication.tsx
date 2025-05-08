import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import MainLayout from '../../layouts/MainLayout';
import applicationService, { ApplicationFormData } from '../../api/applicationService';
import citizenService, { Citizen } from '../../api/citizenService';

// License categories
const LICENSE_CATEGORIES = [
  { value: 'A', label: 'A - Motorcycle' },
  { value: 'B', label: 'B - Light vehicle (car)' },
  { value: 'C', label: 'C - Heavy vehicle (truck)' },
  { value: 'EB', label: 'EB - Light articulated vehicle' },
  { value: 'EC', label: 'EC - Heavy articulated vehicle' }
];

// Application types
const APPLICATION_TYPES = [
  { value: 'NEW', label: 'New License' },
  { value: 'RENEWAL', label: 'License Renewal' },
  { value: 'REPLACEMENT', label: 'License Replacement' }
];

// Initial form values
const initialValues: ApplicationFormData = {
  citizen_id: '',
  category: '',
  application_type: 'NEW',
  notes: '',
  supporting_documents: []
};

// Form validation schema
const validationSchema = Yup.object().shape({
  citizen_id: Yup.string().required('Citizen ID is required'),
  category: Yup.string().required('License category is required'),
  application_type: Yup.string().required('Application type is required')
});

const NewApplication: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  
  // Search for citizens
  const { data: searchResults, isLoading: isSearching } = useQuery(
    ['citizenSearch', searchQuery],
    () => citizenService.searchCitizens(searchQuery),
    {
      enabled: searchQuery.length >= 3,
      staleTime: 60000
    }
  );
  
  // Create application mutation
  const createMutation = useMutation(
    (data: ApplicationFormData) => applicationService.createApplication(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('applications');
        navigate('/applications');
      }
    }
  );
  
  // Handle citizen selection
  const handleSelectCitizen = (citizen: Citizen) => {
    setSelectedCitizen(citizen);
    setSearchQuery('');
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFiles([...files, ...fileList]);
    }
  };
  
  // Remove file
  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  
  // Progress to next step
  const handleNextStep = () => {
    setStep(step + 1);
  };
  
  // Go back to previous step
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  // Handle form submission
  const handleSubmit = (values: ApplicationFormData, formikHelpers: FormikHelpers<ApplicationFormData>) => {
    if (!selectedCitizen) {
      return;
    }
    
    // Prepare final form data with selected citizen and files
    const formData: ApplicationFormData = {
      ...values,
      citizen_id: selectedCitizen.id,
      supporting_documents: files
    };
    
    // Submit the application
    createMutation.mutate(formData);
  };
  
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto pb-6">
        <h1 className="text-2xl font-bold mb-6">New License Application</h1>
        
        {/* Progress indicators */}
        <div className="flex mb-8">
          <div className={`flex-1 text-center ${step >= 1 ? 'text-primary font-medium' : 'text-gray-400'}`}>
            <div className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center mb-2 ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>1</div>
            <div>Citizen</div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className={`h-1 w-full ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
          </div>
          <div className={`flex-1 text-center ${step >= 2 ? 'text-primary font-medium' : 'text-gray-400'}`}>
            <div className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center mb-2 ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>2</div>
            <div>License Details</div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className={`h-1 w-full ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
          </div>
          <div className={`flex-1 text-center ${step >= 3 ? 'text-primary font-medium' : 'text-gray-400'}`}>
            <div className={`rounded-full w-8 h-8 mx-auto flex items-center justify-center mb-2 ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>3</div>
            <div>Documents</div>
          </div>
        </div>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form className="bg-white shadow-md rounded-lg p-6">
              {/* Step 1: Citizen Selection */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Select Citizen</h2>
                  
                  {selectedCitizen ? (
                    <div className="mb-6">
                      <div className="p-4 border rounded-md bg-gray-50">
                        <div className="font-medium">{selectedCitizen.first_name} {selectedCitizen.last_name}</div>
                        <div className="text-sm text-gray-600">ID: {selectedCitizen.id_number}</div>
                        <div className="text-sm text-gray-600">DOB: {new Date(selectedCitizen.date_of_birth).toLocaleDateString()}</div>
                        <button
                          type="button"
                          onClick={() => setSelectedCitizen(null)}
                          className="mt-2 text-sm text-primary hover:underline"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-4">
                        <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">
                          Search Citizen by ID Number or Name
                        </label>
                        <input
                          type="text"
                          id="searchQuery"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Enter ID number or name"
                          className="input w-full"
                        />
                        <p className="mt-1 text-sm text-gray-500">Enter at least 3 characters to search</p>
                      </div>
                      
                      {isSearching ? (
                        <div className="text-center py-4">
                          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary mx-auto"></div>
                        </div>
                      ) : searchQuery.length >= 3 && searchResults?.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">No citizens found</div>
                      ) : searchResults?.length > 0 ? (
                        <div className="border rounded-md overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left">ID Number</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {searchResults.map((citizen: Citizen) => (
                                <tr key={citizen.id}>
                                  <td className="px-4 py-2">{citizen.id_number}</td>
                                  <td className="px-4 py-2">{citizen.first_name} {citizen.last_name}</td>
                                  <td className="px-4 py-2">
                                    <button
                                      type="button"
                                      onClick={() => handleSelectCitizen(citizen)}
                                      className="text-primary hover:underline"
                                    >
                                      Select
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : null}
                    </div>
                  )}
                  
                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!selectedCitizen}
                      className={`btn ${!selectedCitizen ? 'btn-disabled' : 'btn-primary'}`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: License Details */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">License Details</h2>
                  
                  <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      License Category
                    </label>
                    <Field
                      as="select"
                      id="category"
                      name="category"
                      className="input w-full"
                    >
                      <option value="">Select category</option>
                      {LICENSE_CATEGORIES.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="category" component="div" className="mt-1 text-sm text-error" />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="application_type" className="block text-sm font-medium text-gray-700 mb-1">
                      Application Type
                    </label>
                    <Field
                      as="select"
                      id="application_type"
                      name="application_type"
                      className="input w-full"
                    >
                      {APPLICATION_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="application_type" component="div" className="mt-1 text-sm text-error" />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Notes (Optional)
                    </label>
                    <Field
                      as="textarea"
                      id="notes"
                      name="notes"
                      rows={3}
                      className="input w-full"
                      placeholder="Add any special notes or requirements"
                    />
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn btn-outline"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!values.category}
                      className={`btn ${!values.category ? 'btn-disabled' : 'btn-primary'}`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Supporting Documents */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Supporting Documents</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Documents
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        multiple
                        className="hidden"
                        id="fileUpload"
                      />
                      <label htmlFor="fileUpload" className="btn btn-outline btn-sm mb-2">
                        Browse files
                      </label>
                      <p className="text-xs text-gray-500">
                        Supported file formats: PDF, JPG, PNG (Max 5MB each)
                      </p>
                    </div>
                  </div>
                  
                  {files.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files</h3>
                      <ul className="border rounded-md divide-y">
                        {files.map((file, index) => (
                          <li key={index} className="p-3 flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              className="text-gray-400 hover:text-error"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn btn-outline"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
        
        {createMutation.isError && (
          <div className="mt-4 p-4 bg-error/10 text-error rounded-md">
            Error submitting application: {(createMutation.error as any)?.message || 'Unknown error'}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NewApplication; 