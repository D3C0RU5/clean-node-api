export interface AuthUseCaseProps {
  email: string;
  password: string;
  accessToken: string;
  auth: (email: string, password: string) => Promise<string>;
}
