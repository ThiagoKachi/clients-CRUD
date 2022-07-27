import { useInfiniteQuery, useMutation } from 'react-query';
import { UsersProps, CreateUserFormData } from '../../models/users';
import { api } from '../api';

type Users = {
  pageParam?: number;
};

export async function getUsers({
  pageParam = 1,
}: Users): Promise<UsersProps[]> {
  const { data } = await api.get(`/users?_page=${pageParam}&_limit=9`);

  return data;
}

export async function getUsersById(
  id: number | undefined
): Promise<UsersProps[]> {
  const { data } = await api.get(`/users/${id}`);

  return data;
}

export function useUsersInfinit() {
  return useInfiniteQuery(['users'], getUsers, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
}

export function useUsersPost() {
  const mutation = useMutation((data: CreateUserFormData) => {
    return api.post('/users', data);
  });

  return mutation;
}

export function useUsersPut(userId: number | undefined) {
  const mutation = useMutation((data: CreateUserFormData) => {
    return api.put(`/users/${userId}`, data);
  });

  return mutation;
}

export function useUsersDelete() {
  const mutationDelete = useMutation((id: number) => {
    return api.delete(`/users/${id}`);
  });

  return mutationDelete;
}
