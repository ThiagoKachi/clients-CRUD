import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { queryClient } from '../services/queryClient';
import { CreateUserFormData } from '../models/users';
import {
  getUsersById,
  useUsersPost,
  useUsersPut,
} from '../services/hooks/useUsers';
import { useSearch } from './SearchContext';

interface PostPutProviderProps {
  children: ReactNode;
}

interface PostPutContextData {
  handlePostOrPutUser: (data: CreateUserFormData) => void;
  isLoading: boolean;
  setIsEdit: (newState: boolean) => void;
  isEdit: boolean;
  userIdToEdit: number | undefined;
  setUserIdToEdit: (newState: number | undefined) => void;
  isLoadingPut: boolean;
}

const PostPutUserContext = createContext({} as PostPutContextData);

export function PostPutUserProvider({ children }: PostPutProviderProps) {
  const [userIdToEdit, setUserIdToEdit] = useState<number | undefined>(
    undefined
  );
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const toast = useToast();
  const { isLoading, mutate } = useUsersPost();
  const { isLoading: isLoadingPut, mutate: mutatePut } =
    useUsersPut(userIdToEdit);
  const { onClose } = useSearch();

  async function handlePostOrPutUser(data: CreateUserFormData) {
    if (isEdit) {
      await mutatePut(
        { ...data, id: userIdToEdit },
        {
          onSuccess: () => {
            onClose();
            toast({
              position: 'top-right',
              title: 'Usuário atualizado com sucesso!',
              description: '',
              status: 'success',
              duration: 2000,
              isClosable: true,
            });
          },
          onError(error) {
            toast({
              position: 'top-right',
              title: 'Erro ao tentar atualizar usuário!',
              description: `${error}`,
              status: 'error',
              duration: 2000,
              isClosable: true,
            });
          },
          onSettled() {
            queryClient.invalidateQueries(['users']);
            setUserIdToEdit(undefined);
          },
        }
      );
    } else {
      await mutate(data, {
        onSuccess: () => {
          onClose();
          toast({
            position: 'top-right',
            title: 'Usuário criado com sucesso!',
            description: '',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        },
        onError(error) {
          toast({
            position: 'top-right',
            title: 'Erro ao cadastrar usuário!',
            description: `${error}`,
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        },
        onSettled() {
          queryClient.invalidateQueries(['users']);
        },
      });
    }
  }

  const postOrPutValues = {
    handlePostOrPutUser,
    isLoading,
    setIsEdit,
    isEdit,
    userIdToEdit,
    setUserIdToEdit,
    isLoadingPut,
  };

  return (
    <PostPutUserContext.Provider value={postOrPutValues}>
      {children}
    </PostPutUserContext.Provider>
  );
}

export const usePostPutUser = () => useContext(PostPutUserContext);
