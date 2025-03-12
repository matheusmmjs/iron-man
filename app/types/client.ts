export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  dateOfBirth?: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ClientFormData = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>; 