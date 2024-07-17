import React from 'react';
import {useSelector} from 'react-redux';

interface IForm {
  inputValue: string,
  onChangeValue: React.ChangeEventHandler<HTMLInputElement>,
  onSubmit: React.FormEventHandler<HTMLFormElement>,
}

const AddTaskForm: React.FC<IForm> = ({inputValue, onChangeValue, onSubmit}) => {
  const isLoading = useSelector(state => state.todolist.isLoading);
  return (
    <div className={'form-wrapper'}>
      <form onSubmit={onSubmit} id={'form'}>
        <input id={'form-input'} type={'text'} placeholder={'Add new task'} onChange={onChangeValue} value={inputValue}
               required/>
        <button type={'submit'} className={'btn'} disabled={isLoading}>Add</button>
      </form>
    </div>
  );
};

export default AddTaskForm;