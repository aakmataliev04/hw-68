import React, {FormEvent, useEffect} from 'react';
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm';
import {AppDispatch, RootState} from '../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {changeInputValue, fetchPostTask, fetchTasks} from './TodoListSlice';
import Task from '../../components/Task/Task';


const TodoList = () => {
  const inputValue = useSelector((state: RootState) => state.todolist.inputValue);
  const tasks = useSelector((state: RootState) => state.todolist.tasks);
  const dispatch: AppDispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);


  const postTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(fetchPostTask());
  };



  return (
    <>
      <AddTaskForm inputValue={inputValue} onChangeValue={(event) => dispatch(changeInputValue(event.target.value))} onSubmit={(event) => postTask(event)}/>
      <div className={'tasks-wrapper'}></div>
    </>
  );
};

export default TodoList;