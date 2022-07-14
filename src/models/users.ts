type UserAddress = {
  country: string;
  state: string;
  city: string;
};

export interface UsersProps {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  genre: string;
  picture: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  address: UserAddress;
}
