import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';
import { Citizen, CitizenFormData } from '../../api/citizenService';

interface CitizenFormProps {
  initialValues: Partial<CitizenFormData>;
  onSubmit: (values: CitizenFormData) => Promise<void>;
  isLoading: boolean;
}

const citizenValidationSchema = Yup.object({
  id_number: Yup.string()
    .required('ID Number is required')
    .matches(/^[0-9]+$/, 'ID Number must contain only digits'),
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string().required('Last Name is required'),
  date_of_birth: Yup.date().required('Date of Birth is required'),
  gender: Yup.string().oneOf(['male', 'female', 'other'], 'Please select a valid gender').required('Gender is required'),
  address: Yup.string().required('Address is required'),
  phone_number: Yup.string().required('Phone Number is required'),
  email: Yup.string().email('Invalid email format'),
  nationality: Yup.string().required('Nationality is required'),
});

const CitizenForm: React.FC<CitizenFormProps> = ({ initialValues, onSubmit, isLoading }) => {
  const defaultValues: CitizenFormData = {
    id_number: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    address: '',
    phone_number: '',
    email: '',
    nationality: '',
    ...initialValues,
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={citizenValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, touched, errors }: { 
        isSubmitting: boolean; 
        touched: FormikTouched<CitizenFormData>; 
        errors: FormikErrors<CitizenFormData>;
      }) => (
        <Form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="id_number" className="label">ID Number</label>
              <Field
                type="text"
                id="id_number"
                name="id_number"
                className={`input w-full ${touched.id_number && errors.id_number ? 'border-error' : ''}`}
              />
              <ErrorMessage name="id_number" component="div" className="mt-1 text-sm text-error" />
            </div>

            <div>
              <label htmlFor="nationality" className="label">Nationality</label>
              <Field
                type="text"
                id="nationality"
                name="nationality"
                className={`input w-full ${touched.nationality && errors.nationality ? 'border-error' : ''}`}
              />
              <ErrorMessage name="nationality" component="div" className="mt-1 text-sm text-error" />
            </div>

            <div>
              <label htmlFor="first_name" className="label">First Name</label>
              <Field
                type="text"
                id="first_name"
                name="first_name"
                className={`input w-full ${touched.first_name && errors.first_name ? 'border-error' : ''}`}
              />
              <ErrorMessage name="first_name" component="div" className="mt-1 text-sm text-error" />
            </div>

            <div>
              <label htmlFor="last_name" className="label">Last Name</label>
              <Field
                type="text"
                id="last_name"
                name="last_name"
                className={`input w-full ${touched.last_name && errors.last_name ? 'border-error' : ''}`}
              />
              <ErrorMessage name="last_name" component="div" className="mt-1 text-sm text-error" />
            </div>

            <div>
              <label htmlFor="date_of_birth" className="label">Date of Birth</label>
              <Field
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                className={`input w-full ${touched.date_of_birth && errors.date_of_birth ? 'border-error' : ''}`}
              />
              <ErrorMessage name="date_of_birth" component="div" className="mt-1 text-sm text-error" />
            </div>

            <div>
              <label htmlFor="gender" className="label">Gender</label>
              <Field
                as="select"
                id="gender"
                name="gender"
                className={`input w-full ${touched.gender && errors.gender ? 'border-error' : ''}`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="mt-1 text-sm text-error" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="label">Address</label>
              <Field
                type="text"
                id="address"
                name="address"
                className={`input w-full ${touched.address && errors.address ? 'border-error' : ''}`}
              />
              <ErrorMessage name="address" component="div" className="mt-1 text-sm text-error" />
            </div>

            <div>
              <label htmlFor="phone_number" className="label">Phone Number</label>
              <Field
                type="tel"
                id="phone_number"
                name="phone_number"
                className={`input w-full ${touched.phone_number && errors.phone_number ? 'border-error' : ''}`}
              />
              <ErrorMessage name="phone_number" component="div" className="mt-1 text-sm text-error" />
            </div>

            <div>
              <label htmlFor="email" className="label">Email (Optional)</label>
              <Field
                type="email"
                id="email"
                name="email"
                className={`input w-full ${touched.email && errors.email ? 'border-error' : ''}`}
              />
              <ErrorMessage name="email" component="div" className="mt-1 text-sm text-error" />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Citizen'
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CitizenForm; 