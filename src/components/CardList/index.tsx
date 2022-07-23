import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { UsersProps } from '../../models/users';
import { Card } from '../Card';
import { ErrorMessage } from '../ErrorMessage';
import { SkeletonLoading } from '../SkeletonLoading';
import { SpinnerLoading } from '../SpinnerLoading';
import { NotResultsFound } from '../NotResultsFound';
import { ModalForm } from '../ModalForm';
import { ConfirmationModal } from '../ConfirmationModal';

type CardListProps = {
  isLoading: boolean;
  error: unknown;
  results: UsersProps[] | undefined;
  loadingSearchFilter: boolean;
  requestUsersError: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export function CardList({
  results,
  isLoading,
  error,
  loadingSearchFilter,
  requestUsersError,
  isOpen,
  onClose,
}: CardListProps) {
  if (isLoading) {
    return <SkeletonLoading />;
  }

  if (error || requestUsersError) {
    return <ErrorMessage />;
  }

  if (loadingSearchFilter) {
    return <SpinnerLoading />;
  }

  return (
    <SimpleGrid spacing={20} mt="14" pb="14" minChildWidth="300px">
      {results?.length ? (
        results?.map((user) => (
          <Card
            key={user.id}
            id={user.id}
            image={user.picture}
            name={user.name}
            lastName={user.lastName}
            email={user.email}
            phone={user.phone}
            city={user.address.city}
            state={user.address.state}
          />
        ))
      ) : (
        <NotResultsFound />
      )}
      <ModalForm isOpen={isOpen} onClose={onClose} />
      <ConfirmationModal />
    </SimpleGrid>
  );
}
