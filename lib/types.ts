export interface FormFields {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string[] | undefined;
  password?: string[] | undefined;
}

export interface FormState extends FormFields {
  errors?: FormErrors | undefined;
}

export interface User {
  email: string;
}

export interface ICountyVisitsInfo {
  name: string;
  visits: number;
}