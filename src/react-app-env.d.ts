/// <reference types="react-scripts" />

declare module 'react' {
  export interface JSX {
    IntrinsicElements: {
      [elemName: string]: any;
    };
  }
  
  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }
  
  export type JSXElementConstructor<P> = ((props: P) => ReactElement<any, any> | null) | (new (props: P) => Component<any, any>);
  export type Key = string | number;
  export class Component<P, S> {}
  
  export function lazy<T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>
  ): T;
  
  export const Suspense: ComponentType<{fallback?: ReactNode}>;
  export type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
  export type ComponentClass<P = {}> = new (props: P) => Component<P, any>;
  export type FunctionComponent<P = {}> = (props: P) => ReactElement<any, any> | null;
  export type ReactNode = ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;
  export interface ReactFragment {}
  export interface ReactPortal extends ReactElement {}
}

declare module 'react-router-dom' {
  export const Routes: any;
  export const Route: any;
  export const Navigate: any;
  export const Link: any;
  export const useParams: any;
  export const useNavigate: any;
  export const useLocation: any;
}

declare module 'react-query' {
  export const useQuery: any;
  export const useMutation: any;
  export const useQueryClient: any;
}

declare module 'formik' {
  export const Formik: any;
  export const Form: any;
  export const Field: any;
  export const ErrorMessage: any;
  export interface FormikHelpers<Values> {}
  export interface FormikErrors<Values> {}
  export interface FormikTouched<Values> {}
}

declare module 'yup'; 