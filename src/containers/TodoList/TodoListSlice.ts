import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Task, TaskApi, TasksApi} from '../../types';
import {RootState} from '../../app/store';
import {toast} from 'react-toastify';

interface TodoListState {
  tasks: Task[];
  task: TaskApi | null;
  inputValue: string;
  isLoading: boolean;
  isError: boolean;
}

const initialState: TodoListState = {
  tasks: [],
  task: null,
  inputValue: '',
  isLoading: false,
  isError: false,
};

export const fetchTasks = createAsyncThunk<Task[], void, { state: RootState }>(
  'todolist/fetchTasks',
  async (_arg, {rejectWithValue}) => {
    try {
      const {data: tasks} = await axiosApi.get<TasksApi | null>('/tasks.json');
      if (tasks !== null) {
        return Object.keys(tasks).map((id) => ({
          ...tasks[id],
          id: id
        }));
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue('Failed to fetch tasks');
    }
  }
);

export const fetchPostTask = createAsyncThunk<void, void, {
  state: RootState
}>('todolist/fetchPostTask', async (_arg, thunkAPI) => {
  const taskValue = thunkAPI.getState().todolist.inputValue;
  const task: TaskApi = {
    title: taskValue,
    status: false
  };

  await axiosApi.post<TaskApi>('/tasks.json', task);
});

export const fetchChangeTaskStatus = createAsyncThunk('todolist/fetchChangeTaskStatus', async (argTask) => {
  const newTask: TaskApi = {
    title: argTask.title,
    status: !argTask.status
  };
  await axiosApi.put(`/tasks/${argTask.id}.json`, newTask);
});
export const fetchDeleteTask = createAsyncThunk('todolist/fetchDeleteTask', async (argTask) => {
  await axiosApi.delete(`/tasks/${argTask.id}.json`);
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
        state.isLoading = false;
        state.inputValue = '';
      })
      .addCase(fetchPostTask.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        toast.error('Connection or API Error!', {theme: 'dark'});
      });
    builder
      .addCase(fetchChangeTaskStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchChangeTaskStatus.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchChangeTaskStatus.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(fetchDeleteTask.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchDeleteTask.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Task deleted!', {theme: 'dark'});
      })
      .addCase(fetchDeleteTask.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        toast.error('Task is not deleted!', {theme: 'dark'});
      });
  }
});

export const TodoListReducer = TodoListSlice.reducer;
export const {
  changeInputValue,
} = TodoListSlice.actions;