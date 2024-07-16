import { configureStore } from '@reduxjs/toolkit';
import { TodoListReducer } from '../containers/TodoList/TodoListSlice';

export const store = configureStore({
  reducer: {
    todolist: TodoListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
