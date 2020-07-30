import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserChip from './UserChip';

describe('<UserChip />', () => {
  it('renders name', () => {
    const name = 'Sophia';
    const { getByText } = render(
      <UserChip
        name={name}
        driver
        onClick={jest.fn()}
        onClear={jest.fn()}
      />,
    );

    expect(getByText(name)).toBeInTheDocument();
  });

  it('calls onClick on chip click', () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(
      <UserChip
        name="Sophia"
        driver
        onClick={onClickMock}
        onClear={jest.fn()}
      />,
    );

    const chip = getByRole('button');
    fireEvent.click(chip);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
