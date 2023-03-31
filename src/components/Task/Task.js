import React from "react";
import cn from "classnames";
import PropTypes from 'prop-types';

import { ReactComponent as DelIcon } from '../../assets/plus-solid.svg';
import { ReactComponent as DoneIcon } from '../../assets/check-solid.svg';
import { ReactComponent as EditIcon } from '../../assets/pen-solid.svg';
import { ReactComponent as WarningIcon } from '../../assets/warning.svg';

import { useDeleteTaskMutation, useUpdateTaskMutation } from "../../taskServices/taskApi";

import s from './style.module.css';

const Task = ({ id, title, date, isDone, isMiss, isWarning, onEdit }) => {

  const [remove] = useDeleteTaskMutation();
  const [update] = useUpdateTaskMutation();

  const handleClickDone = () => {
    update({
      'isDone': !isDone,
      id,
    })
  }

  const handleClickDel = () => {
    remove(id);
  }

  const handleClickEdit = () => {
    if(onEdit && onEdit()) {
      onEdit(id);
    };
  }

  return (
    <div className={cn(s.root, {
      [s.done]: isDone
    })}>
        <div className={s.taskText}>
        <span>{title}</span>
        <p className={s.deadline}>До: {date}
          {isWarning && <WarningIcon className={s.warningIcon} />}
          {isMiss && <WarningIcon className={s.miss} />}
        </p>
      </div>
      <div className={s.buttonsWrap}>
        <DoneIcon
          className={s.doneButton}
          onClick={handleClickDone}
        />
        <EditIcon
          className={s.editButton}
          onClick={handleClickEdit}
        />
        <DelIcon
          className={s.delButton}
          onClick={handleClickDel}
        />
      </div>
    </div>
  )

}

Task.defaultProps = {
  id: 0,
  title: "",
  date: "",
  isDone: false,
  isMiss: false,
  isWarning: false,
  onEdit: false
}

Task.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  date: PropTypes.string,
  isDone: PropTypes.bool,
  isMiss: PropTypes.bool,
  isWarning: PropTypes.bool,
  onEdit: PropTypes.bool
}

export default Task;
