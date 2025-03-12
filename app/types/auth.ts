export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company: {
    id: string;
    name: string;
  };
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
} 