import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Task, TaskApi, TasksApi} from '../../types';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';

interface TodoListState {
  tasks: Task[] | null;
  task: TaskApi | null
  inputValue: string;
  isLoading: boolean;
  isError: boolean;
}

const initialState: TodoListState = {
  tasks: null,
  task: null,
  inputValue: '',
  isLoading: false,
  isError: false,
};

export const fetchTasks = createAsyncThunk('todolist/fetchTasks', async (_arg, thunkAPI) => {
  const { data: tasks } = await axiosApi.get<TasksApi | null>('/tasks.json');
  const state = thunkAPI.getState().todolist;
  if (tasks !== null) {
    state.tasks = Object.keys(tasks).map((id: string) => {
      return {
        ...tasks[id],
        id: id
      };
    });
  }
  console.log(tasks);
  return tasks || null;
});
export const fetchPostTask = createAsyncThunk<void, void, { state: RootState }>('todolist/fetchPostTask', async (_arg, thunkAPI) => {
  const taskValue = thunkAPI.getState().todolist.inputValue;
  const task: TaskApi = {
    title: taskValue,
    status: false
  };

  await axiosApi.post<TaskApi>('/tasks.json', task);
});

export const TodoListSlice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {
    changeInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostTask.pending, (state) => {
      state.isError = false;
      state.isLoading = true;

    })
      .addCase(fetchPostTask.fulfilled, (state) => {
        state.isLoading = true;
        state.inputValue = '';
      })
      .addCase(fetchPostTask.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export const TodoListReducer = TodoListSlice.reducer;
export const {
  changeInputValue,
} = TodoListSlice.actions;