import React from 'react';
import './Task.css';
import {Task} from '../../types';

export interface PropsTask {
  task: Task,
  onChangeTaskStatus: (task: Task) => void
}

const Task: React.FC<PropsTask> = ({task, onChangeTaskStatus}) => {
  return (
    <div className={'task'}>
      <div className={'task-left-box'}>

        <div className="checkbox-wrapper-31">
          <input type="checkbox" onChange={() => onChangeTaskStatus(task)} checked={task.status}/>
          <svg viewBox="0 0 35.6 35.6">
            <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
          </svg>
        </div>

        <span>{task.title}</span>

      </div>
      <button className={'delete-btn'} ></button>
    </div>
  );
};

export default Task;