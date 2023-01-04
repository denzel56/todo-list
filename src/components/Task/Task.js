import cn from "classnames";
import dayjs from "dayjs";

import { ReactComponent as DelIcon } from '../../assets/x-del.svg';
import { ReactComponent as DoneIcon } from '../../assets/done.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';

import s from './style.module.css';
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../../taskServices/taskApi";

const Task = ({ id, title, description, date, fileUrl, fileName, isDone, isMiss, onEdit }) => {

  const [remove] = useDeleteTaskMutation();
  const [update] = useUpdateTaskMutation();
  const now = Date.now();

  const handleClickDone = (e) => {
    console.log('done', id);
    update({
      'isDone': !isDone,
      id,
    })
  }

  const handleClickDel = (e) => {
    console.log('del', id);
    remove(id);
  }

  const handleClickEdit = (e) => {
    onEdit && onEdit(id);
    console.log('edit', id);
  }

  return (
    <div className={cn(s.root, {
      [s.miss]: isMiss,
      [s.done]: isDone
    })}>
      <div className={s.taskInfoWrap}>
        <div className={s.taskText}>
          <h3>{title}</h3>
          <p>{description}</p>
          <p>Дата окончания: {date}</p>
        </div>
        <div className={s.taskFile}>
          <img src={fileUrl} alt={fileName} />
        </div>
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
