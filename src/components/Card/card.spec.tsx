import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './index';

const cardComponent = (
  <Card
    id={2}
    image="https://avatars.githubusercontent.com/u/61670495?v=4"
    name="Thiago"
    lastName="Kachinsky"
    email="tjk@gmail.com"
    phone="(47) 99175-1457"
    state="Santa Catarina"
    city="Rio Negrinho"
  />
);

describe('<Card />', () => {
  it('user infos to be in the card', () => {
    render(cardComponent);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    const name = screen.getByText(/thiago kachinsky/i);
    expect(name).toBeInTheDocument();
    const email = screen.getByText(/tjk@gmail.com/i);
    expect(email).toBeInTheDocument();
    const phone = screen.getByText('(47) 99175-1457');
    expect(phone).toBeInTheDocument();
    const state = screen.getByText(/Santa Catarina/i);
    expect(state).toBeInTheDocument();
    const city = screen.getByText(/Rio Negrinho/i);
    expect(city).toBeInTheDocument();
  });

  it('buttons actions to be in the card', () => {
    render(cardComponent);

    const editBtnEdit = screen.getByTitle(/editar/i);
    const editBtnDelete = screen.getByTitle(/excluir/i);
    expect(editBtnEdit).toBeInTheDocument();
    expect(editBtnDelete).toBeInTheDocument();
  });
});
