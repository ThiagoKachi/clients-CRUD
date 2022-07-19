import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

type ModalFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ModalForm({ isOpen, onClose }: ModalFormProps) {
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState('male');
  const handleClick = () => setShow(!show);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome completo</FormLabel>
              <Input ref={initialRef} placeholder="Nome completo" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Telefone</FormLabel>
              <Input placeholder="Telefone" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Gênero</FormLabel>
              <RadioGroup onChange={setGender} value={gender}>
                <Stack direction="row">
                  <Radio value="male">Masculino</Radio>
                  <Radio value="female">Feminino</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Foto de perfil (Link)</FormLabel>
              <Input placeholder="https://" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" type="email" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Senha</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Senha"
                />
                <InputRightElement width="4.8rem">
                  <Button
                    h="1.75rem"
                    mr="1"
                    size="sm"
                    onClick={handleClick}
                    bg="twitter"
                    _hover={{ backgroundColor: 'none' }}
                    _active={{ backgroundColor: 'none' }}
                  >
                    {show ? 'Esconder' : 'Mostrar'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Confirmação de senha</FormLabel>
              <Input placeholder="Confirmação de senha" type="password" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Estado</FormLabel>
              <Input placeholder="Estado" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Cidade</FormLabel>
              <Input placeholder="Cidade" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="twitter" mr={3}>
              Criar usuário
            </Button>
            <Button bg="red.400" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
