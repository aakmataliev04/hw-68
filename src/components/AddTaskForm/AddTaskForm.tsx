import React from 'react';

interface IForm {
  inputValue: string,
  onChangeValue: React.ChangeEventHandler<HTMLInputElement>,
  onSubmit: React.FormEventHandler<HTMLFormElement>,
}

const AddTaskForm: React.FC<IForm> = ({inputValue, onChangeValue, onSubmit}) => {
  return (
    <div className={'form-wrapper'}>
      <form onSubmit={onSubmit} id={'form'}>
        <input id={'form-input'} type={'text'} placeholder={'Add new task'} onChange={onChangeValue} value={inputValue} required/>
        <button type={'submit'} className={'btn'}>Add</button>
      </form>
    </div>
  );
};

export default AddTaskForm;