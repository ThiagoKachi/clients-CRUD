import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ConfirmationModal } from './index';

const mockFnDelete = jest.fn();
const mockFnClose = jest.fn();

const ConfirmationModalComponent = (
  <ConfirmationModal
    isOpen={true}
    isLoading={false}
    handleDeleteUser={mockFnDelete}
    onClose={mockFnClose}
  />
);

describe('<ConfirmationModal />', () => {
  it('check texts in delete modal', () => {
    render(ConfirmationModalComponent);

    const deleteMessageHeader = screen.getByText(/Excluir usuário/i);
    const deleteMessage = screen.getByText(
      /Tem certeza que deseja excluir este usuário?/i
    );

    expect(deleteMessageHeader).toBeInTheDocument();
    expect(deleteMessage).toBeInTheDocument();
  });

  it('check if buttons execute a function when clicked', () => {
    render(ConfirmationModalComponent);

    const buttonDelete = screen.getByRole('button', { name: /excluir/i });
    const buttonClose = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(buttonDelete);
    expect(mockFnDelete).toBeCalledTimes(1);
    fireEvent.click(buttonClose);
    expect(mockFnClose).toBeCalledTimes(1);
  });
});
