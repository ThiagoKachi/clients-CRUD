import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { queryClient } from '../services/queryClient';
import { useUsersDelete } from '../services/hooks/useUsers';

interface SearchProviderProps {
  children: ReactNode;
}

interface SearchContextData {
  userId: number;
  setUserId: (newState: number) => void;
  isLoading: boolean;
  handleDeleteUser: () => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DeleteUserContext = createContext({} as SearchContextData);

export function DeleteUserProvider({ children }: SearchProviderProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userId, setUserId] = useState<number>(0);
  const { mutate, isLoading } = useUsersDelete();

  async function handleDeleteUser() {
    await mutate(userId, {
      onSuccess: () => {
        toast({
          position: 'top-right',
          title: 'Usuário excluido com sucesso!',
          description: '',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      },
      onError(error) {
        toast({
          position: 'top-right',
          title: 'Erro ao tentar excluir usuário!',
          description: `${error}`,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      },
      onSettled() {
        onClose();
        queryClient.invalidateQueries(['users']);
      },
    });
  }

  const searchValues = {
    userId,
    setUserId,
    handleDeleteUser,
    isOpen,
    onOpen,
    onClose,
    isLoading,
  };

  return (
    <DeleteUserContext.Provider value={searchValues}>
      {children}
    </DeleteUserContext.Provider>
  );
}

export const useDeleteUser = () => useContext(DeleteUserContext);
