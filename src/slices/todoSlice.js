import { createSlice } from '@reduxjs/toolkit';

const getInitialTodo = () => {
  // getting todo list
  const localTodoList = window.localStorage.getItem('todoList');
  // if todo list is not empty
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  window.localStorage.setItem('todoList', []);
  return [];
};

const initialValue = {
  filterStatus: 'all',
  todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialValue,
  reducers: {
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { updateFilterStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
