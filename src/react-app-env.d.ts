/// <reference types="react-scripts" />

declare module 'react' {
  export interface JSX {
    IntrinsicElements: any;
  }
}

declare module 'react-router-dom';
declare module 'react-query';
declare module 'formik';
declare module 'yup'; 