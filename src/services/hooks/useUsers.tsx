import { useMutation, useQuery, UseQueryResult } from 'react-query';
import { UsersProps, CreateUserFormData } from '../../models/users';
import { api } from '../api';

export async function getUsers(): Promise<UsersProps[]> {
  const { data } = await api.get('/users');

  return data;
}

export function useUsers() {
  return useQuery(['users'], () => getUsers(), {
    staleTime: 1000 * 60 * 10,
  }) as UseQueryResult<UsersProps[], unknown>;
}

export function useUsersPost() {
  const mutation = useMutation((data: CreateUserFormData) => {
    return api.post('/users', data);
  });

  return mutation;
}
