import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from '@chakra-ui/react';
import { useDeleteUser } from '../../context/DeleteUserContext';

export function ConfirmationModal() {
  const { isOpen, onClose, isLoading, handleDeleteUser } = useDeleteUser();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Excluir usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Tem certeza que deseja excluir este usuário?</ModalBody>

        <ModalFooter>
          <Button mr={3} colorScheme="red" onClick={handleDeleteUser}>
            {isLoading ? <Spinner /> : 'Excluir'}
          </Button>
          <Button onClick={onClose} colorScheme="twitter">
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
