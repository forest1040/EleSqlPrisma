import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import AppBar from './components/AppBar';
import TodoList from './components/TodoList';

import './styles.css';

export default function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <AppBar />
        <Suspense fallback={<p>Loading...</p>}>
          <TodoList />
        </Suspense>
      </div>
    </RecoilRoot>
  );
}
