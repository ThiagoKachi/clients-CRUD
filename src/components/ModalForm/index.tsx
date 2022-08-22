import React, { useEffect, useState } from 'react';
import {
  Button,
  Flex,
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
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { CreateUserFormData } from '../../models/users';
import { normalizePhoneNumber } from '../../utils/formatters/phone';
import { InputError } from '../InputError';
import { usePostPutUser } from '../../context/PostPutContext';
import { SpinnerLoading } from '../SpinnerLoading';
import { useFormContext } from '../../context/FormContext';

type ModalFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ModalForm({ isOpen, onClose }: ModalFormProps) {
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState('male');
  const handleClick = () => setShow(!show);

  const { handlePostOrPutUser, isLoading, isLoadingPut, isEdit } =
    usePostPutUser();

  const {
    handleSubmit,
    register,
    errors,
    setValue,
    reset,
    getUserById,
    setDefaultValesNull,
    isLoadingDetails,
    phoneValue,
  } = useFormContext();

  useEffect(() => {
    if (isEdit) {
      getUserById();
    } else {
      setDefaultValesNull();
    }
  }, [isEdit]);

  useEffect(() => {
    setValue('phone', normalizePhoneNumber(phoneValue));
  }, [phoneValue]);

  async function onSubmit(data: CreateUserFormData) {
    handlePostOrPutUser(data);
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEdit ? 'Editar usuário' : 'Criar usuário'}
          </ModalHeader>
          <ModalCloseButton />
          {isLoadingDetails ? (
            <Flex m="auto" py="4">
              <SpinnerLoading />
            </Flex>
          ) : (
            <Flex
              as="form"
              direction="column"
              onSubmit={() => handleSubmit(onSubmit)}
            >
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Nome *</FormLabel>
                  <Input placeholder="Nome completo" {...register('name')} />
                  {errors?.name?.type && (
                    <InputError message={errors.name.message} />
                  )}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Celular *</FormLabel>
                  <Input
                    type="tel"
                    placeholder="(99) 99999-9999"
                    {...register('phone')}
                    name="phone"
                  />
                  {errors?.phone?.type && (
                    <InputError message={errors.phone.message} />
                  )}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Gênero *</FormLabel>
                  <RadioGroup onChange={setGender} value={gender}>
                    <Stack direction="row">
                      <Radio value="male" {...register('gender')}>
                        Masculino
                      </Radio>
                      <Radio value="female" {...register('gender')}>
                        Feminino
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Foto de perfil (Link) *</FormLabel>
                  <Input placeholder="https://" {...register('avatar')} />
                  {errors?.avatar?.type && (
                    <InputError message={errors.avatar.message} />
                  )}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Email *</FormLabel>
                  <Input
                    placeholder="fulano@email.com"
                    type="text"
                    {...register('email')}
                  />
                  {errors?.email?.type && (
                    <InputError message={errors.email.message} />
                  )}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Senha *</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? 'text' : 'password'}
                      placeholder="Senha"
                      {...register('password')}
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
                  {errors?.password?.type && (
                    <InputError message={errors.password.message} />
                  )}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Confirmação de senha *</FormLabel>
                  <Input
                    placeholder="Confirme a senha"
                    type="password"
                    {...register('passwordConfirmation')}
                  />
                  {errors?.passwordConfirmation?.type && (
                    <InputError message={errors.passwordConfirmation.message} />
                  )}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Estado *</FormLabel>
                  <Input placeholder="Estado" {...register('address.state')} />
                  {errors?.address?.state?.type && (
                    <InputError message={errors.address.state.message} />
                  )}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Cidade *</FormLabel>
                  <Input placeholder="Cidade" {...register('address.city')} />
                  {errors?.address?.city?.type && (
                    <InputError message={errors.address.city.message} />
                  )}
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="twitter"
                  mr={3}
                  type="submit"
                  name="submitBtn"
                  disabled={isLoading || isLoadingPut}
                >
                  {isLoading || isLoadingPut ? (
                    <Spinner />
                  ) : isEdit ? (
                    'Editar usuário'
                  ) : (
                    'Criar usuário'
                  )}
                </Button>
                <Button
                  bg="red.400"
                  onClick={() => {
                    onClose();
                    reset();
                  }}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Flex>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
