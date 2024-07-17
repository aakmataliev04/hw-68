import React, {useState} from 'react';
import './Task.css';
import {Task} from '../../types';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';

export interface PropsTask {
  task: Task,
  onChangeTaskStatus: (task: Task) => void,
  onDeleteTask: (task: Task) => void,
}

const Task: React.FC<PropsTask> = ({task, onChangeTaskStatus, onDeleteTask}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const deleteTask = async (onDeleteTask) => {
    try {
      setIsDeleting(true);
      await onDeleteTask(task);
    } finally {
      setIsDeleting(false);
    }
  };
  const changeStatus = async (onChangeTaskStatus) => {
    try {
      setIsChangingStatus(true);
      await onChangeTaskStatus(task);
    } finally {
      setIsChangingStatus(false);
    }
  };
  return (
    <div className={'task'}>
      <div className={'task-left-box'}>
        <div className="checkbox-wrapper-31">
          <input type="checkbox" onChange={() => changeStatus(onChangeTaskStatus)} checked={task.status}
                 disabled={isChangingStatus}/>
          <svg viewBox="0 0 35.6 35.6">
            <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
          </svg>
        </div>

        <span>{task.title}</span>

      </div>
      <button className={'delete-btn'} onClick={() => deleteTask(onDeleteTask)} disabled={isDeleting}
              style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {isDeleting && <ButtonSpinner/>}
      </button>
    </div>
  );
};

export default Task;