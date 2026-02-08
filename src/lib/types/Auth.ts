export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  email: string;
  role: "OPERATOR" | "SUPERVISOR";
}