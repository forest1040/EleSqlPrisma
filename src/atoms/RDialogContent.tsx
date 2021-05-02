import { atom } from 'recoil';

export const taskContentState = atom<string>({
  key: 'taskContentState',
  default: '',
});

export const taskDeadlineState = atom<Date>({
  key: 'taskDeadlineState',
  default: new Date(),
});

export const taskPriorityState = atom<number>({
  key: 'taskPriorityState',
  default: 1,
});
