import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import ElevButton from './ElevButton';
import RegisterDialog from './RegisterDialog';
import TodoTable from './TodoTable';

import { tasksState } from '../atoms/Tasks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: '2rem',
      right: '2rem',
      '&:hover': {
        backgroundColor: '#6666ff'
      }
    }
  })
);

export default function TodoList() {
  const classes = useStyles();

  const tasks = useRecoilValue(tasksState);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <Box padding="2rem" textAlign={tasks.length !== 0 ? '' : 'center'}>
      {tasks.length !== 0 ? (
        <>
          <TodoTable />
          <Fab
            className={classes.fab}
            onClick={handleOpen}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </>
      ) : (
        <>
          <Typography variant="subtitle1" gutterBottom>
            まだ登録されたタスクはありません。
          </Typography>
          <ElevButton onClick={handleOpen}>タスクを登録する</ElevButton>
        </>
      )}
      <RegisterDialog open={open} onClose={handleClose} />
    </Box>
  );
}
