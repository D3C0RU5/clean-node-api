export interface EmailValidatorProps {
  isEmailValid: boolean;
  isValid: (email: string) => boolean;
}
