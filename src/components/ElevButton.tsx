import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      '&:hover': {
        backgroundColor: '#6666ff'
      }
    }
  })
);

type Props = {
  onClick: any;
  children: any;
};

export default function ElevButton({ onClick, children }: Props) {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
