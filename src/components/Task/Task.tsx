import React from 'react';

export interface PropsTask {
  title: string,
  id: string,
}

const Task: React.FC<PropsTask> = ({title}) => {
  return (
    <div className={'task'}>
      <span>{title}</span>
      <button className={'delete-btn'} ></button>
    </div>
  );
};

export default Task;