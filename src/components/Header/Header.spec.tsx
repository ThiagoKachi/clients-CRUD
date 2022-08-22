import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './index';

describe('<Header />', () => {
  it('show logo', () => {
    render(<Header />);

    const logo = screen.getByText(/usersCRUD/i);

    expect(logo).toBeInTheDocument();
  });

  it('show profile infos', () => {
    render(<Header />);

    const userName = screen.getByText(/Thiago Kachinsky/i);
    const userEmail = screen.getByText(/tjk091@gmail.com/i);
    const userPhoto = screen.getByRole('img', { name: 'Thiago Kachinsky' });

    expect(userName).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
    expect(userPhoto).toBeInTheDocument();
  });
});
