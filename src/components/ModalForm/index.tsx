import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { CreateUserFormData } from '../../models/users';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  normalizePhoneNumber,
  phoneNumber,
} from '../../utils/formatters/phone';
import { InputError } from '../InputError';
import { usePostPutUser } from '../../context/PostPutContext';
import { getUsersById } from '../../services/hooks/useUsers';
import { SpinnerLoading } from '../SpinnerLoading';

type ModalFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const validationSchema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  phone: yup
    .string()
    .matches(phoneNumber, 'Formato do telefone é inválido')
    .required('Telefone obrigatório'),
  avatar: yup.string().required('Avatar obrigatório'),
  email: yup
    .string()
    .email('Email precisa ter um formato válido')
    .required('Email obrigatório'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
  passwordConfirmation: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais.'),
  address: yup.object().shape({
    state: yup.string().required('Estado obrigatório'),
    city: yup.string().required('Cidade obrigatório'),
  }),
});

export function ModalForm({ isOpen, onClose }: ModalFormProps) {
  const [userFormDefaultValues, setUserFormDefaultValues] = useState<any>();
  const [show, setShow] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [gender, setGender] = useState('male');
  const handleClick = () => setShow(!show);

  // Fazer verificação para não deixar cadastrar usuários com o mesmo número de celular
  // Aplicar mutation na rota de getUsersById
  // Fazer tratativa de erro em todas as chamadas API

  const { handlePostOrPutUser, isLoading, isLoadingPut, isEdit, userIdToEdit } =
    usePostPutUser();

  const { handleSubmit, register, formState, watch, setValue, reset } = useForm(
    {
      resolver: yupResolver(validationSchema),
      defaultValues: userFormDefaultValues,
    }
  );

  useEffect(() => {
    async function getUserById() {
      setIsLoadingDetails(true);
      if (userIdToEdit !== undefined) {
        await getUsersById(userIdToEdit)
          .then((e) => {
            reset(e);
            setUserFormDefaultValues(e);
          })
          .then((e) => console.log(e, 'ere'))
          .catch((err) => console.log(err))
          .finally(() => {
            setIsLoadingDetails(false);
          });
      }
    }
    function setDefaultValesNull() {
      const defaultValues: CreateUserFormData = {};

      setUserFormDefaultValues(defaultValues);
      reset(defaultValues);
    }
    if (isEdit) {
      getUserById();
    } else {
      setDefaultValesNull();
    }
  }, [userIdToEdit, isEdit, reset]);

  const { errors } = formState;
  // Aplicar máscara de telefone com RHF
  const phoneValue = watch('phone');

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
              onSubmit={handleSubmit(onSubmit)}
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
