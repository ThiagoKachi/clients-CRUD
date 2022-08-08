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

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  handleDeleteUser: () => void;
};

export function ConfirmationModal({
  isOpen,
  onClose,
  isLoading,
  handleDeleteUser,
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Excluir usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Tem certeza que deseja excluir este usuário?</ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            colorScheme="red"
            onClick={handleDeleteUser}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : 'Excluir'}
          </Button>
          <Button onClick={onClose} colorScheme="twitter" disabled={isLoading}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
