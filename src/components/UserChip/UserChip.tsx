import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import { Steering } from 'mdi-material-ui';

const useStyles = makeStyles((theme: Theme) => createStyles({
  chip: {
    fontSize: theme.typography.body1.fontSize,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
}));

interface UserChipProps {
  name: string;
  driver?: boolean;
  onClick?: () => void;
  onClear?: () => void;
}

export default function UserChip({
  name, driver, onClick, onClear,
}: UserChipProps): ReactElement {
  const driverIcon = driver ? <Steering /> : undefined;

  const classes = useStyles();
  return (
    <Chip
      className={classes.chip}
      icon={driverIcon}
      label={name}
      onClick={onClick}
      onDelete={onClear}
    />
  );
}

UserChip.defaultProps = {
  driver: false,
  onClick: () => { /* Do nothing */ },
  onClear: () => { /* Do nothing */ },
};
