export type RegisterUser = {
    name: string;
    surname: string;
    email: string;
    password: string;
  };
  
  export type LoginUser = Partial<RegisterUser>;
  
  export type AxiosErrorResponse = {
    response: {
      data: {
        message?: string;
        errors?: {[key: string]: string}[]
      };
      status: number;
      statusText: string;
      headers: Record<string, string>;
    };
  };
  
  export type requestError = {
    message: string;
  };
  