type UserAddress = {
  state: string;
  city: string;
};

export interface UsersProps {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  gender: string;
  avatar: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  address: UserAddress;
}

export interface CreateUserFormData {
  id?: number;
  name?: string;
  phone?: string;
  gender?: string;
  avatar?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  address?: UserAddress;
}
