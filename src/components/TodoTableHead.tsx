import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { tasksState } from '../atoms/Tasks';

type Props = {
  selected: number[];
  handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const sortTasks = (
  arr: { content: string; deadline: any; priority: number }[],
  sortBy: 'deadline' | 'priority',
  order: 'asc' | 'desc'
) =>
  arr.sort(
    (
      a: { content: string; deadline: any; priority: number },
      b: { content: string; deadline: any; priority: number }
    ) => (order === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy])
  );

export default function TodoTableHead({ selected, handleSelectAll }: Props) {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<'deadline' | 'priority' | ''>('');

  const handleSort = (sortBy: 'deadline' | 'priority') => (
    e: React.MouseEvent
  ) => {
    let newOrder: 'asc' | 'desc' =
      orderBy === sortBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc';
    setOrderBy(sortBy);
    setOrder(newOrder);
    setTasks(sortTasks(tasks.concat(), sortBy, newOrder));
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={tasks.length > 0 && tasks.length === selected.length}
            onChange={handleSelectAll}
          />
        </TableCell>
        <TableCell>タスク</TableCell>
        <TableCell align="center">
          <TableSortLabel
            active={orderBy === 'deadline'}
            direction={order === 'asc' ? 'desc' : 'asc'}
            onClick={handleSort('deadline')}
          >
            期日
          </TableSortLabel>
        </TableCell>
        <TableCell align="center">
          <TableSortLabel
            active={orderBy === 'priority'}
            direction={order === 'asc' ? 'desc' : 'asc'}
            onClick={handleSort('priority')}
          >
            優先度
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
