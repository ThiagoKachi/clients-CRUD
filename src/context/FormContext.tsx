import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneNumber } from '../utils/formatters/phone';
import { getUsersById } from '../services/hooks/useUsers';
import { CreateUserFormData } from '../models/users';
import { usePostPutUser } from './PostPutContext';

interface FormProviderProps {
  children: ReactNode;
}

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

const FormContext = createContext({} as any);

export function FormProvider({ children }: FormProviderProps) {
  const [userFormDefaultValues, setUserFormDefaultValues] = useState<any>({});
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const { userIdToEdit } = usePostPutUser();

  const { handleSubmit, register, formState, watch, setValue, reset } = useForm(
    {
      resolver: yupResolver(validationSchema),
      defaultValues: userFormDefaultValues,
    }
  );

  async function getUserById() {
    setIsLoadingDetails(true);
    if (userIdToEdit !== undefined) {
      await getUsersById(userIdToEdit)
        .then((e) => {
          reset(e);
          setUserFormDefaultValues(e);
        })
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

  const { errors } = formState;
  const phoneValue = watch('phone');

  const formValues = {
    handleSubmit,
    register,
    formState,
    watch,
    setValue,
    reset,
    getUserById,
    setDefaultValesNull,
    userFormDefaultValues,
    isLoadingDetails,
    errors,
    phoneValue,
  };

  return (
    <FormContext.Provider value={formValues}>{children}</FormContext.Provider>
  );
}

export const useFormContext = () => useContext(FormContext);
