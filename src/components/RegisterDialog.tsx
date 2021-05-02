import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import RDialogContent from './RDialogContent';

import {
  taskContentState,
  taskDeadlineState,
  taskPriorityState
} from '../atoms/RDialogContent';

import { tasksState } from '../atoms/Tasks';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RegisterDialog({ open, onClose }: Props) {
  const taskContent = useRecoilValue(taskContentState);
  const taskDeadline = useRecoilValue(taskDeadlineState);
  const taskPriority = useRecoilValue(taskPriorityState);
  const [tasks, setTasks] = useRecoilState(tasksState);

  const handleRegister = () => {
    setTasks([
      ...tasks,
      {
        content: taskContent,
        deadline: taskDeadline,
        priority: taskPriority
      }
    ]);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle>タスク登録</DialogTitle>
      <RDialogContent />
      <DialogActions>
        <Button onClick={onClose} color="primary">
          もどる
        </Button>
        <Button onClick={handleRegister} color="primary">
          登録
        </Button>
      </DialogActions>
    </Dialog>
  );
}
