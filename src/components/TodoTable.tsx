import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { format } from 'date-fns';

import TodoTableHead from './TodoTableHead';

import { tasksState } from '../atoms/Tasks';

export default function TodoTable() {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected([...Array(tasks.length).keys()]);
      return;
    }
    setSelected([]);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const selectedIndex = selected.indexOf(i);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, i);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleDelete = () => {
    let newTasks = tasks.filter(
      (e: object, i: number) => selected.indexOf(i) === -1
    );
    setTasks(newTasks);
    setSelected([]);
  };

  return (
    <>
      <IconButton
        onClick={handleDelete}
        disabled={selected.length === 0}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
      <TableContainer>
        <Table>
          <TodoTableHead
            selected={selected}
            handleSelectAll={handleSelectAll}
          />
          <TableBody>
            {tasks.map((task: any, index: number) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.indexOf(index) !== -1}
                    onChange={(e: any) => handleCheck(e, index)}
                  />
                </TableCell>
                <TableCell>{task.content}</TableCell>
                <TableCell align="center">
                  {format(task.deadline, 'yyyy/MM/dd')}
                </TableCell>
                <TableCell align="center">{task.priority}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
