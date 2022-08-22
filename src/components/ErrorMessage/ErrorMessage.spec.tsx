import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardList } from '../CardList';

const mockFn = jest.fn();

const cardListComponent = (
  <CardList
    results={undefined}
    isLoading={false}
    error={null}
    loadingSearchFilter={false}
    requestUsersError={true}
    isOpen={false}
    onClose={mockFn}
  />
);

describe('<ErrorMessage />', () => {
  it('show error message', () => {
    render(cardListComponent);

    const errorMessage = screen.getByText(
      /Erro ao solicitar lista de usuários/i
    );
    const errorMessageTryAgain = screen.getByText(
      /Por favor, tente novamente ou entre em contato com o suporte./i
    );

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessageTryAgain).toBeInTheDocument();
  });
});
