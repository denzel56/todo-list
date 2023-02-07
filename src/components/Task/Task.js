import cn from "classnames";
import dayjs from "dayjs";

import { ReactComponent as DelIcon } from '../../assets/plus-solid.svg';
import { ReactComponent as DoneIcon } from '../../assets/check-solid.svg';
import { ReactComponent as EditIcon } from '../../assets/pen-solid.svg';
import { ReactComponent as WarningIcon } from '../../assets/warning.svg';

import s from './style.module.css';
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../../taskServices/taskApi";

const Task = ({ id, title, date, isDone, isMiss, isWarning, onEdit }) => {

  const [remove] = useDeleteTaskMutation();
  const [update] = useUpdateTaskMutation();

  const handleClickDone = (e) => {
    update({
      'isDone': !isDone,
      id,
    })
  }

  const handleClickDel = (e) => {
    remove(id);
  }

  const handleClickEdit = (e) => {
    onEdit && onEdit(id);
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

export default Task;
