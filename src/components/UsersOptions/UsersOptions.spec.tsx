import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TimerState } from '../../lib/timerMachine/timerMachineDeclarations';
import UsersOptions from './UsersOptions';

describe('<UsersOptions />', () => {
  it('renders all users', () => {
    const context: Pick<TimerState['context'], 'activeUsers' | 'inactiveUsers'> = {
      activeUsers: ['Liam', 'Emma', 'Noah', 'Olivia'],
      inactiveUsers: ['Harper', 'Mason', 'Evelyn', 'Logan'],
    };

    const { getByText } = render(
      <UsersOptions
        state={{ context } as TimerState}
        send={jest.fn()}
      />,
    );

    context.activeUsers.forEach((user) => {
      expect(getByText(user)).toBeInTheDocument();
    });
    context.inactiveUsers.forEach((user) => {
      expect(getByText(user)).toBeInTheDocument();
    });
  });

  it('adds a new user', async () => {
    const context: Pick<TimerState['context'], 'activeUsers' | 'inactiveUsers'> = {
      activeUsers: ['Liam', 'Emma', 'Noah'],
      inactiveUsers: ['Harper', 'Mason', 'Evelyn', 'Logan'],
    };

    const sendMock = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <UsersOptions
        state={{ context } as TimerState}
        send={sendMock}
      />,
    );

    const inputNewUser = getByPlaceholderText('New user…');
    fireEvent.change(inputNewUser, { target: { value: 'Olivia' } });
    fireEvent.click(getByTestId('submit-button'));

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({ users: expect.arrayContaining(['Olivia']) }));
  });

  it('doesn\'t add a new user with empty name', () => {
    const context: Pick<TimerState['context'], 'activeUsers' | 'inactiveUsers'> = {
      activeUsers: ['Liam', 'Emma', 'Noah'],
      inactiveUsers: ['Harper', 'Mason', 'Evelyn', 'Logan'],
    };

    const sendMock = jest.fn();
    const { getByTestId } = render(
      <UsersOptions
        state={{ context } as TimerState}
        send={sendMock}
      />,
    );

    fireEvent.click(getByTestId('submit-button'));

    expect(sendMock).not.toHaveBeenCalled();
  });

  it('shuffles users on shuffle button click', () => {
    const context: Pick<TimerState['context'], 'activeUsers' | 'inactiveUsers'> = {
      activeUsers: ['Liam', 'Emma', 'Noah'],
      inactiveUsers: ['Harper', 'Mason', 'Evelyn', 'Logan'],
    };

    const sendMock = jest.fn();

    const { getByTestId } = render(
      <UsersOptions
        state={{ context } as TimerState}
        send={sendMock}
      />,
    );

    fireEvent.click(getByTestId('shuffle-users-button'));

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
      users: expect.arrayContaining(context.activeUsers),
    }));
  });
});
