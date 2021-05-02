import { atom, selector } from 'recoil';
import { ipcRenderer } from 'electron';

export const tasksState = atom<
  { content: string; deadline: Date; priority: number }[]
>({
  key: 'tasksState',
  default: selector({
    key: 'savedTasksState',
    get: async () => {
      try {
        return await ipcRenderer.invoke('load-tasks', 'load-task');
      } catch (error) {
        throw error;
      }
    },
  }),
});
