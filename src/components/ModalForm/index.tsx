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
  useToast,
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
import { useUsersPost } from '../../services/hooks/useUsers';
import { queryClient } from '../../services/queryClient';

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
  const toast = useToast();

  const { isLoading, mutate } = useUsersPost();
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState('male');
  const handleClick = () => setShow(!show);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const { handleSubmit, register, formState, watch, setValue, reset } = useForm(
    {
      resolver: yupResolver(validationSchema),
      defaultValues: {
        name: '',
        phone: '',
        gender: 'male',
        avatar: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        address: {
          state: '',
          city: '',
        },
      },
    }
  );

  const { errors } = formState;
  // Aplicar máscara de telefone com RHF
  const phoneValue = watch('phone');

  useEffect(() => {
    setValue('phone', normalizePhoneNumber(phoneValue));
  }, [phoneValue]);

  async function onSubmit(data: CreateUserFormData) {
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
        reset();
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
          <Flex as="form" direction="column" onSubmit={handleSubmit(onSubmit)}>
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
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : 'Criar usuário'}
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
        </ModalContent>
      </Modal>
    </>
  );
}
