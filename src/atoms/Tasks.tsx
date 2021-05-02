import { atom } from 'recoil';

export const tasksState = atom<
  { content: string; deadline: any; priority: number }[]
>({
  key: 'tasksState',
  default: [],
});
