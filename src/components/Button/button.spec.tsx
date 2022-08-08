import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ButtonAction } from './index';
import { AiOutlinePlus } from 'react-icons/ai';

const handleClick = jest.fn();

const buttonComponent = (
  <ButtonAction
    title="Teste"
    icon={<AiOutlinePlus />}
    type="button"
    onclick={handleClick}
    color="red"
  />
);

describe('<ButtonAction />', () => {
  it('button title is correct', () => {
    render(buttonComponent);

    const buttonTitle = screen.getByTitle(/teste/i);
    expect(buttonTitle).toBeInTheDocument();
  });

  it('when button is clicked, execute a function', () => {
    render(buttonComponent);
    const buttonTitle = screen.getByTitle(/teste/i);

    fireEvent.click(buttonTitle);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('check if exists an icon in button', () => {
    render(buttonComponent);
    const buttonTitle = screen
      .getByTitle(/teste/i)
      .querySelector('span')
      ?.querySelector('svg');

    expect(buttonTitle).toBeInTheDocument();
  });
});
